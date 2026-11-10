/* Small shared helpers: escaping, URLs, contact links, opening hours. */
(function () {
  var J = (window.JAICO = window.JAICO || {});
  J.ctx = J.ctx || { root: "", page: "" };
  var u = (J.u = {});

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  u.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  };
  u.slugify = function (s) {
    return String(s).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  };
  u.attr = u.esc;

  /* ---------- URLs (all relative to the current page via J.ctx.root) ---------- */
  var url = (J.url = {});
  url.root = function () { return J.ctx.root || ""; };
  url.page = function (name) { return url.root() + (name === "home" ? "index" : name) + ".html"; };
  url.product = function (slug) { return url.root() + "products/" + slug + ".html"; };
  url.category = function (slug) { return url.root() + "category/" + slug + ".html"; };
  url.brand = function (nameOrSlug) { return url.root() + "brand/" + u.slugify(nameOrSlug) + ".html"; };
  url.article = function (slug) { return url.root() + "guides/" + slug + ".html"; };
  url.subject = function (slug) { return url.root() + "subject/" + slug + ".html"; };
  url.asset = function (path) { return url.root() + path; };
  url.search = function (q) { return url.root() + "search.html" + (q ? "?q=" + encodeURIComponent(q) : ""); };
  url.abs = function (path) { return J.data.site.baseUrl.replace(/\/$/, "") + "/" + String(path).replace(/^\//, ""); };

  /* ---------- Contact links ---------- */
  var link = (J.link = {});
  link.tel = function (p) { return "tel:" + (p || J.data.site.contact.phones[0]).tel; };
  link.whatsapp = function (msg) {
    var c = J.data.site.contact.whatsapp;
    return "https://wa.me/" + c.number + "?text=" + encodeURIComponent(msg || c.defaultMessage);
  };
  link.directions = function () {
    var c = J.data.site.contact;
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(c.mapQuery);
  };
  link.mapEmbed = function () {
    var c = J.data.site.contact;
    return c.mapEmbedUrl || "https://www.google.com/maps?q=" + encodeURIComponent(c.mapQuery) + "&output=embed";
  };
  link.mailto = function (subject, body) {
    var q = [];
    if (subject) q.push("subject=" + encodeURIComponent(subject));
    if (body) q.push("body=" + encodeURIComponent(body));
    return "mailto:" + J.data.site.contact.email + (q.length ? "?" + q.join("&") : "");
  };

  /* ---------- Opening hours (always evaluated in India time) ---------- */
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  u.fmtTime = function (hhmm) {
    var p = hhmm.split(":"), h = +p[0], m = p[1], ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + (m === "00" ? "" : ":" + m) + " " + ap;
  };
  u.nowInIndia = function (d) {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata", weekday: "long", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(d || new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var hh = o.hour === "24" ? "00" : o.hour;
    return { day: o.weekday, minutes: +hh * 60 + +o.minute };
  };
  var toMin = function (s) { var p = s.split(":"); return +p[0] * 60 + +p[1]; };

  /* Returns { state: "open" | "closed" | "unknown", text, today } */
  u.hoursStatus = function (hours, d) {
    var now = u.nowInIndia(d);
    var today = hours.weekly.filter(function (w) { return w.day === now.day; })[0];
    if (!hours.confirmed) {
      return { state: "unknown", today: now.day, text: "Call to confirm today's opening hours" };
    }
    if (!today || today.closed) {
      var next = null;
      for (var i = 1; i <= 7 && !next; i++) {
        var nd = DAYS[(DAYS.indexOf(now.day) + i) % 7];
        var w = hours.weekly.filter(function (x) { return x.day === nd; })[0];
        if (w && !w.closed) next = w;
      }
      return { state: "closed", today: now.day, text: "Closed today" + (next ? ". Opens " + next.day + " at " + u.fmtTime(next.open) : "") };
    }
    var o = toMin(today.open), c = toMin(today.close);
    if (now.minutes >= o && now.minutes < c) {
      return { state: "open", today: now.day, text: "Open now. Closes at " + u.fmtTime(today.close) };
    }
    if (now.minutes < o) return { state: "closed", today: now.day, text: "Closed. Opens today at " + u.fmtTime(today.open) };
    return { state: "closed", today: now.day, text: "Closed for today. Opens tomorrow" };
  };

  /* Active holiday notice (client-side, by today's date in India). */
  u.todayISO = function (d) {
    var f = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" });
    return f.format(d || new Date());
  };
  u.activeHolidays = function (d) {
    var t = u.todayISO(d);
    return (J.data.holidays || []).filter(function (h) { return t >= h.from && t <= h.to; });
  };

  u.fmtDate = function (iso) {
    var p = iso.split("-");
    var m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return +p[2] + " " + m[+p[1] - 1] + " " + p[0];
  };

  u.plural = function (n, one, many) { return n + " " + (n === 1 ? one : many || one + "s"); };
  u.truncate = function (s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; };
})();
