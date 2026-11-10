/* MODULE 3: Homepage sections (hero, why choose us, about summary, promo banner). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store, esc = u.esc;
  var site = function () { return J.data.site; };

  m.sectionHead = function (title, lead, cta) {
    return '<div class="section__head"><div><h2>' + esc(title) + "</h2>" + (lead ? "<p>" + esc(lead) + "</p>" : "") + "</div>" + (cta || "") + "</div>";
  };
  m.moreLink = function (href, label) {
    return '<a class="textlink" href="' + href + '">' + esc(label) + " " + icon("arrowRight", 18) + "</a>";
  };

  m.hero = function () {
    var s = site(), h = s.hero;
    var stack = (h.showcase || []).map(S.product).filter(Boolean).map(m.packLabel).join("");
    var pop = h.popularSearches.map(function (q) { return '<a class="chip" href="' + url.search(q) + '">' + esc(q) + "</a>"; }).join("");
    return '<section class="hero" aria-labelledby="hero-title"><div class="container hero__grid"><div>' +
      '<p class="hero__status is-closed" data-hours-status><i></i><span>Call to confirm today\'s opening hours</span></p>' +
      '<h1 class="hero__title" id="hero-title">' + esc(h.title) + "</h1>" +
      '<p class="hero__lead">' + esc(h.lead) + "</p>" +
      '<div class="hero__search">' + m.sbox({ id: "sbox-hero", large: true }) + "</div>" +
      '<div class="hero__popular"><span>Popular searches:</span>' + pop + "</div>" +
      m.ctaRow(null, { cls: "hero__actions", lg: true }) +
      '<p class="hero__note">' + icon("info", 17) + "<span>" + esc(h.note) + "</span></p></div>" +
      (stack ? '<div class="labelstack" aria-label="Examples from the product directory">' + stack + "</div>" : "") + "</div></section>";
  };

  m.why = function () {
    var items = site().whyUs.map(function (w) {
      return '<li><span class="why__icon">' + icon(w.icon, 22) + "</span><div><h3>" + esc(w.title) + "</h3><p>" + esc(w.text) + "</p></div></li>";
    }).join("");
    return '<section class="section" aria-labelledby="why-title"><div class="container split">' +
      '<div><h2 id="why-title">Why choose us</h2><p class="lead" style="margin-top:12px">Clear information, honest answers about availability, and a team you can reach before you travel.</p>' +
      m.ctaRow(null, { noDirections: true }) + "</div><ul class=\"why\">" + items + "</ul></div></section>";
  };

  m.aboutSummary = function () {
    var s = site(), a = s.about, c = s.contact;
    return '<section class="section section--mist" aria-labelledby="about-title"><div class="container split split--even">' +
      '<div><h2 id="about-title">About the shop</h2><div class="prose" style="margin-top:14px">' + a.intro.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>" +
      '<p style="margin-top:20px">' + m.moreLink(url.page("about"), "More about us") + "</p></div>" +
      '<dl class="facts"><div><dt>Address</dt><dd>' + c.addressLines.map(esc).join(", ") + "</dd></div>" +
      "<div><dt>Phone</dt><dd>" + c.phones.map(function (p) { return '<a href="tel:' + p.tel + '">' + esc(p.display) + "</a>"; }).join("<br>") + "</dd></div>" +
      '<div><dt>WhatsApp</dt><dd><a href="' + J.link.whatsapp() + '" rel="noopener">' + esc(c.whatsapp.display) + "</a></dd></div>" +
      '<div><dt>Email</dt><dd><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></dd></div>" +
      '<div><dt>Serves</dt><dd>Schools, colleges, laboratories, teachers and institutions</dd></div></dl></div></section>';
  };

  m.promo = function () {
    var p = J.data.promo;
    if (!p || !p.enabled) return "";
    return '<section class="section section--tight"><div class="container"><div class="promo"><div><h2>' + esc(p.title) + "</h2><p>" + esc(p.text) + "</p></div>" +
      '<div class="promo__actions"><a class="btn btn--wa btn--lg" href="' + J.link.whatsapp(p.message) + '" rel="noopener">' + icon("message", 18) + "Ask on WhatsApp</a>" +
      '<a class="btn btn--ghost btn--lg" href="' + J.link.tel() + '">' + icon("phone", 18) + "Call now</a></div></div></div></section>";
  };

  /* Lab essentials: a short row of instruments, models and equipment. */
  m.essentials = function () {
    var slugs = ["borosil-burette-50", "vernier-caliper", "human-torso-model", "digital-laboratory-balance"];
    var list = slugs.map(S.product).filter(Boolean);
    return '<section class="section" aria-labelledby="ess-title"><div class="container">' +
      '<div class="section__head"><div><h2 id="ess-title">Lab and teaching essentials</h2><p>Instruments, models and equipment that schools and labs ask for most.</p></div>' +
      m.moreLink(url.page("products"), "All products") + "</div>" + m.productGrid(list, "pgrid--4") + "</div></section>";
  };

  /* ---------------- The homepage ---------------- */
  m.homePage = function () {
    var feat = S.featured(8);
    var brands = S.brands().filter(function (b) { return b.name !== "Generic"; }).slice(0, 12);
    return m.hero() +
      m.subjectTiles() +
      '<section class="section" aria-labelledby="cat-title"><div class="container">' +
      '<div class="section__head"><div><h2 id="cat-title">Browse by category</h2><p>Start with a shelf. Every category lists the items we carry.</p></div>' + m.moreLink(url.page("categories"), "All categories") + "</div>" +
      m.categoryTiles(S.homeCategories()) + "</div></section>" +
      '<section class="section section--mist" aria-labelledby="feat-title"><div class="container">' +
      '<div class="section__head"><div><h2 id="feat-title">Featured products</h2><p>A selection from the catalogue. Open an item for its material, size, care and typical use.</p></div>' + m.moreLink(url.page("products"), "See all products") + "</div>" +
      m.productGrid(feat, "pgrid--4") + '<div style="margin-top:22px">' + m.notice("catalogue") + "</div></div></section>" +
      '<section class="section" aria-labelledby="pop-title"><div class="container">' +
      '<div class="section__head"><div><h2 id="pop-title">Popular items</h2><p>Items people often look up before they visit.</p></div></div>' +
      '<div class="plist">' + S.popular(8).map(m.productItem).join("") + "</div></div></section>" +
      '<section class="section section--mist" aria-labelledby="brand-title"><div class="container">' +
      '<div class="section__head"><div><h2 id="brand-title">Featured brands</h2><p>Manufacturers whose products appear in our catalogue.</p></div>' + m.moreLink(url.page("brands"), "Brand directory") + "</div>" +
      '<div class="brandrow">' + brands.map(m.brandTile).join("") + "</div></div></section>" +
      m.essentials() +
      '<section class="section section--mist" aria-labelledby="svc-title"><div class="container">' +
      '<div class="section__head"><div><h2 id="svc-title">Services</h2><p>How we can help, in store or by phone.</p></div>' + m.moreLink(url.page("services"), "All services") + "</div>" +
      m.serviceCards(S.services().filter(function (s) { return s.home; }).slice(0, 6), false) + "</div></section>" +
      m.why() + m.aboutSummary() + m.promo() + m.testimonials() +
      '<section class="section" aria-labelledby="news-title"><div class="container split split--even"><div>' +
      '<div class="section__head" style="margin-bottom:18px"><div><h2 id="news-title">Lab guides</h2></div>' + m.moreLink(url.page("guides"), "All guides") + "</div>" +
      m.articleCards(S.articles().slice(0, 2), false) + "</div><div>" +
      '<div class="section__head" style="margin-bottom:18px"><div><h2>Latest announcements</h2></div></div>' + m.announcements() + "</div></div></section>" +
      m.faqSection(5);
  };
})();
