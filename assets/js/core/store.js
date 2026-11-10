/* Data access layer. Every module reads content through these functions, so
   swapping the data files for a CMS or database later only touches this file
   (see README, "Moving to a CMS"). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var D = J.data;
  var slugify = J.u.slugify;
  var S = (J.store = {});

  var catBySlug = {}, groupBySlug = {}, brandByKey = {}, prodBySlug = {}, artBySlug = {};

  D.groups.forEach(function (g) { groupBySlug[g.slug] = g; });
  D.categories.forEach(function (c) { catBySlug[c.slug] = c; });
  D.brands.forEach(function (b) { b.slug = slugify(b.name); brandByKey[b.slug] = b; });
  D.products.forEach(function (p) { prodBySlug[p.slug] = p; });
  D.articles.forEach(function (a) { artBySlug[a.slug] = a; });

  var TONE = { biology: "green", chemistry: "blue", physics: "indigo", laboratory: "teal" };

  S.groups = function () { return D.groups; };
  S.group = function (slug) { return groupBySlug[slug]; };
  S.categories = function () { return D.categories; };
  S.category = function (slug) { return catBySlug[slug]; };
  S.categoriesIn = function (group) { return D.categories.filter(function (c) { return c.group === group; }); };
  S.homeCategories = function () {
    return D.categories.filter(function (c) { return c.home; }).sort(function (a, b) { return a.home - b.home; });
  };
  S.brands = function () { return D.brands.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }); };
  S.brand = function (key) { return brandByKey[slugify(key)]; };
  S.products = function () { return D.products; };
  S.product = function (slug) { return prodBySlug[slug]; };
  S.articles = function () { return D.articles.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }); };
  S.article = function (slug) { return artBySlug[slug]; };
  S.services = function () { return D.services.filter(function (s) { return s.enabled; }); };

  S.tone = function (p) {
    var c = catBySlug[p.category];
    return TONE[c ? c.group : "laboratory"];
  };
  S.toneForCategory = function (c) { return TONE[c.group] || "blue"; };
  S.groupOf = function (p) { var c = catBySlug[p.category]; return c ? c.group : "laboratory"; };

  S.inCategory = function (p, slug) { return p.category === slug || (p.also || []).indexOf(slug) > -1; };
  S.inScope = function (p, scope) {
    if (!scope || scope === "all") return true;
    return S.groupOf(p) === scope;   /* scope is "all" or a subject slug */
  };
  S.productsInCategory = function (slug) { return D.products.filter(function (p) { return S.inCategory(p, slug); }); };
  S.productsByBrand = function (name) { return D.products.filter(function (p) { return p.brand === name; }); };
  S.categoryCount = function (slug) { return S.productsInCategory(slug).length; };
  S.brandCount = function (name) { return S.productsByBrand(name).length; };
  S.featured = function (n, scope) {
    return D.products.filter(function (p) { return p.featured && S.inScope(p, scope); }).slice(0, n || 8);
  };
  S.popular = function (n) { return D.products.filter(function (p) { return p.popular; }).slice(0, n || 8); };

  function take(list, exclude, n) {
    var seen = {}, out = [];
    exclude.forEach(function (p) { seen[p.slug] = 1; });
    list.forEach(function (p) { if (!seen[p.slug] && out.length < n) { seen[p.slug] = 1; out.push(p); } });
    return out;
  }

  /* Similar items: same product type from another brand. */
  S.similarBrands = function (p, n) {
    var same = D.products.filter(function (x) { return x.slug !== p.slug && x.form === p.form && x.brand !== p.brand; });
    return take(same, [p], n || 4);
  };
  S.fromManufacturer = function (p, n) {
    return take(D.products.filter(function (x) { return x.manufacturer === p.manufacturer && x.manufacturer !== "Various manufacturers"; }), [p], n || 4);
  };
  S.related = function (p, n) {
    var skip = [p].concat(S.similarBrands(p, 4), S.fromManufacturer(p, 4));
    var pool = D.products.filter(function (x) { return S.inCategory(x, p.category) || (p.also || []).some(function (c) { return S.inCategory(x, c); }); });
    return take(pool, skip, n || 4);
  };

  /* Option lists for the filters. */
  S.unique = function (field, list) {
    var seen = {};
    (list || D.products).forEach(function (p) { if (p[field]) seen[p[field]] = (seen[p[field]] || 0) + 1; });
    return Object.keys(seen).sort().map(function (k) { return { value: k, count: seen[k] }; });
  };

  S.labels = function () {
    return { composition: "Material or specification", compositionShort: "Spec", strength: "Size or capacity", form: "Product type", pack: "Supplied as" };
  };
  S.storage = function (p) {
    return p.storage || D.storageDefaults[S.groupOf(p)] || D.storageDefaults.laboratory;
  };
})();
