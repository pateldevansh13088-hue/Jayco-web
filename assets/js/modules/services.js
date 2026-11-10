/* MODULE 9: Services. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, S = J.store, esc = u.esc;

  m.serviceCards = function (list, detailed) {
    return '<div class="svc' + (detailed ? "" : " svc--3") + '">' + list.map(function (s) {
      return '<article class="scard"><span class="scard__icon">' + icon(s.icon, 24) + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.summary) + "</p>" +
        (detailed ? "<ul>" + s.points.map(function (p) { return "<li>" + icon("check", 17) + "<span>" + esc(p) + "</span></li>"; }).join("") + "</ul>" : "") +
        (detailed ? '<div class="scard__cta"><a class="btn btn--wa btn--sm" href="' + J.link.whatsapp(s.message) + '" rel="noopener">' + icon("message", 16) + "Ask on WhatsApp</a>" +
          '<a class="btn btn--ghost btn--sm" href="' + J.link.tel() + '">' + icon("phone", 16) + "Call</a></div>" : "") + "</article>";
    }).join("") + "</div>";
  };

  m.servicesPage = function () {
    var steps = J.data.enquirySteps.map(function (s) { return "<li><strong>" + esc(s.title) + "</strong><span>" + esc(s.text) + "</span></li>"; }).join("");
    return m.pagehead({
      title: "Services",
      lead: "What we can help with, in store or over the phone. Services marked here are those the shop provides.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Services" }]
    }) + '<section class="section section--tight"><div class="container">' + m.serviceCards(S.services(), true) + "</div></section>" +
      '<section class="section section--mist"><div class="container"><div class="section__head"><div><h2>How an availability enquiry works</h2>' +
      "<p>It takes a minute, and it saves a trip if we don't have what you need.</p></div></div><ol class=\"steps\">" + steps + "</ol>" +
      m.ctaRow("Hello, I would like to check availability of a product.", { lg: true }) + "</div></section>" +
      '<section class="section section--tight"><div class="container">' + m.notice("catalogue") + "</div></section>";
  };
})();
