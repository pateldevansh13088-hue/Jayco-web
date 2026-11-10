/* MODULE 10: About us (+ photo gallery). All text comes from data/site.js. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store, esc = u.esc;

  m.gallery = function () {
    var items = J.data.gallery.map(function (g, i) {
      var art = g.image ? '<img src="' + url.asset(g.image) + '" alt="' + esc(g.caption) + '" loading="lazy" width="640" height="480">' : J.art(g.art, "blue");
      return '<button class="gal__item" type="button" data-lightbox="' + i + '" aria-label="Enlarge: ' + esc(g.caption) + '">' + art +
        '<span class="gal__cap">' + esc(g.caption) + "</span></button>";
    }).join("");
    var placeholders = J.data.gallery.some(function (g) { return !g.image; });
    return '<div class="gal" data-gallery>' + items + "</div>" +
      (placeholders ? '<p class="sample-note">' + icon("image", 16) + "<span>Pictures shown are drawn placeholders. Photographs of the shop will replace them.</span></p>" : "");
  };

  m.aboutPage = function () {
    var a = J.data.site.about, c = J.data.site.contact;
    var out = m.pagehead({
      title: "About Jay Appliances & Instruments Co.",
      lead: "Science and laboratory supplies from Jawahar Ganj, Sagar.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "About us" }]
    });
    out += '<section class="section"><div class="container split"><div class="prose"><h2>Who we are</h2>' + a.intro.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" +
      '<dl class="facts"><div><dt>Address</dt><dd>' + esc(c.addressOneLine) + "</dd></div>" +
      "<div><dt>Phone</dt><dd>" + c.phones.map(function (p) { return '<a href="tel:' + p.tel + '">' + esc(p.display) + "</a>"; }).join("<br>") + "</dd></div>" +
      '<div><dt>Email</dt><dd><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></dd></div>" +
      "<div><dt>Products</dt><dd>Laboratory glassware, apparatus, meters, microscopes, models and charts</dd></div></dl></div></section>";

    if (a.history && a.history.length) {
      out += '<section class="section section--mist"><div class="container"><div class="section__head"><div><h2>Our story</h2></div></div><div class="prose">' +
        a.history.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div></div></section>";
    }

    out += '<section class="section' + (a.history && a.history.length ? "" : " section--mist") + '"><div class="container"><div class="section__head"><div><h2>What guides us</h2></div></div><div class="values">' +
      '<div class="value value--blue"><h3>Mission</h3><p>' + esc(a.mission) + "</p></div>" +
      '<div class="value value--green"><h3>Vision</h3><p>' + esc(a.vision) + "</p></div>" +
      '<div class="value"><h3>Commitment to customers</h3><p>' + esc(a.commitment) + "</p></div></div></div></section>";

    out += '<section class="section"><div class="container split split--even"><div><h2>Quality assurance</h2><ul class="why" style="margin-top:18px">' +
      a.quality.map(function (q) { return '<li><span class="why__icon">' + icon("shield", 22) + "</span><div><p style=\"margin:0;color:var(--ink)\">" + esc(q) + "</p></div></li>"; }).join("") + "</ul></div>" +
      '<div><h2>Licences and team</h2><div class="prose" style="margin-top:14px">' +
      (a.licences.length ? '<dl class="facts">' + a.licences.map(function (l) { return "<div><dt>" + esc(l.label) + "</dt><dd>" + esc(l.value) + "</dd></div>"; }).join("") + "</dl>" : "<p>" + esc(a.licenceFallback) + "</p>") +
      (a.team.length ? '<dl class="facts" style="margin-top:20px">' + a.team.map(function (t) { return "<div><dt>" + esc(t.role) + "</dt><dd>" + esc(t.name) + (t.bio ? '<br><span class="muted" style="font-weight:500">' + esc(t.bio) + "</span>" : "") + "</dd></div>"; }).join("") + "</dl>" : '<p style="margin-top:14px">' + esc(a.teamFallback) + "</p>") +
      "</div></div></div></section>";

    out += '<section class="section section--mist"><div class="container"><div class="section__head"><div><h2>Inside the shop</h2></div></div>' + m.gallery() + "</div></section>";
    out += '<section class="section section--tight"><div class="container">' + m.ctaRow(null, { lg: true }) + "</div></section>";
    return out;
  };
})();
