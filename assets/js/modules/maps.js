/* MODULE 12: Google Maps. Uses the free embed URL (no API key). To pin the exact
   spot, open Google Maps → Share → Embed a map, and paste the src URL into
   `contact.mapEmbedUrl` in data/site.js. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var icon = J.icon, esc = J.u.esc;

  m.map = function () {
    var c = J.data.site.contact;
    return '<div class="map"><iframe title="Map showing ' + esc(J.data.site.name) + ', ' + esc(c.addressOneLine) + '" src="' + esc(J.link.mapEmbed()) +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
      '<div class="map__foot"><address>' + c.addressLines.map(esc).join(", ") + "</address>" +
      '<a class="btn btn--primary btn--sm" href="' + J.link.directions() + '" rel="noopener">' + icon("navigation", 16) + "Get directions</a></div></div>";
  };
})();
