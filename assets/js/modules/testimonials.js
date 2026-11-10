/* MODULE 13: Customer testimonials. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var icon = J.icon, esc = J.u.esc;

  m.testimonials = function () {
    var list = J.data.testimonials;
    if (!list.length) return "";
    var cards = list.map(function (t) {
      var stars = "";
      for (var i = 0; i < 5; i++) stars += icon("star", 17).replace('fill="none"', 'fill="' + (i < t.rating ? "currentColor" : "none") + '"');
      return '<figure class="quote"><div class="stars" role="img" aria-label="' + t.rating + ' out of 5 stars">' + stars + "</div>" +
        "<blockquote>“" + esc(t.text) + "”</blockquote><figcaption><span><strong>" + esc(t.name) + "</strong><span>" + esc(t.role) + "</span></span></figcaption></figure>";
    }).join("");
    return '<section class="section section--mist" aria-labelledby="quotes-title"><div class="container"><div class="section__head"><div><h2 id="quotes-title">What customers say</h2></div></div>' +
      '<div class="quotes">' + cards + "</div>" +
      (J.data.sampleTestimonials ? '<p class="sample-note">' + icon("info", 16) + "<span>These are sample testimonials. Real customer feedback will replace them.</span></p>" : "") +
      "</div></section>";
  };
})();
