/* Page registry: every page on the site, its metadata, structured data and body.
   The build script (tools/build.js) walks J.pages.list() and writes one HTML
   file per entry. To add a page, add an entry here. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = J.m, u = J.u, S = J.store, url = J.url, esc = u.esc;
  var site = function () { return J.data.site; };

  /* ---------------- Structured data ---------------- */
  var ld = (J.ld = {});

  ld.store = function () {
    var s = site(), c = s.contact;
    var o = {
      "@context": "https://schema.org", "@type": "Store", "@id": url.abs("") + "#store",
      name: s.name, url: url.abs(""), description: s.description, image: url.abs("assets/img/og-image.png"),
      telephone: c.phones[0].tel, email: c.email,
      address: { "@type": "PostalAddress", streetAddress: "196, Jawahar Ganj", addressLocality: "Sagar", addressRegion: "Madhya Pradesh", postalCode: "470002", addressCountry: "IN" },
      sameAs: s.social.map(function (x) { return x.url; }),
      contactPoint: c.phones.map(function (p) { return { "@type": "ContactPoint", telephone: p.tel, contactType: "customer service", areaServed: "IN", availableLanguage: ["English", "Hindi"] }; })
    };
    if (s.hours.confirmed) {
      var map = { Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday", Thursday: "Thursday", Friday: "Friday", Saturday: "Saturday", Sunday: "Sunday" };
      o.openingHoursSpecification = s.hours.weekly.filter(function (d) { return !d.closed; }).map(function (d) {
        return { "@type": "OpeningHoursSpecification", dayOfWeek: map[d.day], opens: d.open, closes: d.close };
      });
    }
    return o;
  };
  ld.website = function () {
    return { "@context": "https://schema.org", "@type": "WebSite", name: site().name, url: url.abs(""),
      potentialAction: { "@type": "SearchAction", target: url.abs("search.html") + "?q={search_term_string}", "query-input": "required name=search_term_string" } };
  };
  ld.crumbs = function (items) {
    return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(function (it, i) {
      var o = { "@type": "ListItem", position: i + 1, name: it[0] };
      if (it[1]) o.item = url.abs(it[1]);
      return o;
    }) };
  };
  ld.faq = function (n) {
    return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: J.data.faqs.slice(0, n).map(function (f) {
      return { "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } };
    }) };
  };
  /* Product data without any offer, price or availability: the site doesn't publish those. */
  ld.product = function (p) {
    var L = S.labels(p), cat = S.category(p.category);
    var o = { "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, sku: p.slug,
      brand: { "@type": "Brand", name: p.brand }, category: cat ? cat.name : undefined,
      additionalProperty: [
        { "@type": "PropertyValue", name: L.composition, value: p.composition },
        { "@type": "PropertyValue", name: L.strength, value: p.strength },
        { "@type": "PropertyValue", name: L.form, value: p.form },
        { "@type": "PropertyValue", name: L.pack, value: p.pack }
      ] };
    if (p.manufacturer !== "Various manufacturers") o.manufacturer = { "@type": "Organization", name: p.manufacturer };
    if (p.image) o.image = url.abs(p.image);
    return o;
  };
  ld.article = function (a) {
    return { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.summary, datePublished: a.date, dateModified: a.date,
      author: { "@type": "Organization", name: site().name }, publisher: { "@type": "Organization", name: site().name },
      mainEntityOfPage: url.abs("guides/" + a.slug + ".html") };
  };

  /* ---------------- Simple pages ---------------- */
  function productsPage() {
    var chips = S.groups().map(function (g) {
      return '<a class="chip" href="' + url.subject(g.slug) + '">' + esc(g.name) + "</a>";
    }).join("");
    return m.pagehead({
      title: "Products",
      lead: "Browse laboratory glassware, apparatus, meters, microscopes, models and charts. Search by name, brand, material or manufacturer. This catalogue is for information only.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Products" }],
      extra: '<div class="chips" style="margin-top:18px" aria-label="Subjects">' + chips + "</div>"
    }) + '<section class="section section--tight"><div class="container">' + m.catalogue({ scope: "all" }, {}) +
      '<div style="margin-top:30px;display:grid;gap:12px">' + m.notice("safety") + m.notice("catalogue") + "</div></div></section>";
  }

  function searchPage() {
    return m.pagehead({
      title: "Search",
      lead: "Search laboratory items by name, brand, material, size or manufacturer.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Search" }]
    }) + '<section class="section section--tight"><div class="container">' + m.catalogue({ scope: "all" }, {}) + '<div style="margin-top:30px;display:grid;gap:12px">' + m.notice("safety") + m.notice("catalogue") + "</div></div></section>";
  }

  function privacyPage() {
    var s = site();
    return m.pagehead({ title: "Privacy policy", lead: "What this website does and does not collect.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Privacy policy" }] }) +
      '<section class="section section--tight"><div class="container"><div class="prose">' +
      "<h2>Information we collect</h2><p>This website has no accounts, no online ordering and no payments. We do not use advertising or analytics cookies.</p>" +
      "<h2>Contact form</h2><p>If you send a message through the contact form, we receive the name, phone number, email address and message you type. We use them only to reply to you. " +
      "If the form cannot send directly, it prepares an email or WhatsApp message that you send yourself.</p>" +
      "<h2>Search history</h2><p>Recent searches are saved in your own browser so they can be suggested next time. They are not sent to us. " +
      '<button type="button" class="link-btn" data-clear-history>Clear saved searches</button> <span class="muted" data-history-cleared hidden>Cleared.</span></p>' +
      "<h2>Third-party services</h2><ul><li>Google Maps shows the map on the contact page, and Google Fonts delivers the typefaces. Google may receive your IP address when these load.</li>" +
      "<li>WhatsApp links open WhatsApp, which has its own privacy policy.</li></ul>" +
      "<h2>Safe use</h2><p>" + esc(s.disclaimers.safety) + "</p>" +
      "<h2>Contact</h2><p>Questions about this policy: <a href=\"mailto:" + esc(s.contact.email) + '">' + esc(s.contact.email) + "</a> or " + esc(s.contact.addressOneLine) + ".</p>" +
      "</div></div></section>";
  }

  function notFoundPage() {
    return '<section class="notfound"><div class="container"><h1>Page not found</h1><p>The page you wanted isn\'t here. Search for a product, or go back to the home page.</p>' +
      '<div style="max-width:560px;margin:0 auto 24px">' + m.sbox({ id: "sbox-404", large: true }) + "</div>" +
      '<a class="btn btn--primary" href="' + url.page("home") + '">Go to home page</a></div></section>';
  }

  /* ---------------- Registry ---------------- */
  J.pages = {
    list: function () {
      var s = site(), P = [];
      function add(path, key, nav, title, description, render, jsonld, extra) {
        var o = { path: path, key: key, nav: nav, title: title, description: description, render: render, jsonld: jsonld || function () { return []; } };
        if (extra) for (var k in extra) o[k] = extra[k];
        P.push(o);
      }
      add("index.html", "home", "home", s.name, s.description, m.homePage, function () { return [ld.store(), ld.website(), ld.faq(5)]; });
      add("about.html", "about", "about", "About us",
        "About Jay Appliances & Instruments Co., Jawahar Ganj, Sagar: science and laboratory supplies, our mission and how to reach us.", m.aboutPage,
        function () { return [ld.crumbs([["Home", "index.html"], ["About us", "about.html"]])]; });
      add("products.html", "products", "products", "Products",
        "Browse laboratory glassware, plasticware, rubberware, apparatus, meters, microscopes, models and charts. Information only, with no online ordering.", productsPage,
        function () { return [ld.crumbs([["Home", "index.html"], ["Products", "products.html"]])]; });
      add("search.html", "search", "", "Search",
        "Search laboratory supplies at Jay Appliances & Instruments Co., Sagar. Information only, with no online ordering.", searchPage,
        function () { return []; }, { noindex: true, sitemap: false });
      add("categories.html", "categories", "categories", "Product categories",
        "Browse biology, chemistry, physics and general laboratory supplies by category.", m.categoriesPage,
        function () { return [ld.crumbs([["Home", "index.html"], ["Categories", "categories.html"]])]; });
      add("brands.html", "brands", "", "Brands and manufacturers",
        "Alphabetical directory of the brands and manufacturers whose products appear in our directory.", m.brandsPage,
        function () { return [ld.crumbs([["Home", "index.html"], ["Brands", "brands.html"]])]; });
      add("services.html", "services", "services", "Services",
        "Availability enquiries, requirement lists for schools and colleges, bulk enquiries and product information at Jay Appliances & Instruments Co., Sagar.", m.servicesPage,
        function () { return [ld.crumbs([["Home", "index.html"], ["Services", "services.html"]])]; });
      add("contact.html", "contact", "contact", "Contact and location",
        "Call, WhatsApp or visit Jay Appliances & Instruments Co. at 196, Jawahar Ganj, Sagar, Madhya Pradesh 470002. Map, opening hours and contact form.", m.contactPage,
        function () { return [ld.store(), ld.crumbs([["Home", "index.html"], ["Contact us", "contact.html"]])]; });
      add("guides.html", "articles", "", "Lab guides",
        "Short, general guides on choosing and caring for laboratory equipment.", m.articlesPage,
        function () { return [ld.crumbs([["Home", "index.html"], ["Lab guides", "guides.html"]])]; });
      add("privacy.html", "privacy", "", "Privacy policy", "What this website does and does not collect.", privacyPage);
      add("404.html", "notfound", "", "Page not found", "The page you wanted could not be found.", notFoundPage, null, { noindex: true, sitemap: false });

      S.groups().forEach(function (g) {
        add("subject/" + g.slug + ".html", "subject", "categories", g.name + " supplies",
          g.description + " Product information from Jay Appliances & Instruments Co., Sagar.", function () { return m.subjectPage(g); },
          function () { return [ld.crumbs([["Home", "index.html"], ["Categories", "categories.html"], [g.name, "subject/" + g.slug + ".html"]])]; });
      });
      S.categories().forEach(function (c) {
        add("category/" + c.slug + ".html", "category", "categories", c.name,
          c.description + " Product information from Jay Appliances & Instruments Co., Sagar.", function () { return m.categoryPage(c); },
          function () { return [ld.crumbs([["Home", "index.html"], ["Categories", "categories.html"], [c.name, "category/" + c.slug + ".html"]])]; });
      });
      S.products().forEach(function (p) {
        var cat = S.category(p.category);
        add("products/" + p.slug + ".html", "product", "products", p.name,
          u.truncate(p.name + ": " + p.description + " " + p.composition + ". Information only.", 158), function () { return m.productDetail(p); },
          function () { return [ld.product(p), ld.crumbs([["Home", "index.html"], ["Products", "products.html"],
            [cat ? cat.name : "Category", "category/" + p.category + ".html"], [p.name, "products/" + p.slug + ".html"]])]; },
          { ogType: "product" });
      });
      S.brands().forEach(function (b) {
        add("brand/" + b.slug + ".html", "brand", "", b.name + " products",
          b.name + " by " + b.company + ": " + b.short + " See product information at Jay Appliances & Instruments Co., Sagar.", function () { return m.brandPage(b); },
          function () { return [ld.crumbs([["Home", "index.html"], ["Brands", "brands.html"], [b.name, "brand/" + b.slug + ".html"]])]; });
      });
      S.articles().forEach(function (a) {
        add("guides/" + a.slug + ".html", "article", "", a.title, a.summary, function () { return m.articlePage(a); },
          function () { return [ld.article(a), ld.crumbs([["Home", "index.html"], ["Lab guides", "guides.html"], [a.title, "guides/" + a.slug + ".html"]])]; },
          { ogType: "article" });
      });
      return P;
    },

    /* Render one page definition to a full HTML document. */
    html: function (def) {
      var depth = def.path.split("/").length - 1;
      J.ctx.root = new Array(depth + 1).join("../");
      J.ctx.page = def.key;
      def.body = def.render();
      def.jsonld = typeof def.jsonld === "function" ? def.jsonld() : def.jsonld;
      return J.m.document(def);
    }
  };
})();
