/* MODULES 1, 2, 15: Header, Navigation, Footer (+ page shell, breadcrumbs, notices).
   Each module returns an HTML string so the same code runs in the browser and
   in the build script that pre-renders the pages. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store;
  var site = function () { return J.data.site; };
  var esc = u.esc;

  var NAV = [
    { key: "home", label: "Home", href: "home" },
    { key: "about", label: "About Us", href: "about" },
    { key: "products", label: "Products", href: "products" },
    { key: "categories", label: "Categories", href: "categories", mega: true },
    { key: "services", label: "Services", href: "services" },
    { key: "contact", label: "Contact Us", href: "contact" }
  ];

  /* ------------------------------------------------------------------ */
  m.brandmark = function (inFooter) {
    var s = site();
    return '<a class="brandmark" href="' + url.page("home") + '" aria-label="' + esc(s.name) + ', home">' +
      J.logo(42) + '<span class="brandmark__text"><span class="brandmark__name">' + esc(s.name) + "</span>" +
      '<span class="brandmark__sub">' + esc(s.tagline) + "</span></span></a>";
  };

  /* ---------------- Search box (shared by header, hero, 404…) ---------------- */
  var sboxCount = 0;
  m.sbox = function (o) {
    o = o || {};
    var id = o.id || "sbox-" + ++sboxCount;
    return '<form class="sbox' + (o.large ? " sbox--lg" : "") + '" role="search" action="' + url.page("search") + '" method="get" data-sbox' +
      (o.stay ? ' data-stay="1"' : "") + ">" +
      '<div class="sbox__field">' + icon("search", 22) +
      '<label class="sr-only" for="' + id + '">Search products, brands and categories</label>' +
      '<input id="' + id + '" class="sbox__input" type="search" name="q" value="' + esc(o.value || "") + '" placeholder="' + esc(o.placeholder || "Search glassware, microscope, burette…") +
      '" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="' + id + '-list">' +
      '<button type="button" class="sbox__clear" aria-label="Clear search">' + icon("x", 18) + "</button>" +
      '<button class="btn btn--primary' + (o.large ? " btn--lg" : "") + '" type="submit">Search</button></div>' +
      '<div class="sdrop" id="' + id + '-list" role="listbox" aria-label="Search suggestions" hidden></div></form>';
  };

  /* ---------------- Top bar ---------------- */
  m.topbar = function () {
    var s = site(), c = s.contact;
    var pinned = (J.data.announcements.filter(function (a) { return a.pinned; })[0]) || J.data.announcements[0];
    return '<div class="topbar"><div class="container topbar__inner">' +
      '<p class="topbar__notice" data-notice>' + icon("megaphone", 16) + "<span>" + (pinned ? esc(pinned.title) + ". " + esc(pinned.text) : esc(s.tagline)) + "</span></p>" +
      '<div class="topbar__links"><a href="' + link_tel() + '">' + icon("phone", 15) + esc(c.phones[0].display) + "</a>" +
      '<a href="' + J.link.whatsapp() + '" rel="noopener">' + icon("message", 15) + "WhatsApp</a></div></div></div>";
  };
  function link_tel() { return J.link.tel(); }

  /* ---------------- Navigation ---------------- */
  m.megaMenu = function () {
    var cols = S.groups().map(function (g) {
      return "<div><p class=\"mega__title\"><a href=\"" + url.subject(g.slug) + "\">" + esc(g.name) + "</a></p>" + S.categoriesIn(g.slug).map(function (c) {
        return '<a href="' + url.category(c.slug) + '">' + esc(c.name) + "</a>";
      }).join("") + "</div>";
    }).join("");
    return '<div class="mega" id="mega-categories" role="region" aria-label="Browse categories"><div class="mega__cols">' + cols + "</div>" +
      '<div class="mega__foot"><a href="' + url.page("categories") + '">All categories ' + icon("arrowRight", 16) + "</a>" +
      '<a href="' + url.page("brands") + '">Brands ' + icon("arrowRight", 16) + "</a>" +
      '<a href="' + url.page("guides") + '">Lab guides ' + icon("arrowRight", 16) + "</a></div></div>";
  };

  m.nav = function (active) {
    var items = NAV.map(function (n) {
      var cur = n.key === active ? ' aria-current="page"' : "";
      if (n.mega) {
        return '<li class="nav__item" data-mega><button class="nav__link" type="button" aria-expanded="false" aria-controls="mega-categories"' + cur + ">" +
          esc(n.label) + icon("down", 16) + "</button>" + m.megaMenu() + "</li>";
      }
      return '<li class="nav__item"><a class="nav__link" href="' + url.page(n.href) + '"' + cur + ">" + esc(n.label) + "</a></li>";
    }).join("");
    return '<nav class="nav" aria-label="Main"><ul class="nav__list">' + items + "</ul></nav>";
  };

  m.drawer = function (active) {
    var rows = NAV.map(function (n) {
      var cur = n.key === active ? ' aria-current="page"' : "";
      if (n.mega) {
        var subs = S.groups().map(function (g) {
          return '<p class="mega__title"><a href="' + url.subject(g.slug) + '">' + esc(g.name) + "</a></p>" + S.categoriesIn(g.slug).map(function (c) {
            return '<a href="' + url.category(c.slug) + '">' + esc(c.name) + "</a>";
          }).join("");
        }).join("");
        return "<details><summary>" + esc(n.label) + icon("down", 18) + '</summary><div class="drawer__sub">' + subs +
          '<a href="' + url.page("categories") + '"><strong>All categories</strong></a></div></details>';
      }
      return '<a class="drawer__link" href="' + url.page(n.href) + '"' + cur + ">" + esc(n.label) + "</a>";
    }).join("");
    rows += '<a class="drawer__link" href="' + url.page("brands") + '">Brands</a><a class="drawer__link" href="' + url.page("guides") + '">Lab guides</a>';
    return '<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu"><div class="drawer__scrim" data-close-drawer></div>' +
      '<div class="drawer__panel"><div class="drawer__head">' + m.brandmark() +
      '<button class="iconbtn" type="button" data-close-drawer aria-label="Close menu">' + icon("x", 22) + "</button></div>" + rows +
      '<div class="drawer__cta"><a class="btn btn--primary" href="' + J.link.tel() + '">' + icon("phone", 18) + "Call now</a>" +
      '<a class="btn btn--wa" href="' + J.link.whatsapp() + '" rel="noopener">' + icon("message", 18) + "Chat on WhatsApp</a>" +
      '<a class="btn btn--ghost" href="' + J.link.directions() + '" rel="noopener">' + icon("navigation", 18) + "Get directions</a></div></div></div>";
  };

  m.searchOverlay = function () {
    return '<div class="soverlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Search"><div class="soverlay__panel">' +
      m.sbox({ id: "sbox-overlay", large: true }) + '<p class="soverlay__hint">Press Esc to close. Search by item name, brand, material, size or manufacturer.</p></div></div>';
  };

  m.header = function (active) {
    return '<header class="header" id="top"><div class="container header__inner">' + m.brandmark() + m.nav(active) +
      '<div class="header__tools"><button class="iconbtn" type="button" data-open-search aria-label="Search" aria-haspopup="dialog">' + icon("search", 21) + "</button>" +
      '<button class="iconbtn menu-toggle" type="button" data-open-drawer aria-label="Open menu" aria-haspopup="dialog">' + icon("menu", 22) + "</button></div></div></header>" +
      m.drawer(active) + m.searchOverlay();
  };

  /* ---------------- Footer ---------------- */
  m.footer = function () {
    var s = site(), c = s.contact;
    var quick = [["home", "Home"], ["about", "About us"], ["products", "Products"], ["categories", "Categories"],
      ["brands", "Brands"], ["services", "Services"], ["guides", "Lab guides"], ["contact", "Contact us"]];
    var cats = S.homeCategories().slice(0, 8);
    var phones = c.phones.map(function (p) { return '<a href="tel:' + p.tel + '">' + esc(p.display) + "</a>"; }).join(", ");
    var year = new Date().getFullYear();
    return '<footer class="footer"><div class="container"><div class="footer__grid">' +
      "<div>" + m.brandmark() + '<p class="footer__about">' + esc(s.about.intro[0]) + "</p></div>" +
      "<div><h2>Explore</h2><ul>" + quick.map(function (q) { return '<li><a href="' + url.page(q[0]) + '">' + q[1] + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h2>Popular categories</h2><ul>" + cats.map(function (x) { return '<li><a href="' + url.category(x.slug) + '">' + esc(x.name) + "</a></li>"; }).join("") + "</ul></div>" +
      '<div><h2>Visit or call</h2><ul class="footer__contact">' +
      "<li>" + icon("pin", 17) + "<span>" + c.addressLines.map(esc).join("<br>") + "</span></li>" +
      "<li>" + icon("phone", 17) + "<span>" + phones + "</span></li>" +
      "<li>" + icon("message", 17) + '<span><a href="' + J.link.whatsapp() + '" rel="noopener">WhatsApp ' + esc(c.whatsapp.display) + "</a></span></li>" +
      "<li>" + icon("mail", 17) + '<span><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></span></li></ul></div></div>" +
      '<div class="footer__legal"><p>' + esc(s.disclaimers.safety) + "</p><p>" + esc(s.disclaimers.catalogue) + "</p>" +
      '<div class="footer__bottom"><span>&copy; ' + year + " " + esc(s.legalName) + ". All rights reserved.</span>" +
      '<span><a href="' + url.page("privacy") + '">Privacy policy</a>' +
      (s.social.length ? " &nbsp;|&nbsp; " + s.social.map(function (x) { return '<a href="' + esc(x.url) + '" rel="noopener">' + esc(x.label) + "</a>"; }).join(" &nbsp;|&nbsp; ") : "") +
      "</span></div></div></div></footer>" +
      '<nav class="mbar" aria-label="Quick contact"><a href="' + J.link.tel() + '">' + icon("phone", 21) + "Call</a>" +
      '<a href="' + J.link.whatsapp() + '" rel="noopener">' + icon("message", 21) + "WhatsApp</a>" +
      '<a href="' + J.link.directions() + '" rel="noopener">' + icon("navigation", 21) + "Directions</a></nav>";
  };

  /* ---------------- Small shared pieces ---------------- */
  m.crumbs = function (items) {
    return '<nav class="crumbs" aria-label="Breadcrumb">' + items.map(function (it, i) {
      var last = i === items.length - 1;
      return (i ? icon("right", 14) : "") + (last ? '<span aria-current="page">' + esc(it.label) + "</span>" : '<a href="' + it.href + '">' + esc(it.label) + "</a>");
    }).join("") + "</nav>";
  };

  m.pagehead = function (o) {
    return '<section class="pagehead"><div class="container">' + (o.crumbs ? m.crumbs(o.crumbs) : "") +
      "<h1>" + esc(o.title) + "</h1>" + (o.lead ? '<p class="lead">' + esc(o.lead) + "</p>" : "") + (o.extra || "") + "</div></section>";
  };

  m.notice = function (kind) {
    var d = site().disclaimers;
    if (kind === "catalogue") return '<div class="notice notice--blue" role="note">' + icon("info", 20) + "<div><strong>Availability and prices</strong>" + esc(d.catalogue) + "</div></div>";
    return '<div class="notice" role="note">' + icon("alert", 20) + "<div><strong>Safe use</strong>" + esc(d.safety) + "</div></div>";
  };

  m.ctaRow = function (message, opts) {
    opts = opts || {};
    return '<div class="' + (opts.cls || "cta-row") + '"><a class="btn btn--primary' + (opts.lg ? " btn--lg" : "") + '" href="' + J.link.tel() + '">' + icon("phone", 18) + "Call now</a>" +
      '<a class="btn btn--wa' + (opts.lg ? " btn--lg" : "") + '" href="' + J.link.whatsapp(message) + '" rel="noopener">' + icon("message", 18) + "Chat on WhatsApp</a>" +
      (opts.noDirections ? "" : '<a class="btn btn--ghost' + (opts.lg ? " btn--lg" : "") + '" href="' + J.link.directions() + '" rel="noopener">' + icon("navigation", 18) + "Get directions</a>") + "</div>";
  };

  /* ---------------- Page shell ---------------- */
  m.document = function (page) {
    var s = site(), root = J.ctx.root;
    var title = page.title === s.name ? s.name + " | " + s.tagline : page.title + " | " + s.shortName;
    var desc = page.description || s.description;
    var canonical = page.path === "index.html" ? url.abs("") : url.abs(page.path);
    var image = url.abs("assets/img/og-image.png");
    var ld = (page.jsonld || []).map(function (o) { return '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, "\\u003c") + "</script>"; }).join("\n");
    return "<!doctype html>\n" +
      '<html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
      "<title>" + esc(title) + "</title>" +
      '<meta name="description" content="' + esc(desc) + '">' +
      (page.noindex ? '<meta name="robots" content="noindex">' : '<link rel="canonical" href="' + esc(canonical) + '">') +
      '<meta name="theme-color" content="#1654c9">' +
      '<meta property="og:type" content="' + (page.ogType || "website") + '"><meta property="og:site_name" content="' + esc(s.name) + '">' +
      '<meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '">' +
      '<meta property="og:url" content="' + esc(canonical) + '"><meta property="og:image" content="' + esc(image) + '">' +
      '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale" content="en_IN">' +
      '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' + esc(title) + '"><meta name="twitter:description" content="' + esc(desc) + '">' +
      '<link rel="icon" href="' + root + 'assets/img/favicon.svg" type="image/svg+xml">' +
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&amp;family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&amp;display=swap">' +
      '<link rel="stylesheet" href="' + root + 'assets/css/styles.css">' + ld + "</head>" +
      '<body data-page="' + esc(page.key) + '" data-root="' + root + '"' + (page.attrs || "") + ">" +
      '<a class="skip" href="#main">Skip to main content</a>' +
      '<noscript><p class="noscript">Some features, such as instant search suggestions and filters, need JavaScript. You can still browse every page, call us or message us.</p></noscript>' +
      m.topbar() + m.header(page.nav) + '<main id="main" tabindex="-1">' + page.body + "</main>" + m.footer() +
      '<script src="' + root + 'assets/js/site.bundle.js" defer></script></body></html>';
  };
})();
