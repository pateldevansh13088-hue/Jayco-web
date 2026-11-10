/* MODULE 8: Brand directory (A–Z directory, brand search, brand pages). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store, esc = u.esc;

  function tone(name) { var n = 0; for (var i = 0; i < name.length; i++) n += name.charCodeAt(i); return n % 5; }
  function initials(name) {
    var w = name.replace(/[^A-Za-z0-9 -]/g, "").split(/[ -]+/).filter(Boolean);
    return (w.length > 1 ? w[0][0] + w[1][0] : name.slice(0, 2)).toUpperCase();
  }
  m.brandMark = function (b, large) {
    if (b.logo) return '<span class="mono' + (large ? " mono--lg" : "") + '" style="background:#fff;border:1px solid var(--line)"><img src="' + url.asset(b.logo) + '" alt="' + esc(b.name) + ' logo" width="' + (large ? 64 : 36) + '" height="' + (large ? 64 : 36) + '" loading="lazy"></span>';
    return '<span class="mono' + (large ? " mono--lg" : "") + '" data-tone="' + tone(b.name) + '" aria-hidden="true">' + esc(initials(b.name)) + "</span>";
  };

  m.brandTile = function (b) {
    var n = S.brandCount(b.name);
    return '<a class="btile" href="' + url.brand(b.name) + '">' + m.brandMark(b) + "<span><strong>" + esc(b.name) + "</strong><small>" + u.plural(n, "product") + "</small></span></a>";
  };

  m.brandCard = function (b) {
    var n = S.brandCount(b.name);
    return '<article class="bcard" data-brand="' + esc((b.name + " " + b.company).toLowerCase()) + '"><div class="bcard__head">' + m.brandMark(b) +
      "<div><h3>" + esc(b.name) + '</h3><p class="bcard__company">' + esc(b.company) + "</p></div></div><p>" + esc(b.short) + "</p>" +
      '<div class="bcard__foot"><span class="muted" style="font-size:.88rem">' + u.plural(n, "product") + "</span>" +
      '<a class="btn btn--soft btn--sm" href="' + url.brand(b.name) + '">View products<span class="sr-only"> from ' + esc(b.name) + "</span></a></div></article>";
  };

  m.brandsPage = function () {
    var brands = S.brands(), groups = {};
    brands.forEach(function (b) { var l = b.name[0].toUpperCase(); (groups[l] = groups[l] || []).push(b); });
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var bar = '<nav class="azbar" aria-label="Jump to letter">' + letters.map(function (l) {
      return groups[l] ? '<a href="#letter-' + l + '">' + l + "</a>" : '<span aria-hidden="true">' + l + "</span>";
    }).join("") + "</nav>";
    var body = letters.filter(function (l) { return groups[l]; }).map(function (l) {
      return '<section class="azgroup" id="letter-' + l + '" data-letter><h2>' + l + '</h2><div class="grid grid--wide">' + groups[l].map(m.brandCard).join("") + "</div></section>";
    }).join("");
    return m.pagehead({
      title: "Brands and manufacturers",
      lead: "Brands whose products appear in our directory, with the company behind each one.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Brands" }]
    }) + '<section class="section section--tight"><div class="container">' +
      '<form class="sbox" role="search" data-brandsearch onsubmit="return false"><div class="sbox__field">' + icon("search", 22) +
      '<label class="sr-only" for="brand-q">Search brands</label><input id="brand-q" class="sbox__input" type="search" placeholder="Search brands or companies…" autocomplete="off"></div></form>' +
      bar + '<p class="sr-only" role="status" aria-live="polite" data-brand-live></p><div data-brandlist>' + body + "</div>" +
      '<div class="empty" data-brand-empty hidden style="margin-top:30px"><h3>No brand matches your search</h3><p>Try another spelling, or call us to ask about a brand that is not listed.</p></div>' +
      '<div style="margin-top:36px">' + m.notice("catalogue") + "</div></div></section>";
  };

  m.brandPage = function (b) {
    var list = S.productsByBrand(b.name);
    return '<section class="pagehead"><div class="container">' +
      m.crumbs([{ label: "Home", href: url.page("home") }, { label: "Brands", href: url.page("brands") }, { label: b.name }]) +
      '<div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">' + m.brandMark(b, true) + "<div><h1>" + esc(b.name) + '</h1><p class="lead" style="margin-top:6px">' + esc(b.company) + "</p></div></div>" +
      '<p class="lead" style="margin-top:16px">' + esc(b.short) + "</p></div></section>" +
      '<section class="section section--tight"><div class="container"><h2 style="font-size:1.5rem;margin-bottom:18px">' + u.plural(list.length, "product") + " from " + esc(b.name) + "</h2>" +
      (list.length ? m.productGrid(list) : '<div class="empty"><h3>No products listed yet</h3><p>Call or message us to ask about this brand.</p></div>') +
      '<div style="margin-top:30px">' + m.notice("catalogue") + "</div></div></section>";
  };
})();
