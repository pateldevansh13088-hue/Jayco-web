/* ==========================================================================
   SUBJECTS (groups) + CATEGORIES
   The four subjects mirror the original biochemphy.com menu:
   Biology, Chemistry, Physics and General Laboratory Items.
   A product belongs to one primary category (product.category) and can also
   appear in others (product.also).
   ========================================================================== */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  J.data = J.data || {};

  J.data.groups = [
    { slug: "biology", name: "Biology", description: "Microscopes, slides, dissection kits, anatomical models and charts for biology teaching and practicals." },
    { slug: "chemistry", name: "Chemistry", description: "Apparatus, stands, heating equipment, titration ware and teaching kits for chemistry practicals." },
    { slug: "physics", name: "Physics", description: "Meters, optics, measuring instruments and magnets for physics practicals and demonstrations." },
    { slug: "laboratory", name: "General laboratory items", description: "Glassware, plasticware, rubberware, metal and porcelain ware, filter papers, equipment and lab safety supplies." }
  ];

  /* home:n → shown in the 12-tile grid on the homepage, in this order. */
  J.data.categories = [
    /* ---------- Biology ---------- */
    { slug: "microscopes-slides", name: "Microscopes and slides", group: "biology", icon: "microscope", home: 1,
      short: "Student and binocular microscopes, slides, cover slips.",
      description: "Compound microscopes for school and college biology, plus prepared and blank glass slides and cover slips." },
    { slug: "dissection-kits", name: "Dissection kits", group: "biology", icon: "scissors",
      short: "Instruments and trays for dissection practicals.",
      description: "Stainless steel dissection instruments and trays for biology practicals." },
    { slug: "anatomical-models", name: "Anatomical models", group: "biology", icon: "heart", home: 2,
      short: "Torso, skeleton and organ teaching models.",
      description: "Teaching models of the human body, such as the torso, skeleton and heart, for biology classrooms." },
    { slug: "biology-charts", name: "Biology charts", group: "biology", icon: "book",
      short: "Wall charts for biology lessons.",
      description: "Laminated wall charts covering cells, body systems and other biology topics." },

    /* ---------- Chemistry ---------- */
    { slug: "chemistry-apparatus", name: "Chemistry apparatus", group: "chemistry", icon: "flask", home: 3,
      short: "Stands, clamps, funnels, bottles and holders.",
      description: "Retort stands, tripods, funnels, reagent bottles and other apparatus used in chemistry practicals." },
    { slug: "titration-ware", name: "Titration and measuring ware", group: "chemistry", icon: "drop", home: 4,
      short: "Burettes, pipettes, volumetric flasks, cylinders.",
      description: "Graduated glassware for measuring and titrating: burettes, pipettes, volumetric flasks and measuring cylinders." },
    { slug: "heating-equipment", name: "Heating equipment", group: "chemistry", icon: "flame",
      short: "Burners, hot plates, water baths.",
      description: "Bunsen burners, hot plates and water baths for heating in the laboratory." },
    { slug: "chemistry-kits", name: "Teaching kits and charts", group: "chemistry", icon: "package",
      short: "Molecular model kits and charts.",
      description: "Molecular model kits and charts, including the periodic table, for teaching chemistry." },

    /* ---------- Physics ---------- */
    { slug: "meters", name: "Meters", group: "physics", icon: "gauge", home: 5,
      short: "Multimeters, ammeters, voltmeters, pH meters.",
      description: "Electrical and chemical meters: multimeters, ammeters, voltmeters and pH meters." },
    { slug: "optics", name: "Optics", group: "physics", icon: "search", home: 6,
      short: "Lenses and prisms.",
      description: "Lenses, prisms and other optical items for physics practicals." },
    { slug: "measuring-instruments", name: "Measuring instruments", group: "physics", icon: "ruler",
      short: "Vernier calipers, screw gauges, spring balances.",
      description: "Precision measuring instruments such as vernier calipers, screw gauges and spring balances." },
    { slug: "magnets", name: "Magnets", group: "physics", icon: "magnet",
      short: "Bar and horseshoe magnets.",
      description: "Bar magnets and horseshoe magnets for magnetism experiments." },

    /* ---------- General laboratory items ---------- */
    { slug: "glassware", name: "Laboratory glassware", group: "laboratory", icon: "flask", home: 7,
      short: "Beakers, flasks, test tubes, funnels.",
      description: "Borosilicate beakers, flasks, test tubes and other glassware for school, college and professional laboratories." },
    { slug: "plasticware", name: "Laboratory plasticware", group: "laboratory", icon: "tube", home: 8,
      short: "Petri dishes, tubes, bottles, containers.",
      description: "Petri dishes, centrifuge tubes, wash bottles and other plasticware." },
    { slug: "rubberware", name: "Laboratory rubberware", group: "laboratory", icon: "package", home: 9,
      short: "Stoppers, tubing, gloves.",
      description: "Rubber stoppers, tubing and gloves for laboratory use." },
    { slug: "metalware", name: "Laboratory metal ware", group: "laboratory", icon: "sliders", home: 10,
      short: "Holders, tongs, stands.",
      description: "Metal holders, tongs and racks used at the laboratory bench." },
    { slug: "porcelainware", name: "Laboratory porcelain ware", group: "laboratory", icon: "package", home: 11,
      short: "Mortars, crucibles, evaporating dishes.",
      description: "Porcelain mortars and pestles, crucibles and evaporating dishes." },
    { slug: "filter-papers", name: "Filter and indicator papers", group: "laboratory", icon: "file", home: 12,
      short: "Filter paper circles, pH and litmus papers.",
      description: "Qualitative filter papers and indicator papers such as pH and litmus strips." },
    { slug: "lab-equipment", name: "Laboratory equipment", group: "laboratory", icon: "activity",
      short: "Balances, stirrers, centrifuges, baths.",
      description: "Digital balances, magnetic stirrers, centrifuges and other bench equipment." },
    { slug: "lab-safety", name: "Lab safety supplies", group: "laboratory", icon: "shield",
      short: "Goggles, gloves, lab coats.",
      description: "Safety goggles, gloves and lab coats for students and staff." }
  ];
})();
