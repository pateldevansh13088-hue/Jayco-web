/* Product search engine: instant, typo-tolerant, runs in the browser.
   - Searches name, brand, alternative name, material, manufacturer, category and type.
   - Every word you type must match something (so "glass funnel" narrows results).
   - Matches exact words, word starts ("micro" → Microscope), and misspellings
     ("beker", "burete"). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var S = J.store;
  var Q = (J.search = {});

  var FIELDS = [
    ["name", 3], ["brand", 3], ["generic", 2.6], ["composition", 1.6],
    ["manufacturer", 1.2], ["categoryName", 1], ["form", 1], ["pack", 0.4]
  ];
  var SYN = {
    avometer: ["multimeter"], meter: ["meter"], cylinder: ["cylinder"], cyl: ["cylinder"], mic: ["microscope"], micro: ["microscope"],
    bunsen: ["bunsen"], tube: ["tube"], flasks: ["flask"], pipet: ["pipette"], buret: ["burette"], burrette: ["burette"],
    vernier: ["vernier"], caliper: ["caliper"], callipers: ["caliper"], calliper: ["caliper"], slides: ["slide"],
    filter: ["filter"], litmus: ["litmus"], goggle: ["goggles"], coat: ["coat"], scale: ["balance"], weighing: ["balance"],
    petridish: ["petri"], eppendorf: ["centrifuge"]
  };

  function norm(s) {
    return String(s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  function stem(t) { return t.length > 4 && /s$/.test(t) && !/ss$/.test(t) ? t.slice(0, -1) : t; }
  function tokens(s) { return norm(s).split(" ").filter(Boolean).map(stem); }

  /* Damerau-Levenshtein, bounded: returns > max as soon as the distance can't fit. */
  function dist(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var prev2 = null, prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      var rowMin = i;
      for (j = 1; j <= b.length; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
        cur[j] = v;
        if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      prev2 = prev; prev = cur;
    }
    return prev[b.length];
  }

  /* How well does query word q match index word t? 0 = no match. */
  function wordScore(q, t) {
    if (q === t) return 1;
    if (t.indexOf(q) === 0) return q.length >= 2 ? 0.86 : 0.5;
    if (q.length >= 4 && t.indexOf(q) > 0) return 0.55;
    if (q.length >= 4) {
      var max = q.length >= 8 ? 2 : 1;
      var d = dist(q, t.slice(0, Math.max(q.length + 1, 4)), max);
      if (d <= max) return 0.7 - 0.12 * d;
      d = dist(q, t, max);
      if (d <= max) return 0.66 - 0.12 * d;
    }
    return 0;
  }

  var INDEX = null, VOCAB = null;
  function build() {
    var cats = {};
    S.categories().forEach(function (c) { cats[c.slug] = c.name; });
    var vocab = {};
    INDEX = S.products().map(function (p) {
      var doc = { p: p, fields: [] };
      var rec = {
        name: p.name, brand: p.brand === "Generic" ? "" : p.brand, generic: p.generic, composition: p.composition,
        manufacturer: p.manufacturer === "Various manufacturers" ? "" : p.manufacturer,
        categoryName: (cats[p.category] || "") + " " + (p.also || []).map(function (c) { return cats[c] || ""; }).join(" "),
        form: p.form, pack: p.pack
      };
      FIELDS.forEach(function (f) {
        var toks = tokens(rec[f[0]]);
        doc.fields.push({ w: f[1], toks: toks });
        if (f[1] >= 2.6 || f[0] === "form") toks.forEach(function (t) { if (t.length > 2) vocab[t] = (vocab[t] || 0) + 1; });
      });
      return doc;
    });
    S.brands().forEach(function (b) { tokens(b.name).forEach(function (t) { if (t.length > 2) vocab[t] = (vocab[t] || 0) + 1; }); });
    VOCAB = Object.keys(vocab).map(function (t) { return [t, vocab[t]]; });
  }

  function expand(qtokens) {
    var out = [];
    qtokens.forEach(function (t) { if (SYN[t]) SYN[t].forEach(function (x) { out.push(x); }); else out.push(t); });
    return out;
  }

  /* Score one product for a list of query words; 0 if any word fails to match. */
  function scoreDoc(doc, qs) {
    var total = 0;
    for (var i = 0; i < qs.length; i++) {
      var best = 0;
      for (var f = 0; f < doc.fields.length; f++) {
        var fld = doc.fields[f];
        for (var k = 0; k < fld.toks.length; k++) {
          var s = wordScore(qs[i], fld.toks[k]) * fld.w;
          if (k === 0) s *= 1.05;
          if (s > best) best = s;
        }
      }
      if (best === 0) return 0;
      total += best;
    }
    return total;
  }

  /* Public: matches(query) → ordered product list (all products if query is empty). */
  Q.run = function (query) {
    if (!INDEX) build();
    var qs = expand(tokens(query));
    if (!qs.length) return { items: S.products().slice(), didYouMean: "" };
    var hits = [];
    INDEX.forEach(function (doc) {
      var s = scoreDoc(doc, qs);
      if (s > 0) hits.push({ p: doc.p, s: s });
    });
    hits.sort(function (a, b) { return b.s - a.s || a.p.name.localeCompare(b.p.name); });
    return { items: hits.map(function (h) { return h.p; }), didYouMean: hits.length ? "" : Q.didYouMean(query) };
  };

  /* Suggest a corrected phrase when nothing matched. */
  Q.didYouMean = function (query) {
    if (!VOCAB) build();
    var toks = norm(query).split(" ").filter(Boolean);
    var changed = false;
    var fixed = toks.map(function (t) {
      var st = stem(t);
      if (VOCAB.some(function (v) { return v[0] === st; })) return t;
      var best = null, bestD = 99, bestF = 0;
      var max = t.length >= 8 ? 3 : t.length >= 5 ? 2 : 1;
      VOCAB.forEach(function (v) {
        var d = dist(st, v[0], max);
        if (d <= max && (d < bestD || (d === bestD && v[1] > bestF))) { best = v[0]; bestD = d; bestF = v[1]; }
      });
      if (best) { changed = true; return best; }
      return t;
    });
    var phrase = fixed.join(" ");
    return changed && Q.run(phrase).items.length ? phrase : "";
  };

  /* Autocomplete: products first, then brands and categories. */
  Q.suggest = function (query, limit) {
    var res = Q.run(query);
    var qs = tokens(query), out = { products: [], brands: [], categories: [], didYouMean: res.didYouMean };
    if (!qs.length) return out;
    out.products = res.items.slice(0, limit || 6);
    var last = qs.join(" ");
    out.brands = S.brands().filter(function (b) {
      return b.name !== "Generic" && tokens(b.name).some(function (t) { return qs.every(function (q) { return wordScore(q, t) >= 0.86; }); });
    }).slice(0, 2);
    out.categories = S.categories().filter(function (c) {
      return tokens(c.name).some(function (t) { return qs.every(function (q) { return wordScore(q, t) >= 0.86; }); });
    }).slice(0, 2);
    return out;
  };

  /* ---------------- Filters with live facet counts ---------------- */
  Q.FILTERS = ["category", "manufacturer", "brand", "form"];

  function passes(p, f, skip) {
    if (f.category && skip !== "category" && !S.inCategory(p, f.category)) return false;
    if (f.manufacturer && skip !== "manufacturer" && p.manufacturer !== f.manufacturer) return false;
    if (f.brand && skip !== "brand" && p.brand !== f.brand) return false;
    if (f.form && skip !== "form" && p.form !== f.form) return false;
    return true;
  }

  /* state: { q, category, manufacturer, brand, form }; base: products allowed on this page. */
  Q.query = function (state, base) {
    var baseSet = {};
    base.forEach(function (p) { baseSet[p.slug] = 1; });
    var res = Q.run(state.q || "");
    var matched = res.items.filter(function (p) { return baseSet[p.slug]; });
    var items = matched.filter(function (p) { return passes(p, state); });

    function counts(field) {
      var seen = {};
      matched.forEach(function (p) {
        if (!passes(p, state, field)) return;
        if (field === "category") {
          S.categories().forEach(function (c) { if (S.inCategory(p, c.slug)) seen[c.slug] = (seen[c.slug] || 0) + 1; });
        } else if (p[field] && !(field === "manufacturer" && p[field] === "Various manufacturers")) {
          seen[p[field]] = (seen[p[field]] || 0) + 1;
        }
      });
      return seen;
    }
    return { items: items, total: matched.length, didYouMean: res.didYouMean, facets: { category: counts("category"), manufacturer: counts("manufacturer"), brand: counts("brand"), form: counts("form") } };
  };

  /* ---------------- History and popular searches ---------------- */
  var KEY = "jaico.search.history";
  Q.history = function () {
    try { var h = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(h) ? h.slice(0, 6) : []; } catch (e) { return []; }
  };
  Q.remember = function (q) {
    q = String(q || "").trim();
    if (q.length < 2) return;
    try {
      var h = Q.history().filter(function (x) { return x.toLowerCase() !== q.toLowerCase(); });
      h.unshift(q);
      localStorage.setItem(KEY, JSON.stringify(h.slice(0, 6)));
    } catch (e) { /* storage blocked: history is optional */ }
  };
  Q.clearHistory = function () { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } };
  Q.popular = function () { return J.data.site.hero.popularSearches || []; };
})();
