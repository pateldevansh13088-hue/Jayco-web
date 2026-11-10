/* ==========================================================================
   PRODUCTS — information listings only.
   There is deliberately no price, stock or purchase field anywhere in this
   data model: the site shows product information, not availability.

   SAMPLE CONTENT: every record below was written to show the layout, using
   the kinds of items the original biochemphy.com lists (glassware, plasticware,
   rubberware, metal and porcelain ware, filter papers, meters, apparatus,
   teaching models and charts). The owner must check each one against the real
   stock before publishing, then set `sample` to false (or delete the item).

   Fields
     slug, name, brand (must match brands.js), alt (also called…), spec
     (material / specification), maker (manufacturer), size (size or capacity),
     type (product type), supplied (how it is supplied), category, also[],
     description, use (typical use), storage (optional), image (optional photo
     path), art (illustration until a photo is added), featured, popular, sample
   ========================================================================== */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  J.data = J.data || {};

  J.data.storageDefaults = {
    biology: "Keep microscopes covered and dry when not in use. Store slides, models and charts away from direct sunlight, dampness and heat.",
    chemistry: "Store on a stable shelf or rack, clean and dry. Keep glass items padded or in racks, and keep heating equipment away from flammable materials.",
    physics: "Store in a dry place in the original box or case. Keep meters and instruments away from moisture and strong magnets, and remove batteries if unused for long.",
    laboratory: "Store on a stable shelf or rack, clean and dry. Handle glass with care and keep items away from heat and corrosive substances unless they are rated for them."
  };

  var list = [];
  var GEN = "Various manufacturers";

  /* p(slug, name, brand, spec, maker, size, type, supplied, category, also[], art, description, use, flags, alt) */
  function p(slug, name, brand, spec, maker, size, type, supplied, category, also, art, description, use, flags, alt) {
    flags = flags || "";
    list.push({
      slug: slug, name: name, brand: brand, generic: alt || "", composition: spec, manufacturer: maker, strength: size, form: type,
      pack: supplied, category: category, also: also || [], description: description, usage: use, art: art,
      featured: flags.indexOf("f") > -1, popular: flags.indexOf("p") > -1, sample: true
    });
  }

  /* ------------------------------- Biology ------------------------------- */
  p("compound-microscope", "Compound Microscope, Student", "Generic", "Monocular, 100x to 400x, LED illumination", GEN, "100x to 400x", "Microscope", "1 unit",
    "microscopes-slides", [], "microscope", "Monocular compound microscope for school and college biology.",
    "Used to view prepared slides and thin specimens. Carry with both hands and keep the lenses clean and covered when not in use.", "fp");
  p("binocular-microscope", "Binocular Compound Microscope", "Generic", "Binocular head, 40x to 1000x, LED illumination", GEN, "40x to 1000x", "Microscope", "1 unit",
    "microscopes-slides", [], "microscope", "Binocular microscope for college and research-level observation.",
    "Used for longer viewing sessions and higher magnification. Use immersion oil only as the manual directs.");
  p("prepared-slides-set", "Prepared Microscope Slides, Biology Set", "Generic", "Stained specimens mounted on glass slides", GEN, "Standard 75 x 25 mm", "Slide set", "Set of 25 slides",
    "microscopes-slides", [], "slides", "Set of ready-made slides of plant and animal tissues for classroom study.",
    "Used with a compound microscope. Hold slides by the edges and store them flat in the box.", "p");
  p("plain-slides-cover-slips", "Plain Glass Slides and Cover Slips", "Generic", "Clear glass slides with square cover slips", GEN, "75 x 25 mm slides", "Slides and cover slips", "Box of 50 slides",
    "microscopes-slides", ["glassware"], "slides", "Blank glass slides and cover slips for preparing your own specimens.",
    "Used to mount specimens for viewing. Handle thin cover slips gently, since they break easily.");
  p("dissection-kit", "Dissection Kit, Stainless Steel", "Generic", "Scalpel, forceps, scissors, needles and probes in a case", GEN, "Set of 10 pieces", "Dissection kit", "1 kit in case",
    "dissection-kits", [], "dissection", "Stainless steel dissection instruments for biology practicals.",
    "Used under teacher supervision. Wash and dry the instruments after use and handle blades with care.", "f");
  p("dissecting-tray", "Dissecting Tray", "Generic", "Metal tray with a wax-lined base", GEN, "Approx. 30 x 20 cm", "Dissecting tray", "1 piece",
    "dissection-kits", [], "box", "Shallow tray that holds specimens during dissection.",
    "Used with a dissection kit. Clean and dry the tray after each practical.");
  p("human-torso-model", "Human Torso Model, Teaching", "Generic", "Painted PVC, detachable organs", GEN, "Table-top", "Anatomical model", "1 model",
    "anatomical-models", [], "model", "Human torso model with removable organs for biology teaching.",
    "Used to show the position of organs. Handle detachable parts gently and store in the box provided.", "f");
  p("human-skeleton-model", "Human Skeleton Model", "Generic", "PVC skeleton on a stand", GEN, "Half life size", "Anatomical model", "1 model with stand",
    "anatomical-models", [], "model", "Skeleton model on a rolling stand for anatomy lessons.",
    "Used to teach bones and joints. Keep it covered when not in use to protect it from dust.");
  p("human-heart-model", "Human Heart Model, Teaching", "Generic", "Painted PVC, two-part", GEN, "Life size", "Anatomical model", "1 model",
    "anatomical-models", [], "model", "Two-part heart model that opens to show the chambers.",
    "Used to teach heart structure. Open and close the halves gently.");
  p("human-body-systems-chart", "Human Body Systems Wall Charts", "Generic", "Laminated charts", GEN, "Standard wall size", "Wall chart", "Set of charts",
    "biology-charts", [], "chart", "Charts showing the digestive, respiratory, circulatory and other body systems.",
    "Used for classroom display. Ask us which topics are available for your syllabus and language.");
  p("plant-animal-cell-chart", "Plant and Animal Cell Chart", "Generic", "Laminated chart", GEN, "Standard wall size", "Wall chart", "1 chart",
    "biology-charts", [], "chart", "Side-by-side chart of a plant cell and an animal cell with labelled parts.",
    "Used for classroom display and revision.");

  /* ------------------------------ Chemistry ------------------------------ */
  p("retort-stand", "Retort Stand with Clamp and Boss Head", "Generic", "Cast iron base, steel rod, adjustable clamp", GEN, "Rod 60 cm", "Retort stand", "1 set",
    "chemistry-apparatus", [], "stand", "Heavy base stand that holds flasks, burettes and tubes at the bench.",
    "Used to hold apparatus securely during experiments. Tighten the boss head and check the stand is steady.", "p");
  p("tripod-wire-gauze", "Tripod Stand and Wire Gauze", "Generic", "Steel tripod with asbestos-free gauze", GEN, "Standard", "Tripod stand", "1 set",
    "chemistry-apparatus", ["heating-equipment"], "stand", "Tripod and gauze that support glassware above a burner.",
    "Used when heating beakers and flasks. Let it cool fully before handling.");
  p("glass-funnel-75", "Glass Funnel", "Generic", "Borosilicate glass, short stem", GEN, "75 mm", "Funnel", "1 piece",
    "chemistry-apparatus", ["glassware"], "funnel", "Glass funnel for pouring and filtering.",
    "Used with filter paper to separate solids from liquids.");
  p("reagent-bottle-250", "Reagent Bottle, Amber Glass", "Generic", "Amber glass with screw cap", GEN, "250 ml", "Reagent bottle", "1 bottle",
    "chemistry-apparatus", ["glassware"], "bottle", "Amber glass bottle for storing light-sensitive solutions.",
    "Label the bottle clearly and keep the cap tight. Store away from direct sunlight.");
  p("bunsen-burner", "Bunsen Burner", "Generic", "Brass burner with air regulator", GEN, "Standard", "Burner", "1 piece",
    "heating-equipment", [], "bunsen", "Laboratory burner with an adjustable air hole for a steady flame.",
    "Used for heating under teacher supervision. Keep flammable materials away and check the tubing before use.", "fp");
  p("laboratory-hot-plate", "Laboratory Hot Plate", "Generic", "Round electric plate with temperature knob", GEN, "Approx. 150 mm plate", "Hot plate", "1 unit",
    "heating-equipment", ["lab-equipment"], "device", "Electric hot plate for heating beakers and flasks without a flame.",
    "Used for gentle, controlled heating. The plate stays hot after switching off, so let it cool before touching.");
  p("water-bath", "Laboratory Water Bath", "Generic", "Stainless steel tank with temperature control", GEN, "Approx. 6 litre", "Water bath", "1 unit",
    "heating-equipment", ["lab-equipment"], "device", "Water bath that holds samples at a steady temperature.",
    "Fill with clean water before switching on and never run it dry.");
  p("borosil-burette-50", "Burette with Stopcock, 50 ml", "Borosil", "Borosilicate glass 3.3, graduated, PTFE stopcock", "Borosil Scientific Limited", "50 ml", "Burette", "1 piece",
    "titration-ware", ["glassware"], "burette", "Graduated burette for dispensing liquid during titration.",
    "Used with a retort stand. Rinse with the solution before filling and read the meniscus at eye level.", "f");
  p("graduated-pipette-10", "Graduated Pipette, 10 ml", "Generic", "Glass, graduated in 0.1 ml", GEN, "10 ml", "Pipette", "1 piece",
    "titration-ware", ["glassware"], "pipette", "Graduated glass pipette for measuring small volumes.",
    "Use a pipette filler and never pipette by mouth.");
  p("volumetric-flask-100", "Volumetric Flask, Class A", "Generic", "Borosilicate glass, with stopper", GEN, "100 ml", "Volumetric flask", "1 piece",
    "titration-ware", ["glassware"], "flask", "Flask for preparing solutions of an exact volume.",
    "Fill to the marked line and mix by inverting. Do not heat.");
  p("measuring-cylinder-100", "Measuring Cylinder", "Generic", "Borosilicate glass, hexagonal base", GEN, "100 ml", "Measuring cylinder", "1 piece",
    "titration-ware", ["glassware"], "cylinder", "Graduated cylinder for measuring liquid volumes.",
    "Place on a flat surface and read the bottom of the meniscus at eye level.");
  p("molecular-model-kit", "Molecular Model Kit, Organic Chemistry", "Generic", "Coloured atoms and bonds in a box", GEN, "Set of about 100 pieces", "Model kit", "1 kit",
    "chemistry-kits", [], "box", "Ball and stick kit for building molecules.",
    "Used to show molecular shapes and bonds in the classroom.");
  p("periodic-table-chart", "Periodic Table Wall Chart", "Generic", "Laminated chart", GEN, "Standard wall size", "Wall chart", "1 chart",
    "chemistry-kits", [], "chart", "Wall chart of the periodic table with element names and numbers.",
    "Used for classroom display and revision.", "p");

  /* ------------------------------- Physics ------------------------------- */
  p("digital-multimeter", "Digital Multimeter", "Meco", "LCD display, measures voltage, current and resistance", "Meco Instruments Private Limited", "Hand-held", "Multimeter", "1 unit with leads",
    "meters", [], "meter", "Hand-held digital multimeter for electrical measurements.",
    "Select the right range before connecting and never measure mains voltage unless the meter is rated for it.", "fp");
  p("analogue-ammeter", "Analogue Ammeter", "Motwane", "Moving-coil meter, 0 to 5 A", "Motwane Manufacturing Company Private Limited", "0 to 5 A", "Ammeter", "1 unit",
    "meters", [], "meter", "Analogue meter that measures current in a circuit.",
    "Connect in series. Start on a higher range if you are unsure of the current.");
  p("analogue-voltmeter", "Analogue Voltmeter", "Motwane", "Moving-coil meter, 0 to 10 V", "Motwane Manufacturing Company Private Limited", "0 to 10 V", "Voltmeter", "1 unit",
    "meters", [], "meter", "Analogue meter that measures voltage across a component.",
    "Connect in parallel and check the polarity before switching on.");
  p("digital-ph-meter-pen", "Digital pH Meter, Pen Type", "Generic", "Pocket pH tester with replaceable electrode", GEN, "0 to 14 pH", "pH meter", "1 unit with buffer sachets",
    "meters", ["lab-equipment"], "device", "Pocket-size digital pH meter for school and general laboratory use.",
    "Calibrate with buffer solutions before use and rinse the electrode between samples.", "p");
  p("convex-lens-stand", "Convex Lens on Stand", "Generic", "Optical glass lens in a holder", GEN, "Focal length 10 cm", "Lens", "1 piece with stand",
    "optics", [], "lens", "Convex lens in a holder for focal length and image experiments.",
    "Hold lenses by the edge and clean only with a soft cloth.", "f");
  p("equilateral-glass-prism", "Equilateral Glass Prism", "Generic", "Optical glass, 60 degree", GEN, "50 mm sides", "Prism", "1 piece",
    "optics", [], "prism", "Glass prism for showing refraction and the spectrum of light.",
    "Hold it by the rough (frosted) faces and keep it in its case to avoid scratches.");
  p("vernier-caliper", "Vernier Caliper, Stainless Steel", "Generic", "Stainless steel, inside and outside jaws, depth rod", GEN, "0 to 150 mm", "Vernier caliper", "1 piece in case",
    "measuring-instruments", [], "caliper", "Caliper for measuring lengths, diameters and depths to 0.02 mm.",
    "Close the jaws gently, check the zero reading and keep it in its case.", "f");
  p("screw-gauge", "Screw Gauge (Micrometer)", "Generic", "Steel frame with ratchet stop", GEN, "0 to 25 mm", "Screw gauge", "1 piece in case",
    "measuring-instruments", [], "caliper", "Screw gauge for measuring the thickness of wires and sheets.",
    "Turn the ratchet, not the thimble, so the pressure stays the same each time.");
  p("spring-balance-10n", "Spring Balance", "Generic", "Metal spring with scale", GEN, "0 to 10 N", "Spring balance", "1 piece",
    "measuring-instruments", [], "device", "Hand-held balance that measures force or weight.",
    "Check the pointer reads zero when nothing is hanging and do not overload it.");
  p("bar-magnet-pair", "Bar Magnet Pair with Keepers", "Generic", "Alnico bar magnets, marked N and S", GEN, "Approx. 10 cm", "Bar magnet", "Pair with keepers",
    "magnets", [], "magnet", "Pair of bar magnets with keepers for magnetism experiments.",
    "Store with the keepers on and keep away from phones, watches and cards.");
  p("horseshoe-magnet", "Horseshoe Magnet", "Generic", "Steel U-shaped magnet", GEN, "Approx. 7.5 cm", "Horseshoe magnet", "1 piece",
    "magnets", [], "magnet", "U-shaped magnet with strong poles close together.",
    "Keep a keeper across the poles when stored.");

  /* --------------------- General laboratory items ------------------------ */
  p("borosil-beaker-250", "Beaker, Borosilicate Glass 250 ml", "Borosil", "Borosilicate glass 3.3, graduated, with spout", "Borosil Scientific Limited", "250 ml", "Beaker", "1 piece",
    "glassware", [], "beaker", "Graduated borosilicate beaker with a pouring spout.",
    "Heat gradually and avoid sudden temperature changes. Check for chips or cracks before use.", "fp");
  p("borosil-conical-flask-250", "Conical Flask 250 ml", "Borosil", "Borosilicate glass 3.3, narrow neck", "Borosil Scientific Limited", "250 ml", "Conical flask", "1 piece",
    "glassware", ["titration-ware"], "flask", "Narrow-neck conical flask for titrations and general lab work.",
    "Support on a stable surface and heat only on a suitable wire gauze.", "", "Erlenmeyer flask");
  p("borosil-test-tubes", "Test Tubes, Rimless", "Borosil", "Borosilicate glass, rimless", "Borosil Scientific Limited", "Various sizes", "Test tube", "Pack of 10",
    "glassware", [], "testtubes", "Rimless borosilicate test tubes for school and college laboratories.",
    "Use a test tube holder when heating and point the mouth away from people.", "p");
  p("riviera-petri-dish-glass", "Petri Dish, Glass", "Riviera Glass", "Borosilicate glass with lid", "Riviera Glass Private Limited", "90 mm", "Petri dish", "1 piece with lid",
    "glassware", [], "petri", "Reusable glass Petri dish with lid.",
    "Wash and sterilise as your laboratory protocol requires before reuse.");
  p("tarsons-petri-dish-90", "Petri Dish, Plastic, 90 mm", "Tarsons", "Polystyrene, sterile, with lid", "Tarsons Products Limited", "90 mm", "Petri dish", "Pack (see pack label)",
    "plasticware", [], "petri", "Sterile polystyrene Petri dish with lid.",
    "Single use. Keep sealed until needed and dispose of used dishes according to lab safety rules.");
  p("tarsons-centrifuge-tube-15", "Centrifuge Tubes 15 ml", "Tarsons", "Polypropylene, graduated, screw cap", "Tarsons Products Limited", "15 ml", "Centrifuge tube", "Pack (see pack label)",
    "plasticware", [], "tube-lab", "Graduated polypropylene centrifuge tubes with screw caps.",
    "Check the maximum speed on the pack before centrifuging.");
  p("plastic-wash-bottle", "Wash Bottle, Plastic", "Generic", "LDPE squeeze bottle with jet nozzle", GEN, "500 ml", "Wash bottle", "1 bottle",
    "plasticware", [], "bottle", "Squeeze bottle for rinsing apparatus and dispensing distilled water.",
    "Label the bottle with its contents.");
  p("plastic-beaker-500", "Plastic Beaker, Graduated", "Generic", "Polypropylene, graduated", GEN, "500 ml", "Beaker", "1 piece",
    "plasticware", [], "beaker", "Light, unbreakable beaker for general use.",
    "Not for direct heating. Check the label for chemical resistance.");
  p("rubber-stoppers-assorted", "Rubber Stoppers, Assorted", "Generic", "Natural rubber, solid and one-hole", GEN, "Assorted sizes", "Rubber stopper", "Pack (see pack label)",
    "rubberware", [], "stopper", "Assorted rubber stoppers for flasks and test tubes.",
    "Choose a size that fits snugly. Keep away from strong solvents.", "p");
  p("laboratory-rubber-tubing", "Laboratory Rubber Tubing", "Generic", "Natural rubber tubing", GEN, "6 mm bore", "Rubber tubing", "Per metre",
    "rubberware", [], "box", "Flexible rubber tubing for gas and liquid connections.",
    "Check for cracks before each use and replace worn tubing.");
  p("laboratory-rubber-gloves", "Laboratory Rubber Gloves", "Generic", "Natural rubber, reusable", GEN, "Sizes S to L", "Gloves", "Pair",
    "rubberware", ["lab-safety"], "box", "Reusable gloves for general laboratory handling.",
    "Check for holes before use and rinse after use.");
  p("test-tube-holder-stand", "Test Tube Holder and Stand", "Generic", "Steel holder, 12-hole rack", GEN, "Standard", "Test tube stand", "1 set",
    "metalware", [], "testtubes", "Steel holder and a rack for supporting test tubes.",
    "Use the holder when heating a tube over a flame.");
  p("crucible-tongs", "Crucible Tongs, Stainless Steel", "Generic", "Stainless steel", GEN, "Approx. 25 cm", "Tongs", "1 piece",
    "metalware", [], "stand", "Long tongs for lifting hot crucibles and dishes.",
    "Let the tongs cool before putting them away.");
  p("porcelain-mortar-pestle", "Porcelain Mortar and Pestle", "Generic", "Glazed porcelain", GEN, "100 mm", "Mortar and pestle", "1 set",
    "porcelainware", [], "mortar", "Glazed porcelain mortar with pestle for grinding in the laboratory.",
    "Not for hot or heavy-impact grinding. Rinse and dry after use.", "p");
  p("porcelain-crucible-30", "Porcelain Crucible with Lid", "Generic", "Glazed porcelain", GEN, "30 ml", "Crucible", "1 piece with lid",
    "porcelainware", ["chemistry-apparatus"], "mortar", "Small porcelain crucible for heating solids at high temperature.",
    "Heat gradually and lift only with tongs.");
  p("porcelain-evaporating-dish", "Porcelain Evaporating Dish", "Generic", "Glazed porcelain with spout", GEN, "100 mm", "Evaporating dish", "1 piece",
    "porcelainware", [], "petri", "Shallow porcelain dish for evaporating solutions.",
    "Heat gradually over a gauze or water bath.");
  p("whatman-filter-paper-1", "Whatman Qualitative Filter Paper, Grade 1", "Whatman", "Cellulose qualitative filter paper, circles", "Cytiva", "See pack for diameter", "Filter paper", "Pack (see pack label)",
    "filter-papers", [], "filter", "Medium-speed cellulose filter paper for general laboratory filtration.",
    "Fold or fit to the funnel as required and wet slightly before use.", "fp");
  p("filter-paper-circles-11", "Filter Paper Circles, Qualitative", "Generic", "Cellulose circles", GEN, "11 cm", "Filter paper", "Pack of 100",
    "filter-papers", [], "filter", "Filter paper circles for school and college laboratories.",
    "Fold into a cone and fit to a funnel.");
  p("litmus-ph-paper", "Litmus and pH Indicator Paper", "Generic", "Red and blue litmus strips, universal pH strips", GEN, "Booklets and rolls", "Indicator paper", "Booklet (see pack)",
    "filter-papers", ["chemistry-apparatus"], "strips", "Indicator papers used to show whether a liquid is acidic or basic.",
    "Keep dry and in the container until use.");
  p("digital-laboratory-balance", "Digital Laboratory Balance", "Generic", "Electronic balance, glass draught shield optional", GEN, "200 g, 0.01 g readability", "Balance", "1 unit",
    "lab-equipment", [], "balance", "Electronic balance for weighing samples in the laboratory.",
    "Place on a level, vibration-free surface and tare before weighing.", "f");
  p("magnetic-stirrer", "Magnetic Stirrer with Hot Plate", "Generic", "Magnetic stirring plate with heater", GEN, "Up to 1 litre", "Magnetic stirrer", "1 unit with stirring bar",
    "lab-equipment", ["heating-equipment"], "device", "Stirrer that spins a magnetic bar inside a beaker.",
    "Start at a low speed and increase gradually.");
  p("benchtop-centrifuge", "Benchtop Centrifuge", "Generic", "Electric centrifuge, 4 x 15 ml tube rotor", GEN, "Up to 4000 rpm", "Centrifuge", "1 unit",
    "lab-equipment", [], "device", "Small centrifuge that separates samples by spinning.",
    "Balance the tubes opposite each other and close the lid before starting.");
  p("safety-goggles", "Safety Goggles", "Generic", "Polycarbonate, anti-splash", GEN, "Adult", "Goggles", "1 piece",
    "lab-safety", [], "goggles", "Anti-splash goggles that protect the eyes in the laboratory.",
    "Wear them for any practical involving heat, glass or liquids.", "f");
  p("laboratory-coat", "Laboratory Coat, Cotton", "Generic", "Cotton, full sleeve, white", GEN, "S, M, L, XL", "Lab coat", "1 piece",
    "lab-safety", [], "box", "White cotton laboratory coat for students and staff.",
    "Wash regularly and keep it for laboratory use only.");

  J.data.products = list;
})();
