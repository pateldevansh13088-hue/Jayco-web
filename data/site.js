/* ==========================================================================
   SITE CONFIG — everything the owner may want to edit lives here.
   Structured as plain JSON-style objects so it can later be replaced by a
   CMS / database response (see README → "Moving to a CMS").
   ========================================================================== */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  J.data = J.data || {};

  J.data.site = {
    name: "Jay Appliances & Instruments Co.",
    legalName: "Jay Appliances & Instruments Company",
    shortName: "Jay Appliances",
    tagline: "Science and laboratory supplies",
    baseUrl: "https://www.biochemphy.com",
    language: "en-IN",
    description:
      "Biology, chemistry and physics laboratory supplies in Sagar, Madhya Pradesh: glassware, plasticware, rubberware, filter papers, meters, apparatus, teaching models and charts. Call, message on WhatsApp or visit Jay Appliances & Instruments Co. at Jawahar Ganj.",

    contact: {
      addressLines: ["196, Jawahar Ganj", "Sagar, Madhya Pradesh 470002"],
      addressOneLine: "196, Jawahar Ganj, Sagar, Madhya Pradesh 470002",
      phones: [
        { label: "Mobile", display: "+91 98272 84841", tel: "+919827284841" },
        { label: "Mobile", display: "+91 99770 80080", tel: "+919977080080" },
        { label: "Landline", display: "07582-243241", tel: "+917582243241" }
      ],
      whatsapp: {
        number: "919827284841",
        display: "+91 98272 84841",
        defaultMessage: "Hello, I would like to ask about a product."
      },
      email: "jaicosagar@gmail.com",
      // Google Maps embed + directions use this text, so no API key is needed.
      mapQuery: "196 Jawahar Ganj, Sagar, Madhya Pradesh 470002"
    },

    /* Opening hours.
       IMPORTANT: the weekly times below are placeholders. Set confirmed:true
       once the owner has checked them — until then visitors are asked to call
       first and the live "open now" badge is hidden. */
    hours: {
      confirmed: false,
      timezone: "Asia/Kolkata",
      note: "Please call before you visit to confirm today's timings.",
      weekly: [
        { day: "Monday", open: "10:00", close: "20:00" },
        { day: "Tuesday", open: "10:00", close: "20:00" },
        { day: "Wednesday", open: "10:00", close: "20:00" },
        { day: "Thursday", open: "10:00", close: "20:00" },
        { day: "Friday", open: "10:00", close: "20:00" },
        { day: "Saturday", open: "10:00", close: "20:00" },
        { day: "Sunday", closed: true }
      ]
    },

    social: [{ label: "Justdial listing", url: "http://www.justdial.com/dt-99I6EEAEQUA" }],

    hero: {
      title: "Laboratory supplies for biology, chemistry and physics",
      lead:
        "Look up glassware, apparatus, meters, microscopes, models and charts, then call, message or visit us at Jawahar Ganj, Sagar.",
      note:
        "This website is for information only. You can't order or pay online. Ask us about availability by phone, WhatsApp or in store.",
      popularSearches: ["Beaker", "Microscope", "Burette", "Multimeter", "Filter paper", "Dissection kit"],
      /* Three products drawn as pack labels beside the hero (use product slugs). */
      showcase: ["compound-microscope", "borosil-burette-50", "digital-multimeter"]
    },

    /* Why choose us — edit freely. Keep statements factual. */
    whyUs: [
      { icon: "flask", title: "Biology, chemistry and physics in one place", text: "Glassware, apparatus, meters, microscopes, models and charts for school, college and laboratory use." },
      { icon: "message", title: "Ask before you travel", text: "Call or message us on WhatsApp to ask whether an item is available before you visit." },
      { icon: "clipboard", title: "Send your whole list", text: "Share a requirement list or a photo and we will tell you what we can supply." },
      { icon: "shield", title: "Clear product information", text: "Every listing shows the brand, material, size and care instructions so you can check details first." }
    ],

    about: {
      intro: [
        "Jay Appliances & Instruments Co. is based at Jawahar Ganj in Sagar, Madhya Pradesh. We supply laboratory glassware, plasticware, rubberware, metal and porcelain ware, filter papers, meters, apparatus, teaching models and charts for biology, chemistry and physics.",
        "Our customers include schools and colleges, laboratories, teachers, students and institutions. This website lets you check what we stock and how to reach us before you visit."
      ],
      /* Leave history empty until the owner adds real dates and milestones. */
      history: [],
      foundedYear: null,
      mission:
        "Make dependable laboratory and teaching supplies easy to find, with accurate information and helpful service.",
      vision:
        "To be the first place people in Sagar think of when they need laboratory or science teaching supplies.",
      commitment:
        "We tell you plainly what we have and what we don't, and we help you choose the right item for the job.",
      quality: [
        "Items are sourced from manufacturers and authorised suppliers.",
        "Glassware and instruments are checked for damage before they reach the shelf.",
        "Care and handling information is shown on each product page."
      ],
      /* Add real licence details here, for example:
         { label: "GST number", value: "…" }
         They appear on the About page automatically. */
      licences: [],
      licenceFallback:
        "Licence and registration details are available at the store on request.",
      /* Add real team members: { name, role, bio } */
      team: [],
      teamFallback:
        "Our team is at the counter during opening hours. Questions are best asked in store or by phone."
    },

    disclaimers: {
      safety:
        "Laboratory items should be used under the supervision of a teacher or trained person, with suitable protective equipment. Follow the maker's instructions and your institution's safety rules. This website lists apparatus and equipment only.",
      catalogue:
        "Listings show product information only. They do not confirm that an item is in stock, and no prices are published. Please call or message us to check availability."
    },

    contactForm: {
      /* Static sites have no server. To receive messages by email, create a form
         at https://formspree.io (or similar) and paste its endpoint URL here.
         Left empty, the form lets visitors send the message by email or
         WhatsApp instead. */
      endpoint: "",
      subjects: [
        "Product availability",
        "School or college requirement list",
        "Biology supplies",
        "Chemistry supplies",
        "Physics supplies",
        "Bulk or institutional enquiry",
        "Something else"
      ]
    }
  };
})();
