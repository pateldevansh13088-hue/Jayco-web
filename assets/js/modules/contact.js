/* MODULE 11: Contact page (details, opening hours, holiday notices, form). */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  var m = (J.m = J.m || {});
  var u = J.u, icon = J.icon, url = J.url, esc = u.esc;

  m.hoursTable = function () {
    var h = J.data.site.hours;
    var rows = h.weekly.map(function (d) {
      return '<tr data-day="' + d.day + '"><th scope="row">' + d.day + "</th><td" + (d.closed ? ' class="is-closed"' : "") + ">" +
        (d.closed ? "Closed" : u.fmtTime(d.open) + " to " + u.fmtTime(d.close)) + "</td></tr>";
    }).join("");
    return '<div class="hoursbox"><h3>Opening hours</h3><p class="muted" style="font-size:.92rem;margin-bottom:12px" data-hours-status-text>' + esc(h.note) + "</p>" +
      '<table class="hours"><caption class="sr-only">Weekly opening hours</caption><tbody>' + rows + "</tbody></table>" +
      (h.confirmed ? "" : '<div class="notice notice--blue" role="note">' + icon("info", 20) + "<div><strong>Please call first</strong>" + esc(h.note) + "</div></div>") +
      '<div data-holidays></div></div>';
  };

  m.contactForm = function () {
    var subjects = J.data.site.contactForm.subjects.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + "</option>"; }).join("");
    return '<div class="formcard"><h2>Send us a message</h2><p>Tell us what you are looking for. We reply during opening hours.</p>' +
      '<form class="form" id="contact-form" novalidate data-endpoint="' + esc(J.data.site.contactForm.endpoint || "") + '">' +
      '<div class="form__row">' +
      '<div class="field"><label for="cf-name">Your name <small>(required)</small></label><input id="cf-name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="80"><span class="field__error" id="cf-name-err"></span></div>' +
      '<div class="field"><label for="cf-phone">Phone number</label><input id="cf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="98272 84841"><span class="field__error" id="cf-phone-err"></span></div></div>' +
      '<div class="form__row">' +
      '<div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" maxlength="120"><span class="field__error" id="cf-email-err"></span></div>' +
      '<div class="field"><label for="cf-subject">Subject</label><select id="cf-subject" name="subject">' + subjects + "</select></div></div>" +
      '<div class="field"><label for="cf-message">Message <small>(required)</small></label><textarea id="cf-message" name="message" required minlength="10" maxlength="1500" placeholder="Product name, brand and pack, or what you need help with"></textarea><span class="field__error" id="cf-message-err"></span></div>' +
      '<div class="hp" aria-hidden="true"><label for="cf-website">Leave this field empty</label><input id="cf-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
      '<p class="form__hint">Give a phone number or email so we can reply. Please do not include sensitive personal details.</p>' +
      '<button class="btn btn--primary btn--lg" type="submit">' + icon("send", 18) + "Send message</button></form>" +
      '<div class="sendpanel" id="send-result" role="status" aria-live="polite" tabindex="-1"></div></div>';
  };

  m.contactPage = function () {
    var c = J.data.site.contact;
    var info = '<ul class="cinfo">' +
      '<li><span class="cinfo__icon">' + icon("pin", 21) + "</span><div><small>Address</small><span class=\"v\">" + c.addressLines.map(esc).join("<br>") + "</span></div></li>" +
      '<li><span class="cinfo__icon">' + icon("phone", 21) + "</span><div><small>Phone</small><div class=\"stack\">" + c.phones.map(function (p) { return '<a href="tel:' + p.tel + '">' + esc(p.display) + " <span class=\"muted\" style=\"font-weight:500\">(" + esc(p.label) + ")</span></a>"; }).join("") + "</div></div></li>" +
      '<li><span class="cinfo__icon">' + icon("message", 21) + "</span><div><small>WhatsApp</small><a href=\"" + J.link.whatsapp() + '" rel="noopener">' + esc(c.whatsapp.display) + "</a></div></li>" +
      '<li><span class="cinfo__icon">' + icon("mail", 21) + "</span><div><small>Email</small><a href=\"mailto:" + esc(c.email) + '">' + esc(c.email) + "</a></div></li></ul>";
    return m.pagehead({
      title: "Contact and location",
      lead: "Call, message us on WhatsApp, or visit the store at Jawahar Ganj in Sagar.",
      crumbs: [{ label: "Home", href: url.page("home") }, { label: "Contact us" }]
    }) + '<section class="section section--tight"><div class="container"><div class="cgrid"><div>' + info + m.ctaRow(null, { lg: false }) +
      '<div style="margin-top:28px">' + m.hoursTable() + "</div></div><div>" + m.contactForm() + "</div></div>" +
      '<div style="margin-top:44px">' + m.map() + "</div></div></section>";
  };
})();
