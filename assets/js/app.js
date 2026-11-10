/* Browser behaviour. Pages arrive fully rendered (good for search engines and
   slow connections); this file makes them interactive: menus, search
   suggestions, filters, the contact form, the gallery and live opening hours. */
(function () {
  var J = window.JAICO, u = J.u, S = J.store, Q = J.search, M = J.m, icon = J.icon;
  if (!document.body) return;
  J.ctx.root = document.body.getAttribute("data-root") || "";
  J.ctx.page = document.body.getAttribute("data-page") || "";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = u.esc;
  var focusables = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function debounce(fn, ms) { var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms); }; }

  /* ---------------------------------------------------------------- */
  /* Sticky header shadow                                              */
  /* ---------------------------------------------------------------- */
  var header = $(".header");
  function onScroll() { if (header) header.classList.toggle("is-stuck", window.scrollY > 6); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------------------------------------------------------------- */
  /* Modal helper (drawer + search overlay)                            */
  /* ---------------------------------------------------------------- */
  var openModal = null;
  function lockScroll(on) { document.documentElement.style.overflow = on ? "hidden" : ""; }
  function showModal(el, opener, focusSel) {
    openModal = { el: el, opener: opener };
    el.classList.add("is-open"); lockScroll(true);
    var f = focusSel ? $(focusSel, el) : $(focusables, el);
    if (f) setTimeout(function () { f.focus(); }, 30);
  }
  function hideModal() {
    if (!openModal) return;
    openModal.el.classList.remove("is-open"); lockScroll(false);
    var o = openModal.opener; openModal = null;
    if (o && o.focus) o.focus();
  }
  document.addEventListener("keydown", function (e) {
    if (!openModal) return;
    if (e.key === "Tab") {
      var f = $$(focusables, openModal.el).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  var drawer = $("#drawer");
  $$("[data-open-drawer]").forEach(function (b) { b.addEventListener("click", function () { showModal(drawer, b); }); });
  $$("[data-close-drawer]").forEach(function (b) { b.addEventListener("click", hideModal); });
  if (drawer) $$("a", drawer).forEach(function (a) { a.addEventListener("click", function () { lockScroll(false); }); });

  var overlay = $("#search-overlay");
  function openSearch(opener) { if (overlay) showModal(overlay, opener, ".sbox__input"); }
  $$("[data-open-search]").forEach(function (b) { b.addEventListener("click", function () { openSearch(b); }); });
  if (overlay) overlay.addEventListener("mousedown", function (e) { if (e.target === overlay) hideModal(); });
  document.addEventListener("keydown", function (e) {
    var t = e.target, typing = t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable);
    if (e.key === "/" && !typing && !openModal && !e.ctrlKey && !e.metaKey) { e.preventDefault(); openSearch(document.activeElement); }
  });

  /* ---------------------------------------------------------------- */
  /* Mega menu                                                         */
  /* ---------------------------------------------------------------- */
  $$("[data-mega]").forEach(function (li) {
    var btn = $("button", li), timer;
    function set(open) {
      li.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function () { set(!li.classList.contains("is-open")); });
    if (window.matchMedia("(hover: hover)").matches) {
      li.addEventListener("mouseenter", function () { clearTimeout(timer); set(true); });
      li.addEventListener("mouseleave", function () { timer = setTimeout(function () { set(false); }, 160); });
    }
    li.addEventListener("focusout", function (e) { if (!li.contains(e.relatedTarget)) set(false); });
    document.addEventListener("click", function (e) { if (!li.contains(e.target)) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && li.classList.contains("is-open")) { set(false); btn.focus(); } });
  });

  /* ---------------------------------------------------------------- */
  /* Search box with autocomplete                                      */
  /* ---------------------------------------------------------------- */
  function bindSbox(form) {
    var input = $(".sbox__input", form), drop = $(".sdrop", form), clear = $(".sbox__clear", form);
    var stay = form.getAttribute("data-stay") === "1", active = -1, optN = 0;
    if (!input || !drop) return;

    function sync() { form.classList.toggle("has-value", !!input.value); }
    function close() { drop.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); active = -1; }
    function opts() { return $$('[role="option"]', drop); }
    function setActive(i) {
      var o = opts(); if (!o.length) return;
      active = (i + o.length) % o.length;
      o.forEach(function (x, k) { x.setAttribute("aria-selected", k === active ? "true" : "false"); });
      input.setAttribute("aria-activedescendant", o[active].id);
      o[active].scrollIntoView({ block: "nearest" });
    }
    function opt(href, inner, query) {
      var id = input.id + "-o" + optN++;
      return '<a class="sdrop__item" role="option" id="' + id + '" aria-selected="false" href="' + href + '"' + (query != null ? ' data-query="' + esc(query) + '"' : "") + ">" + inner + "</a>";
    }
    function textOpt(q, ic) {
      return opt(J.url.search(q), '<span class="sdrop__icon">' + icon(ic, 18) + '</span><span class="sdrop__text"><strong>' + esc(q) + "</strong></span>", q);
    }

    function render() {
      optN = 0;
      var q = input.value.trim(), html = "";
      if (!q) {
        var h = Q.history();
        if (h.length) html += '<div class="sdrop__title"><span>Recent searches</span><button type="button" data-clear-hist>Clear</button></div>' + h.map(function (x) { return textOpt(x, "history"); }).join("");
        html += '<div class="sdrop__title"><span>Popular searches</span></div>' + Q.popular().map(function (x) { return textOpt(x, "trend"); }).join("");
      } else {
        var s = Q.suggest(q, 6);
        if (s.products.length) {
          html += '<div class="sdrop__title"><span>Products</span></div>' + s.products.map(function (p) {
            return opt(J.url.product(p.slug), '<span class="sdrop__thumb">' + J.art(p.art, S.tone(p)) + '</span><span class="sdrop__text"><strong>' + esc(p.name) + "</strong><small>" + esc(p.brand) + ", " + esc(p.form) + "</small></span>");
          }).join("");
        }
        if (s.brands.length) html += '<div class="sdrop__title"><span>Brands</span></div>' + s.brands.map(function (b) {
          return opt(J.url.brand(b.name), '<span class="sdrop__icon">' + icon("store", 18) + '</span><span class="sdrop__text"><strong>' + esc(b.name) + "</strong><small>" + esc(b.company) + "</small></span>");
        }).join("");
        if (s.categories.length) html += '<div class="sdrop__title"><span>Categories</span></div>' + s.categories.map(function (c) {
          return opt(J.url.category(c.slug), '<span class="sdrop__icon">' + icon(c.icon, 18) + '</span><span class="sdrop__text"><strong>' + esc(c.name) + "</strong></span>");
        }).join("");
        if (!s.products.length && !s.brands.length && !s.categories.length) {
          html += '<p class="sdrop__empty">No match for “' + esc(q) + "”.</p>";
        }
        if (s.didYouMean) html += '<p class="sdrop__didyou">Did you mean <button type="button" data-suggest="' + esc(s.didYouMean) + '">' + esc(s.didYouMean) + "</button>?</p>";
        html += opt(J.url.search(q), '<span class="sdrop__icon">' + icon("search", 18) + '</span><span class="sdrop__text"><strong>See all results for “' + esc(q) + "”</strong></span>", q);
      }
      drop.innerHTML = html; drop.hidden = false; input.setAttribute("aria-expanded", "true"); active = -1;
    }

    input.addEventListener("focus", render);
    input.addEventListener("input", function () { sync(); render(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (drop.hidden) render(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (!drop.hidden) setActive(active - 1); }
      else if (e.key === "Enter" && active > -1 && !drop.hidden) { e.preventDefault(); opts()[active].click(); }
      else if (e.key === "Escape" && !drop.hidden) { e.stopPropagation(); close(); }
    });
    drop.addEventListener("mousedown", function (e) { e.preventDefault(); });
    drop.addEventListener("click", function (e) {
      var sg = e.target.closest("[data-suggest]");
      if (sg) { input.value = sg.getAttribute("data-suggest"); sync(); input.dispatchEvent(new Event("input", { bubbles: true })); input.focus(); return; }
      if (e.target.closest("[data-clear-hist]")) { Q.clearHistory(); render(); return; }
      var a = e.target.closest("a[data-query]");
      if (a) {
        Q.remember(a.getAttribute("data-query"));
        if (stay) { e.preventDefault(); input.value = a.getAttribute("data-query"); sync(); close(); input.dispatchEvent(new Event("input", { bubbles: true })); }
        else if (overlay) lockScroll(false);
      }
    });
    document.addEventListener("click", function (e) { if (!form.contains(e.target)) close(); });
    form.addEventListener("submit", function (e) {
      Q.remember(input.value);
      if (stay) { e.preventDefault(); close(); }
      else if (!input.value.trim()) { e.preventDefault(); input.focus(); }
    });
    if (clear) clear.addEventListener("click", function () { input.value = ""; sync(); input.focus(); input.dispatchEvent(new Event("input", { bubbles: true })); });
    sync();
  }
  $$("[data-sbox]").forEach(bindSbox);

  /* ---------------------------------------------------------------- */
  /* Catalogue: live search + filters                                  */
  /* ---------------------------------------------------------------- */
  function initCatalogue(root) {
    var cfg = { scope: root.getAttribute("data-scope"), category: root.getAttribute("data-category") || "" };
    var body = $("[data-cat-body]", root), live = $("[data-cat-live]", root), input = $(".sbox__input", root);
    var state = { q: "", category: "", manufacturer: "", brand: "", form: "", limit: M.PAGE_SIZE };
    var params = new URLSearchParams(location.search);
    ["q", "category", "manufacturer", "brand", "form"].forEach(function (k) { if (params.get(k)) state[k] = params.get(k); });
    if (cfg.category) state.category = "";
    input.value = state.q; input.dispatchEvent(new Event("input"));
    input.blur();
    var initDrop = $(".sdrop", root); if (initDrop) { initDrop.hidden = true; input.setAttribute("aria-expanded", "false"); }

    function writeURL() {
      var p = new URLSearchParams();
      ["q", "category", "manufacturer", "brand", "form"].forEach(function (k) { if (state[k]) p.set(k, state[k]); });
      var qs = p.toString();
      try { history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "")); } catch (e) { /* file:// may block this */ }
    }
    function render(focusId, newFrom) {
      var r = M.catalogueBody(state, cfg);
      body.innerHTML = r.html;
      live.textContent = u.plural(r.count, "product") + " found";
      writeURL();
      if (focusId) { var f = document.getElementById(focusId); if (f) f.focus(); }
      if (newFrom != null) { var t = $$(".pcard__title a", body)[newFrom]; if (t) t.focus(); }
    }
    var hasState = ["q", "category", "manufacturer", "brand", "form"].some(function (k) { return state[k]; });
    if (hasState) render();

    input.addEventListener("input", debounce(function () {
      state.q = input.value.trim(); state.limit = M.PAGE_SIZE; render();
    }, 90));

    body.addEventListener("change", function (e) {
      var f = e.target.getAttribute("data-filter");
      if (!f) return;
      state[f] = e.target.value; state.limit = M.PAGE_SIZE; render("f-" + f);
    });
    body.addEventListener("click", function (e) {
      var c = e.target.closest("[data-clear]"), mo = e.target.closest("[data-more]"), sg = e.target.closest("[data-suggest]");
      if (c) {
        var k = c.getAttribute("data-clear");
        if (k === "all" || k === "q") { state.q = ""; input.value = ""; input.dispatchEvent(new Event("input")); input.blur(); }
        if (k === "all") { state.category = state.manufacturer = state.brand = state.form = ""; }
        else if (k !== "q") state[k] = "";
        state.limit = M.PAGE_SIZE; render();
      } else if (mo) {
        var from = state.limit; state.limit += M.PAGE_SIZE; render(null, from);
      } else if (sg) {
        state.q = sg.getAttribute("data-suggest"); input.value = state.q; input.dispatchEvent(new Event("input")); input.blur(); render();
      }
    });
  }
  $$("[data-catalogue]").forEach(initCatalogue);

  /* ---------------------------------------------------------------- */
  /* Brand directory search                                            */
  /* ---------------------------------------------------------------- */
  var bs = $("[data-brandsearch]");
  if (bs) {
    var bi = $("input", bs), cards = $$(".bcard[data-brand]"), groups = $$("[data-letter]"), empty = $("[data-brand-empty]"), blive = $("[data-brand-live]");
    var run = function () {
      var terms = bi.value.toLowerCase().split(/\s+/).filter(Boolean), n = 0;
      cards.forEach(function (c) {
        var ok = terms.every(function (t) { return c.getAttribute("data-brand").indexOf(t) > -1; });
        c.hidden = !ok; if (ok) n++;
      });
      groups.forEach(function (g) { g.hidden = !$$(".bcard:not([hidden])", g).length; });
      empty.hidden = n > 0; blive.textContent = u.plural(n, "brand") + " found";
    };
    bi.addEventListener("input", debounce(run, 60));
    var qp = new URLSearchParams(location.search).get("q");
    if (qp) { bi.value = qp; run(); }
  }

  /* ---------------------------------------------------------------- */
  /* Opening hours, holiday notices                                    */
  /* ---------------------------------------------------------------- */
  function updateHours() {
    var st = u.hoursStatus(J.data.site.hours);
    $$("[data-hours-status]").forEach(function (el) {
      el.classList.toggle("is-closed", st.state !== "open");
      var span = $("span", el); if (span) span.textContent = st.text;
    });
    $$("[data-hours-status-text]").forEach(function (el) { el.textContent = st.text; });
    $$(".hours tr").forEach(function (tr) { tr.classList.toggle("is-today", tr.getAttribute("data-day") === st.today); });
  }
  updateHours(); setInterval(updateHours, 60000);

  var hol = u.activeHolidays();
  if (hol.length) {
    var n = $("[data-notice] span");
    if (n) n.textContent = hol[0].title + ". " + hol[0].text;
    $$("[data-holidays]").forEach(function (el) {
      el.innerHTML = hol.map(function (h) {
        return '<div class="notice" role="note" style="margin-top:16px">' + icon("calendar", 20) + "<div><strong>" + esc(h.title) + "</strong>" + esc(h.text) + "</div></div>";
      }).join("");
    });
  }

  /* ---------------------------------------------------------------- */
  /* Gallery lightbox                                                  */
  /* ---------------------------------------------------------------- */
  var gal = $("[data-gallery]");
  if (gal) {
    var items = $$("[data-lightbox]", gal), idx = 0, lb = document.createElement("div");
    lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = '<button class="iconbtn lightbox__close" type="button" aria-label="Close">' + icon("x", 22) + '</button><div class="lightbox__frame"><div class="lightbox__img"></div><p class="lightbox__cap"></p></div>';
    document.body.appendChild(lb);
    var showAt = function (i) {
      idx = (i + items.length) % items.length;
      var it = items[idx], media = $("svg, img", it).cloneNode(true);
      $(".lightbox__img", lb).replaceChildren(media);
      $(".lightbox__cap", lb).textContent = $(".gal__cap", it).textContent;
    };
    items.forEach(function (it, i) { it.addEventListener("click", function () { showAt(i); showModal(lb, it, ".lightbox__close"); }); });
    $(".lightbox__close", lb).addEventListener("click", hideModal);
    lb.addEventListener("mousedown", function (e) { if (e.target === lb) hideModal(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "ArrowRight") showAt(idx + 1); else if (e.key === "ArrowLeft") showAt(idx - 1);
    });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && openModal) hideModal(); });

  /* ---------------------------------------------------------------- */
  /* Contact form: validation, spam protection, sending                */
  /* ---------------------------------------------------------------- */
  var form = $("#contact-form");
  if (form) {
    var loadedAt = Date.now(), result = $("#send-result"), RATE_KEY = "jaico.cf.sent";
    var fields = { name: $("#cf-name"), phone: $("#cf-phone"), email: $("#cf-email"), message: $("#cf-message") };

    var check = {
      name: function (v) { return v.trim().length < 2 ? "Enter your name." : ""; },
      phone: function (v) {
        v = v.trim(); if (!v) return "";
        var digits = v.replace(/\D/g, "");
        return /^\+?[0-9][0-9\s\-()]{5,18}$/.test(v) && digits.length >= 7 && digits.length <= 13 ? "" : "Enter a valid phone number, for example 98272 84841.";
      },
      email: function (v) { v = v.trim(); return !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email address, for example name@example.com."; },
      message: function (v) {
        v = v.trim();
        if (v.length < 10) return "Write at least a short sentence so we know how to help.";
        if ((v.match(/https?:\/\/|www\./gi) || []).length > 1) return "Please remove the links. Messages with several links can't be sent here.";
        return "";
      }
    };
    function setError(key, msg) {
      var f = fields[key], wrap = f.closest(".field"), err = $("#cf-" + key + "-err");
      wrap.classList.toggle("has-error", !!msg); err.textContent = msg || "";
      if (msg) { f.setAttribute("aria-invalid", "true"); f.setAttribute("aria-describedby", err.id); } else { f.removeAttribute("aria-invalid"); f.removeAttribute("aria-describedby"); }
      return !msg;
    }
    Object.keys(fields).forEach(function (k) { fields[k].addEventListener("blur", function () { setError(k, check[k](fields[k].value)); }); });

    function recent() { try { return JSON.parse(localStorage.getItem(RATE_KEY) || "[]").filter(function (t) { return Date.now() - t < 3600000; }); } catch (e) { return []; } }
    function showResult(kind, title, text, actions) {
      result.className = "sendpanel is-open" + (kind === "err" ? " sendpanel--err" : "");
      result.innerHTML = "<h3>" + esc(title) + "</h3><p>" + esc(text) + "</p>" + (actions || "");
      result.focus();
    }
    function compose(d) {
      return "Name: " + d.name + (d.phone ? "\nPhone: " + d.phone : "") + (d.email ? "\nEmail: " + d.email : "") + "\nSubject: " + d.subject + "\n\n" + d.message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = { name: fields.name.value.trim(), phone: fields.phone.value.trim(), email: fields.email.value.trim(), subject: $("#cf-subject").value, message: fields.message.value.trim() };
      var ok = true, firstBad = null;
      Object.keys(fields).forEach(function (k) {
        var good = setError(k, check[k](fields[k].value));
        if (!good && !firstBad) firstBad = fields[k];
        ok = ok && good;
      });
      if (ok && !d.phone && !d.email) { setError("phone", "Add a phone number or email so we can reply."); ok = false; firstBad = fields.phone; }
      if (!ok) { firstBad.focus(); return; }

      if ($("#cf-website").value) { showResult("ok", "Message ready", "Thank you."); form.reset(); return; }  /* honeypot: bots fill hidden fields */
      if (Date.now() - loadedAt < 3000) { showResult("err", "That was quick", "Please check your message and press Send again."); return; }
      if (recent().length >= 3) { showResult("err", "Too many messages", "You have sent several messages in the last hour. Please call or message us on WhatsApp instead."); return; }

      var endpoint = form.getAttribute("data-endpoint");
      var wa = J.link.whatsapp(compose(d)), mail = J.link.mailto("Website enquiry: " + d.subject, compose(d));
      var fallback = '<div class="cta-row"><a class="btn btn--wa" href="' + wa + '" rel="noopener">' + icon("message", 18) + 'Send on WhatsApp</a><a class="btn btn--ghost" href="' + esc(mail) + '">' + icon("mail", 18) + "Send by email</a></div>";
      var remember = function () { try { var r = recent(); r.push(Date.now()); localStorage.setItem(RATE_KEY, JSON.stringify(r)); } catch (x) { /* optional */ } };

      if (!endpoint) {
        showResult("ok", "Your message is ready", "This website doesn't store messages. Choose how you'd like to send it.", fallback);
        return;
      }
      var btn = $("button[type=submit]", form); btn.disabled = true;
      fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw new Error("bad status"); remember(); form.reset(); showResult("ok", "Message sent", "Thank you. We will reply during opening hours."); })
        .catch(function () { showResult("err", "The message could not be sent", "Please send it another way.", fallback); })
        .then(function () { btn.disabled = false; });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Privacy page: clear saved searches                                */
  /* ---------------------------------------------------------------- */
  var ch = $("[data-clear-history]");
  if (ch) ch.addEventListener("click", function () { Q.clearHistory(); var s = $("[data-history-cleared]"); if (s) s.hidden = false; });

  /* ---------------------------------------------------------------- */
  /* Faster navigation: prefetch pages when a link is hovered          */
  /* ---------------------------------------------------------------- */
  var seen = {};
  document.addEventListener("pointerover", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.origin !== location.origin || !/\.html$/.test(a.pathname) || seen[a.href] || Object.keys(seen).length > 12) return;
    seen[a.href] = 1;
    var l = document.createElement("link"); l.rel = "prefetch"; l.href = a.href; document.head.appendChild(l);
  }, { passive: true });
})();
