/* ==========================================================================
   SERVICES — set `enabled: false` for anything the shop does not offer.
   ========================================================================== */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  J.data = J.data || {};

  J.data.services = [
    {
      slug: "availability-enquiries", enabled: true, icon: "message", home: true,
      title: "Product availability enquiries",
      summary: "Check whether an item is available before you make the trip.",
      points: ["Call or message us on WhatsApp", "Tell us the name, size and brand you need", "We reply with what we have"],
      message: "Hello, I would like to check availability of an item."
    },
    {
      slug: "school-college-lab-lists", enabled: true, icon: "clipboard", home: true,
      title: "School and college requirement lists",
      summary: "Send your lab list and we will tell you which items we can supply.",
      points: ["Biology, chemistry and physics lists", "Share a photo or typed list on WhatsApp", "Help matching sizes and capacities"],
      message: "Hello, I would like to send our laboratory requirement list."
    },
    {
      slug: "product-information", enabled: true, icon: "info", home: true,
      title: "Product information",
      summary: "Ask about materials, sizes and which item suits an experiment.",
      points: ["Glass, plastic, rubber, metal and porcelain options", "Differences between similar items", "Care and handling advice"],
      message: "Hello, I would like information about a laboratory item."
    },
    {
      slug: "bulk-institutional", enabled: true, icon: "package", home: true,
      title: "Bulk and institutional enquiries",
      summary: "Schools, colleges, laboratories and institutions can ask about larger quantities.",
      points: ["Quantities for whole classes or labs", "Quotation on request", "Enquiries welcome by phone, WhatsApp or email"],
      message: "Hello, I would like to ask about a bulk requirement."
    },
    {
      slug: "lab-setup-help", enabled: true, icon: "flask", home: true,
      title: "Help setting up a lab",
      summary: "Talk to us about the equipment a new or growing laboratory needs.",
      points: ["Starter lists for biology, chemistry and physics", "Furniture and equipment questions", "Visit the store to see items in person"],
      message: "Hello, I would like help setting up a laboratory."
    },
    {
      slug: "teaching-aids", enabled: true, icon: "microscope", home: true,
      title: "Teaching models, charts and kits",
      summary: "Models, charts and kits for biology, chemistry and physics lessons.",
      points: ["Anatomical models and wall charts", "Molecular model kits", "Ask which topics are available"],
      message: "Hello, I would like to ask about teaching models and charts."
    }
  ];

  J.data.enquirySteps = [
    { title: "Tell us what you need", text: "Send the item name, size and brand, or a photo of your list." },
    { title: "We check the shelf", text: "We confirm what is available and when you can collect it." },
    { title: "Visit the store", text: "Come to Jawahar Ganj and see the items before you take them." }
  ];
})();
