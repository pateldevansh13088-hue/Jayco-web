# Jay Appliances & Instruments Co. — website

An information-only website for the shop at 196, Jawahar Ganj, Sagar, Madhya Pradesh 470002
(a redesign of biochemphy.com, a science and laboratory supplies shop). It has **no cart, checkout, online ordering, payments, wishlist or
delivery tracking**, and no prices or stock levels are published anywhere.

Plain HTML, CSS and JavaScript. No framework, no npm packages, nothing to install to *view* the site.

## Open it

- Double-click `index.html`, or upload the whole folder to any web host (cPanel, Netlify, GitHub Pages…).
- Every page is a real `.html` file, so it works on any host and is readable by search engines.
- Google Maps and Google Fonts load from the internet. Without a connection the map is blank and the fonts fall back to system fonts.

## What is inside

| Module | Where it lives |
|---|---|
| Header, navigation, footer, page shell | `assets/js/modules/layout.js` |
| Homepage | `modules/home.js` |
| Product search, catalogue and filters | `core/search.js`, `modules/products.js` |
| Product details | `modules/products.js` → `products/*.html` |
| Subjects (Biology, Chemistry, Physics, General lab) and categories | `modules/categories.js` → `subject/*.html`, `category/*.html` |
| Brand directory (A–Z, search) | `modules/brands.js` → `brand/*.html` |
| Services | `modules/services.js` |
| About | `modules/about.js` |
| Contact, Google Maps | `modules/contact.js`, `modules/maps.js` |
| Testimonials, FAQ, lab guides | `modules/testimonials.js`, `faq.js`, `articles.js` |
| Browser behaviour (menus, suggestions, filters, form, gallery) | `assets/js/app.js` |
| Design system | `assets/css/styles.css` |

Search covers name, brand, other names, material or specification, manufacturer, category and product type. It suggests
as you type, forgives misspellings ("beekar", "mikroscope"), remembers recent searches in the visitor's own
browser, and shows popular searches. Results can be filtered by category, manufacturer, brand and
product type.

## Editing content

All content lives in `data/`:

| File | What to edit |
|---|---|
| `data/site.js` | Name, address, phones, WhatsApp, email, **opening hours**, About text, licences, team, disclaimers, contact-form settings |
| `data/products.js` | Laboratory products (see the field list at the top of the file) |
| `data/categories.js` | Categories and groups |
| `data/brands.js` | Brands and manufacturers |
| `data/services.js` | Services (set `enabled: false` for any the shop doesn't offer) |
| `data/content.js` | Testimonials, FAQ, announcements, holiday notices, promo banner, lab guides, gallery |

After editing, rebuild (needs [Node.js](https://nodejs.org) 18 or newer, nothing else):

```
node tools/build.js
```

This regenerates every page, `sitemap.xml`, `robots.txt` and `assets/js/site.bundle.js`.
Upload the folder again.

To add real photos: put them in `assets/img/` and set `image: "assets/img/…jpg"` on a product
or gallery item. Until then, drawn illustrations are shown and labelled as such.

## Before you publish — checklist

Everything below is deliberately left for the owner, so the site never states something that isn't true.

1. **Opening hours** — the weekly times in `data/site.js` are placeholders. Check them and set `confirmed: true`. Until then the site says "Call to confirm today's opening hours" and hides the live open/closed badge.
2. **Products** — all 59 listings are *sample content* written to show the layout. Check each against the real pack (material, size or capacity, brand, maker) and set `sample: false`. Add or remove items to match the real stock.
3. **Registration details** — add the real GST or registration numbers under `licences` in `data/site.js`. Nothing is invented; the About page says details are available in store until you add them.
4. **Business history and team** — fill `history` and `team` in `data/site.js` (shown on the About page only when present).
5. **Testimonials** — the three shown are labelled samples. Replace with real feedback (with permission) and set `sampleTestimonials` to `false`.
6. **Contact form** — a static site can't store messages. Either paste a form-service endpoint (for example Formspree) into `contactForm.endpoint`, or leave it empty: visitors then get a ready-to-send WhatsApp message or email. The form validates input, has a hidden spam trap, a minimum-time check and a limit of 3 messages per hour per browser.
7. **Services** — set `enabled: false` in `data/services.js` for any service the shop does not really offer.
8. **Domain** — `baseUrl` in `data/site.js` is `https://www.biochemphy.com`. Change it if the site moves, then rebuild (it feeds canonical links, the sitemap and Open Graph tags).
9. **Social image** — replace `assets/img/og-image.png` with a photo or logo card if you wish (1200 × 630).

## Moving to a CMS or database later

The data files are plain objects with the same fields a CMS or database table would have (products,
categories, brands, services, announcements). To move on, export them to a headless CMS (Sanity,
Strapi, Directus, WordPress REST) or a spreadsheet, and have `tools/build.js` read from that source
instead of `data/*.js`. The page modules only read from `JAICO.data`, so nothing else changes.

## SEO, accessibility and performance

- Clean URLs (`products/compound-microscope.html`, `category/glassware.html`, `brand/borosil.html`), unique titles and descriptions on every page, canonical links, Open Graph and Twitter tags.
- Structured data: `Store` (with address, phones, hours when confirmed), `WebSite` with search, `FAQPage`, `Product` (without offers or prices), `Article` and `BreadcrumbList`.
- `sitemap.xml` and `robots.txt` are generated. The search results page is excluded from search engines.
- Skip link, visible keyboard focus, labelled forms, focus-trapped menus and dialogs, reduced-motion support, colour contrast checked for text.
- Pages are pre-rendered; images are lightweight SVG illustrations; one script (about 60 KB compressed) and one stylesheet; no tracking or analytics.
- Mobile: sticky Call / WhatsApp / Directions bar, drawer menu, layouts checked from 320 px wide up.

## Safety wording

The footer and every product page carry a short note: laboratory items should be used under the
supervision of a teacher or trained person, with suitable protective equipment, and listings show
product information only (no prices, no stock levels). The wording lives in `disclaimers` in
`data/site.js`.

## Business details used

Taken from the existing biochemphy.com listing: name (Jay Appliances & Instruments Co.), address,
phones +91 98272 84841, +91 99770 80080, 07582-243241, WhatsApp +91 98272 84841, email
jaicosagar@gmail.com. The old site's menu (Biology, Chemistry, Physics, General Laboratory
Items) and its product types (laboratory glassware, plasticware, rubberware, metalware, porcelain
ware, filter papers, meters, apparatus, teaching models and charts) became the four subjects and
20 categories of this site.
