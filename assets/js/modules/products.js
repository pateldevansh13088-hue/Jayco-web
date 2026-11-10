/* MODULES 4–6: Product search UI, Product catalogue, Product details.
   Product cards never carry price, stock or purchase controls. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store, esc = u.esc;

  var PAGE_SIZE = 24;
  m.PAGE_SIZE = PAGE_SIZE;

  m.productArt = function (p, label) {
    if (p.image) return '<img src="' + url.asset(p.image) + '" alt="' + esc(label || p.name) + '" loading="lazy" width="640" height="480">';
    return J.art(p.art, S.tone(p), label);
  };

  /* Professional product card: image, name, brand, manufacturer, composition, description, View details */
  m.productCard = function (p) {
    var href = url.product(p.slug);
    return '<article class="pcard"><a class="pcard__media" href="' + href + '" tabindex="-1" aria-hidden="true">' + m.productArt(p) + "</a>" +
      '<div class="pcard__body"><div class="pcard__top"><span class="pcard__form">' + esc(p.form) + "</span></div>" +
      '<h3 class="pcard__title"><a href="' + href + '">' + esc(p.name) + "</a></h3>" +
      '<dl class="pcard__facts"><dt>Brand</dt><dd>' + esc(p.brand) + "</dd><dt>Made by</dt><dd>" + esc(u.truncate(p.manufacturer, 34)) + "</dd>" +
      "<dt>" + S.labels(p).compositionShort + "</dt><dd>" + esc(u.truncate(p.composition, 70)) + "</dd></dl>" +
      '<p class="pcard__desc">' + esc(p.description) + "</p>" +
      '<div class="pcard__cta"><a class="btn btn--soft btn--sm btn--block" href="' + href + '">View details<span class="sr-only"> for ' + esc(p.name) + "</span></a></div></div></article>";
  };

  m.productGrid = function (list, cls) {
    return '<div class="pgrid ' + (cls || "") + '">' + list.map(m.productCard).join("") + "</div>";
  };

  m.productItem = function (p) {
    return '<a class="pitem" href="' + url.product(p.slug) + '"><span class="pitem__thumb">' + m.productArt(p) + "</span>" +
      '<span class="pitem__text"><strong>' + esc(p.name) + "</strong><small>" + esc(p.brand) + ", " + esc(p.form) + "</small></span></a>";
  };

  /* Pack-label card used in the hero */
  m.packLabel = function (p) {
    return '<a class="plabel" href="' + url.product(p.slug) + '"><div class="plabel__art">' + m.productArt(p) + "</div>" +
      '<div class="plabel__body"><div class="plabel__top"><span class="pcard__form">' + esc(p.form) + "</span></div>" +
      '<div class="plabel__name">' + esc(p.name) + "</div><dl><dt>Brand</dt><dd>" + esc(p.brand) + "</dd><dt>Made by</dt><dd>" + esc(u.truncate(p.manufacturer, 30)) +
      "</dd><dt>" + S.labels(p).compositionShort + "</dt><dd>" + esc(u.truncate(p.composition, 34)) + "</dd></dl></div></a>";
  };

  /* ------------------------------------------------------------------ */
  /* Catalogue: search box + filters + results.                          */
  /* state: { q, category, manufacturer, brand, form, limit }            */
  /* cfg:   { scope, category (fixed category slug) }                    */
  /* ------------------------------------------------------------------ */
  function baseProducts(cfg) {
    return S.products().filter(function (p) {
      return S.inScope(p, cfg.scope) && (!cfg.category || S.inCategory(p, cfg.category));
    });
  }
  m.catalogueBase = baseProducts;

  function option(value, label, selected) {
    return '<option value="' + esc(value) + '"' + (selected ? " selected" : "") + ">" + esc(label) + "</option>";
  }

  function selectHtml(field, label, allLabel, opts, cur) {
    return '<label class="select"><span>' + esc(label) + '</span><select data-filter="' + field + '" id="f-' + field + '">' +
      option("", allLabel, !cur) + opts + "</select></label>";
  }

  function filtersHtml(state, cfg, res) {
    var f = res.facets, html = "", n = 0;
    function simple(field, label, allLabel) {
      var keys = Object.keys(f[field]);
      if (state[field] && keys.indexOf(state[field]) < 0) keys.push(state[field]);
      keys.sort();
      return selectHtml(field, label, allLabel, keys.map(function (k) { return option(k, k + (f[field][k] ? " (" + f[field][k] + ")" : ""), state[field] === k); }).join(""), state[field]);
    }
    if (!cfg.category) {
      var og = S.groups().map(function (g) {
        var cs = S.categoriesIn(g.slug).filter(function (c) { return f.category[c.slug] || state.category === c.slug; });
        if (!cs.length) return "";
        return '<optgroup label="' + esc(g.name) + '">' + cs.map(function (c) {
          return option(c.slug, c.name + (f.category[c.slug] ? " (" + f.category[c.slug] + ")" : ""), state.category === c.slug);
        }).join("") + "</optgroup>";
      }).join("");
      html += selectHtml("category", "Category", "All categories", og, state.category); n++;
    }
    html += simple("manufacturer", "Manufacturer", "All manufacturers"); n++;
    html += simple("brand", "Brand", "All brands"); n++;
    html += simple("form", "Product type", "All types"); n++;
    return '<div class="filters" style="--n:' + n + '" role="group" aria-label="Filter results">' + html + "</div>";
  }

  function activeHtml(state, cfg) {
    var chips = [];
    function chip(field, text) {
      chips.push('<button type="button" data-clear="' + field + '">' + esc(text) + icon("x", 14) + '<span class="sr-only"> Remove filter</span></button>');
    }
    if (state.q) chip("q", "Search: " + state.q);
    if (state.category && !cfg.category) { var c = S.category(state.category); chip("category", c ? c.name : state.category); }
    if (state.manufacturer) chip("manufacturer", state.manufacturer);
    if (state.brand) chip("brand", "Brand: " + state.brand);
    if (state.form) chip("form", state.form);
    return chips.length ? chips.join("") + '<button type="button" class="link" data-clear="all">Clear all</button>' : "";
  }

  m.catalogueBody = function (state, cfg) {
    state = state || {};
    var res = J.search.query(state, baseProducts(cfg));
    var limit = state.limit || PAGE_SIZE;
    var shown = res.items.slice(0, limit);
    var noun = "product";
    var html = filtersHtml(state, cfg, res);
    html += '<div class="results__bar"><p class="results__count">' + (res.items.length === res.total && !activeHtml(state, cfg) ? "Showing " : "") +
      u.plural(res.items.length, noun) + (state.q ? " for “" + esc(state.q) + "”" : "") + '</p><div class="active">' + activeHtml(state, cfg) + "</div></div>";
    if (!res.items.length) {
      html += '<div class="empty"><h3>' + (state.q ? "No " + noun + "s match “" + esc(state.q) + "”" : "Nothing matches these filters") + "</h3>" +
        "<p>" + (res.didYouMean ? 'Did you mean <button type="button" class="link-btn" data-suggest="' + esc(res.didYouMean) + '">' + esc(res.didYouMean) + "</button>? " : "") +
        "Check the spelling or clear a filter. We may still stock it, so you can also call or message us.</p>" +
        '<div class="cta-row" style="justify-content:center">' +
        '<button type="button" class="btn btn--soft" data-clear="all">Clear search and filters</button>' +
        '<a class="btn btn--wa" href="' + J.link.whatsapp("Hello, I am looking for " + (state.q || "a product") + ".") + '" rel="noopener">' + icon("message", 18) + "Ask on WhatsApp</a></div></div>";
    } else {
      html += m.productGrid(shown);
      if (res.items.length > shown.length) {
        html += '<div class="loadmore"><button type="button" class="btn btn--ghost" data-more>Show more (' + (res.items.length - shown.length) + " left)</button></div>";
      }
    }
    return { html: html, count: res.items.length };
  };

  m.catalogue = function (cfg, state) {
    state = state || {};
    var body = m.catalogueBody(state, cfg);
    return '<div class="catalogue" data-catalogue data-scope="' + esc(cfg.scope || "all") + '"' + (cfg.category ? ' data-category="' + esc(cfg.category) + '"' : "") + ">" +
      '<div class="cattools">' + m.sbox({ id: "cat-q", stay: true, value: state.q, placeholder: "Search items, brands, materials…" }) + "</div>" +
      '<p class="sr-only" role="status" aria-live="polite" data-cat-live></p>' +
      '<div data-cat-body>' + body.html + "</div></div>";
  };

  /* ------------------------------------------------------------------ */
  /* Product detail                                                       */
  /* ------------------------------------------------------------------ */
  m.productDetail = function (p) {
    var L = S.labels(p), s = J.data.site;
    var cat = S.category(p.category);
    var backPage = "products";
    var rows = [["Brand", '<a href="' + url.brand(p.brand) + '">' + esc(p.brand) + "</a>"]];
    if (p.generic) rows.push(["Also called", esc(p.generic)]);
    rows.push([L.composition, esc(p.composition)]);
    rows.push([L.strength, esc(p.strength)]);
    rows.push([L.form, esc(p.form)]);
    rows.push([L.pack, esc(p.pack)]);
    rows.push(["Manufacturer", p.manufacturer === "Various manufacturers" ? esc(p.manufacturer) :
      '<a href="' + url.page(backPage) + "?manufacturer=" + encodeURIComponent(p.manufacturer) + '">' + esc(p.manufacturer) + "</a>"]);
    if (cat) rows.push(["Category", '<a href="' + url.category(cat.slug) + '">' + esc(cat.name) + "</a>"]);

    var ask = "Hello, I would like to check availability of " + p.name + (p.pack ? " (" + p.pack + ")" : "") + ".";
    var html = '<section class="section section--tight"><div class="container">' +
      m.crumbs([{ label: "Home", href: url.page("home") }, { label: "Products", href: url.page(backPage) },
        { label: cat ? cat.name : "Category", href: url.category(p.category) }, { label: p.name }]) +
      '<div class="pdp"><div><div class="pdp__media">' + m.productArt(p, p.name + " (illustration)") + "</div>" +
      (p.image ? "" : '<p class="muted" style="font-size:.84rem;margin-top:10px">Illustration. The actual pack may look different.</p>') + "</div>" +
      '<div class="pdp__info"><div class="pdp__badges">' + (cat ? '<span class="badge badge--na">' + esc(cat.name) + "</span>" : "") + "</div>" +
      "<h1>" + esc(p.name) + '</h1><p class="pdp__sub">' + esc(p.brand) + (p.manufacturer !== "Various manufacturers" ? ", made by " + esc(p.manufacturer) : "") + "</p>" +
      '<p class="pdp__desc">' + esc(p.description) + "</p>" +
      '<dl class="spec">' + rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("") + "</dl>" +
      '<div class="pdp__cta"><a class="btn btn--wa" href="' + J.link.whatsapp(ask) + '" rel="noopener">' + icon("message", 18) + "Ask about availability</a>" +
      '<a class="btn btn--primary" href="' + J.link.tel() + '">' + icon("phone", 18) + "Call now</a>" +
      '<a class="btn btn--ghost" href="' + url.page(backPage) + '">' + icon("arrowLeft", 18) + "Back to all products</a></div></div></div>" +
      '<div class="pdp__sections">' +
      '<div class="infobox"><h2>' + icon("info", 20) + "Typical use</h2><p>" + esc(p.usage) + "</p></div>" +
      '<div class="infobox"><h2>' + icon("package", 20) + "Storage instructions</h2><p>" + esc(S.storage(p)) + "</p></div></div>" +
      '<div style="margin-top:14px;display:grid;gap:12px">' + m.notice("safety") + m.notice("catalogue") +
      (p.sample ? '<p class="muted" style="font-size:.86rem">Listing details are being confirmed with the store. Please check the item before use.</p>' : "") + "</div>";

    function rail(title, list) {
      return list.length ? '<section class="related"><h2>' + esc(title) + "</h2>" + m.productGrid(list, "pgrid--4") + "</section>" : "";
    }
    html += rail("Similar brands", S.similarBrands(p, 4));
    html += rail("More from " + (p.manufacturer === "Various manufacturers" ? p.brand : p.manufacturer), S.fromManufacturer(p, 4));
    html += rail("Related products", S.related(p, 4));
    return html + "</div></section>";
  };
})();
