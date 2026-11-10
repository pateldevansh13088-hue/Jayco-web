/* MODULE 16: Lab guides (+ latest announcements). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store, esc = u.esc;

  m.articleCards = function (list, three) {
    return '<div class="acards' + (three ? " acards--3" : "") + '">' + list.map(function (a) {
      return '<a class="acard" href="' + url.article(a.slug) + '"><div class="acard__meta"><span class="badge badge--na">' + esc(a.category) + "</span><span>" + a.minutes + " min read</span></div>" +
        "<h3>" + esc(a.title) + "</h3><p>" + esc(a.summary) + '</p><span class="acard__more">Read article ' + icon("arrowRight", 16) + "</span></a>";
    }).join("") + "</div>";
  };

  m.announcements = function () {
    var list = J.data.announcements.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!list.length) return '<p class="muted">No announcements at the moment.</p>';
    return '<ul class="news">' + list.map(function (a) {
      return "<li><time datetime=\"" + a.date + '">' + u.fmtDate(a.date) + "</time><strong>" + esc(a.title) + "</strong><p>" + esc(a.text) + "</p></li>";
    }).join("") + "</ul>";
  };

  m.articlesPage = function () {
    return m.pagehead({
      title: "Lab guides",
      lead: "Short, general guides on choosing and caring for laboratory equipment.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Lab guides" }]
    }) + '<section class="section section--tight"><div class="container">' + m.articleCards(S.articles(), true) +
      '<div style="margin-top:30px">' + m.notice("safety") + "</div></div></section>";
  };

  m.articlePage = function (a) {
    var body = a.body.map(function (b) { return "<h2>" + esc(b.h) + "</h2><p>" + esc(b.p) + "</p>"; }).join("");
    var others = S.articles().filter(function (x) { return x.slug !== a.slug; }).slice(0, 3);
    return m.pagehead({
      title: a.title, lead: a.summary,
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Lab guides", href: url.page("guides") }, { label: a.title }],
      extra: '<p class="muted" style="margin-top:14px;font-size:.92rem">' + u.fmtDate(a.date) + ", " + a.minutes + " min read</p>"
    }) + '<section class="section section--tight"><div class="container"><article class="prose">' + body + "</article>" +
      '<div style="margin-top:34px;max-width:68ch">' + m.notice("safety") + "</div>" +
      (others.length ? '<section class="related"><h2>More to read</h2>' + m.articleCards(others, true) + "</section>" : "") + "</div></section>";
  };
})();
