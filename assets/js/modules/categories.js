/* MODULE 7: Categories (tiles, category banner, categories page, category page). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store, esc = u.esc;

  m.categoryTiles = function (list) {
    return '<div class="ctiles">' + list.map(function (c) {
      var n = S.categoryCount(c.slug);
      return '<a class="ctile" href="' + url.category(c.slug) + '" data-group="' + c.group + '"><span class="ctile__icon">' + icon(c.icon, 22) + "</span>" +
        "<span><span class=\"ctile__name\">" + esc(c.name) + '</span><span class="ctile__count" style="display:block">' + u.plural(n, "product") + "</span></span></a>";
    }).join("") + "</div>";
  };

  m.categoriesPage = function () {
    var out = m.pagehead({
      title: "Product categories",
      lead: "Biology, chemistry, physics and general laboratory items. Pick a category to see what we carry.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Categories" }]
    });
    out += '<section class="section"><div class="container">';
    S.groups().forEach(function (g, i) {
      out += '<div style="margin-top:' + (i ? 48 : 0) + 'px"><div class="section__head"><div><h2>' + esc(g.name) + "</h2><p>" + esc(g.description) + "</p></div>" + m.moreLink(url.subject(g.slug), "All " + g.name.toLowerCase()) + "</div>" +
        m.categoryTiles(S.categoriesIn(g.slug)) + "</div>";
    });
    return out + '<div style="margin-top:40px">' + m.notice("catalogue") + "</div></div></section>";
  };

  m.categoryPage = function (c) {
    var g = S.group(c.group);
    var sibs = S.categoriesIn(c.group).filter(function (x) { return x.slug !== c.slug; });
    var banner = '<section class="banner" data-group="' + c.group + '"><div class="container">' +
      m.crumbs([{ label: "Home", href: url.page("home") }, { label: "Categories", href: url.page("categories") }, { label: g.name, href: url.subject(g.slug) }, { label: c.name }]) +
      '<div class="banner__inner"><span class="banner__icon">' + icon(c.icon, 44) + '</span><div><h1>' + esc(c.name) + "</h1><p>" + esc(c.description) + "</p>" +
      (sibs.length ? '<div class="chips" aria-label="Other ' + esc(g.name) + ' categories">' + sibs.slice(0, 7).map(function (x) {
        return '<a class="chip" href="' + url.category(x.slug) + '">' + esc(x.name) + "</a>";
      }).join("") + "</div>" : "") + "</div></div></div></section>";
    return banner + '<section class="section section--tight"><div class="container">' +
      m.catalogue({ scope: "all", category: c.slug }, {}) +
      '<div style="margin-top:30px">' + m.notice("catalogue") + "</div></div></section>";
  };

  var GROUP_ICON = { biology: "microscope", chemistry: "flask", physics: "atom", laboratory: "package" };

  /* Four large links to the subjects, as on the original site's menu. */
  m.subjectTiles = function () {
    return '<section class="section section--tight" aria-label="Subjects"><div class="container"><div class="subjects">' + S.groups().map(function (g) {
      var n = S.products().filter(function (p) { return S.groupOf(p) === g.slug; }).length;
      return '<a class="subject" href="' + url.subject(g.slug) + '" data-group="' + g.slug + '"><span class="subject__icon">' + icon(GROUP_ICON[g.slug], 26) + "</span>" +
        "<strong>" + esc(g.name) + "</strong><span>" + esc(u.truncate(g.description, 78)) + "</span><em>" + u.plural(n, "product") + "</em></a>";
    }).join("") + "</div></div></section>";
  };

  /* One page per subject: Biology, Chemistry, Physics, General laboratory items. */
  m.subjectPage = function (g) {
    var cats = S.categoriesIn(g.slug);
    var banner = '<section class="banner" data-group="' + g.slug + '"><div class="container">' +
      m.crumbs([{ label: "Home", href: url.page("home") }, { label: "Categories", href: url.page("categories") }, { label: g.name }]) +
      '<div class="banner__inner"><span class="banner__icon">' + icon(GROUP_ICON[g.slug], 44) + "</span><div><h1>" + esc(g.name) + "</h1><p>" + esc(g.description) + "</p>" +
      '<div class="chips" aria-label="' + esc(g.name) + ' categories">' + cats.map(function (x) {
        return '<a class="chip" href="' + url.category(x.slug) + '">' + esc(x.name) + "</a>";
      }).join("") + "</div></div></div></div></section>";
    return banner + '<section class="section section--tight"><div class="container">' +
      m.catalogue({ scope: g.slug }, {}) + '<div style="margin-top:30px;display:grid;gap:12px">' + m.notice("safety") + m.notice("catalogue") + "</div></div></section>";
  };
})();
