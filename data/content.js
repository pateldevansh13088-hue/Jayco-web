/* ==========================================================================
   CONTENT — testimonials, FAQ, articles, announcements, gallery, holidays.
   ========================================================================== */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  J.data = J.data || {};

  /* SAMPLE testimonials. Replace with real customer feedback (with permission)
     and set `sampleTestimonials` to false to remove the notice shown below them. */
  J.data.sampleTestimonials = true;
  J.data.testimonials = [
    { name: "Sample customer", role: "School science teacher", rating: 5, text: "I sent our practical list on WhatsApp and they told me straight away which glassware they had. It saved me a trip." },
    { name: "Sample customer", role: "College lab assistant", rating: 5, text: "Found burettes, pipettes and stands in one place, and they helped me match the sizes." },
    { name: "Sample customer", role: "Parent of a student", rating: 4, text: "Easy to ask about a microscope for my son's project. Clear about what they had." }
  ];

  J.data.faqs = [
    { q: "Can I order or pay for products on this website?", a: "No. This website is for information only. To ask about an item, call us, message us on WhatsApp or visit the store." },
    { q: "Does the website show whether an item is in stock?", a: "No. Stock changes through the day, so we do not publish availability or prices online. Call or message us to check." },
    { q: "Do you supply items for schools and colleges?", a: "Yes. We list glassware, plasticware, rubberware, metal and porcelain ware, filter papers, meters, apparatus, models and charts for biology, chemistry and physics. Send your list on WhatsApp and we will tell you what we have." },
    { q: "Can I send a photo of my requirement list?", a: "Yes. A photo or typed list on WhatsApp is the quickest way to ask about many items at once." },
    { q: "Do you take bulk or institutional orders?", a: "Yes. Schools, colleges and laboratories can ask about larger quantities by phone, WhatsApp or email." },
    { q: "How do I choose between glass and plastic ware?", a: "Glass handles heat and most chemicals but can break, while plastic is light and unbreakable but not for heating. Tell us the experiment and we can suggest options." },
    { q: "Where are you located?", a: "We are at 196, Jawahar Ganj, Sagar, Madhya Pradesh 470002. Use the Get directions button on the Contact page." }
  ];

  /* SAMPLE announcements. `until` (YYYY-MM-DD) hides an item after that date. */
  J.data.announcements = [
    { date: "2026-11-01", title: "Check availability before you visit", text: "Call or message us to confirm that the item you need is on the shelf.", pinned: true },
    { date: "2026-10-20", title: "Laboratory lists for the new term", text: "Schools and colleges can send their requirement lists on WhatsApp for an availability check." }
  ];

  /* Holiday opening-hour notices shown in the top bar and on the Contact page.
     Show an entry between `from` and `to` (inclusive, YYYY-MM-DD).
     Example: { from:"2026-11-08", to:"2026-11-09", title:"Diwali", text:"Closed on 9 November." } */
  J.data.holidays = [];

  /* Promotional information banner on the homepage (information, not an offer). */
  J.data.promo = {
    enabled: true,
    title: "Have a lab list to check?",
    text: "Send your requirement list or a photo of the item on WhatsApp and we will tell you what we have.",
    message: "Hello, I would like to check if you have these items."
  };

  /* Lab guides — short general-knowledge articles. Check wording before publishing. */
  J.data.articles = [
    {
      slug: "choosing-glassware-or-plasticware",
      title: "Glassware or plasticware: which should you choose?",
      category: "Choosing equipment",
      date: "2026-10-12",
      minutes: 3,
      summary: "Each material suits different jobs. A quick guide to picking the right one for your practical.",
      body: [
        { h: "When glass is better", p: "Borosilicate glass handles heat and resists most chemicals, and it is clear and easy to read. Use it for heating, titration and measuring when accuracy matters. It can break, so handle it carefully and check for chips before use." },
        { h: "When plastic is better", p: "Plastic is light and does not shatter, which makes it good for younger students, storage and field work. Most plastic is not meant for heating, and some plastics can be affected by solvents, so check the product label." },
        { h: "Ask if you are unsure", p: "Tell us what the experiment involves and we can suggest suitable items." }
      ]
    },
    {
      slug: "using-a-microscope",
      title: "Using a compound microscope: the basics",
      category: "Biology",
      date: "2026-10-05",
      minutes: 3,
      summary: "A few habits protect the lenses and give a clear image.",
      body: [
        { h: "Start low", p: "Begin with the lowest-power objective lens and focus there first. Move to a higher power only when the specimen is sharp and centred." },
        { h: "Carry and clean with care", p: "Carry the microscope with one hand on the arm and one under the base. Clean lenses only with lens paper, never with a cloth or fingers." },
        { h: "Put it away properly", p: "Return to the lowest power, lower the stage, switch off the light and cover the microscope." }
      ]
    },
    {
      slug: "reading-a-burette",
      title: "Reading a burette correctly",
      category: "Chemistry",
      date: "2026-09-22",
      minutes: 3,
      summary: "Small reading errors add up in a titration. Here is how to avoid them.",
      body: [
        { h: "Prepare the burette", p: "Rinse with a little of the solution, fill above the zero mark and let some run out so the tip is full with no air bubbles." },
        { h: "Read at eye level", p: "Read the bottom of the meniscus with your eye level with the liquid surface. Reading from above or below gives a different value." },
        { h: "Record carefully", p: "Note the starting and final readings to the same number of decimal places each time." }
      ]
    },
    {
      slug: "caring-for-laboratory-glassware",
      title: "Caring for laboratory glassware",
      category: "Choosing equipment",
      date: "2026-09-10",
      minutes: 2,
      summary: "Good habits make glassware last longer and keep practicals safe.",
      body: [
        { h: "Check before use", p: "Look for chips and cracks. Damaged glass can break when heated or filled." },
        { h: "Heat gently", p: "Avoid sudden temperature changes. Let hot glass cool on a heat-proof surface before washing." },
        { h: "Wash and store", p: "Clean with a brush and mild detergent, rinse with water and store on racks or padded shelves." }
      ]
    }
  ];

  /* Gallery — replace `image` with a path to a real photograph, e.g.
     "assets/img/gallery/store-front.jpg". Until then a drawn placeholder is
     shown and labelled as such. */
  J.data.gallery = [
    { caption: "Reagent bottles and apparatus", art: "shelves", image: "" },
    { caption: "Microscopes and instruments", art: "instruments", image: "" },
    { caption: "Laboratory glassware", art: "glassware", image: "" },
    { caption: "Physics apparatus", art: "physicsbench", image: "" },
    { caption: "Counter and enquiries", art: "counter", image: "" },
    { caption: "Store front, Jawahar Ganj", art: "storefront", image: "" }
  ];
})();
