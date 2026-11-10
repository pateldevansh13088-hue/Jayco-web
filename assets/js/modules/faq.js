/* MODULE 14: Frequently asked questions (native <details>, works without JavaScript). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var icon = J.icon, esc = J.u.esc;

  m.faqList = function (limit) {
    var list = J.data.faqs.slice(0, limit || 99);
    return '<div class="faq">' + list.map(function (f) {
      return "<details><summary><span>" + esc(f.q) + "</span>" + icon("down", 20) + '</summary><div class="faq__body"><p>' + esc(f.a) + "</p></div></details>";
    }).join("") + "</div>";
  };

  m.faqSection = function (limit) {
    return '<section class="section" aria-labelledby="faq-title"><div class="container split"><div><h2 id="faq-title">Frequently asked questions</h2>' +
      '<p class="lead" style="margin-top:12px">Can\'t find your answer? Call or message us.</p>' + m.ctaRow(null, { noDirections: true }) + "</div>" + m.faqList(limit) + "</div></section>";
  };
})();
