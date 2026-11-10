/* ==========================================================================
   BRANDS — one entry per brand shown in the directory.
   product.brand must match a brand.name below.
   Add `logo: "assets/img/brands/xyz.png"` to show a real logo; without it a
   monogram tile is drawn. Descriptions are intentionally short and factual.
   Check this list against the brands the shop really stocks.
   ========================================================================== */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  J.data = J.data || {};

  J.data.brands = [
    { name: "Borosil", company: "Borosil Scientific Limited", short: "Borosilicate laboratory glassware." },
    { name: "Riviera Glass", company: "Riviera Glass Private Limited", short: "Laboratory glassware." },
    { name: "Tarsons", company: "Tarsons Products Limited", short: "Laboratory plasticware and consumables." },
    { name: "Whatman", company: "Cytiva", short: "Laboratory filtration products, including filter papers." },
    { name: "Meco", company: "Meco Instruments Private Limited", short: "Electrical and electronic test and measuring instruments." },
    { name: "Motwane", company: "Motwane Manufacturing Company Private Limited", short: "Electrical test and measuring instruments." },
    { name: "Generic", company: "Various manufacturers", short: "Unbranded laboratory items from several manufacturers, supplied as per stock." }
  ];
})();
