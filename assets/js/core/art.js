/* Product and scene illustrations, drawn in SVG so the site works before real
   photographs are added. To use a real photo for a product, set `image` on the
   product record (data/products.js); the illustration is then not used.
   JAICO.art(name, tone) → full <svg> markup (320 x 240). */
(function () {
  var J = (window.JAICO = window.JAICO || {});

  var K = "#0c1f3d", B = "#1654c9", BL = "#bcd0f7", BX = "#e8effd", G = "#0b9467", GL = "#bfe8d3",
      W = "#ffffff", S = "#c4d2e4", SD = "#8fa3c2", Y = "#f3b94d", R = "#d9475f", PAPER = "#f4f8fe";

  var TONES = {
    blue: ["#e8effd", "#d4e2fb"],
    green: ["#e4f5ed", "#c9ecdb"],
    indigo: ["#e9ecfb", "#d5dbf6"],
    teal: ["#e6f4f8", "#cde9f1"]
  };

  function rect(x, y, w, h, rx, fill, stroke, sw) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + (fill || "none") + '"' +
      (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 3) + '"' : "") + "/>";
  }
  function circ(cx, cy, r, fill, stroke, sw) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || "none") + '"' +
      (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 3) + '"' : "") + "/>";
  }
  function ell(cx, cy, rx, ry, fill, stroke, sw) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (fill || "none") + '"' +
      (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 3) + '"' : "") + "/>";
  }
  function path(d, fill, stroke, sw, extra) {
    return '<path d="' + d + '" fill="' + (fill || "none") + '"' +
      (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 3) + '" stroke-linecap="round" stroke-linejoin="round"' : "") + (extra || "") + "/>";
  }
  function line(x1, y1, x2, y2, stroke, sw) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (sw || 3) + '" stroke-linecap="round"/>';
  }
  function g(attrs, inner) { return "<g " + attrs + ">" + inner + "</g>"; }
  function plus(cx, cy, s, fill) {
    var a = s / 3;
    return path("M" + (cx - a / 2) + " " + (cy - s / 2) + "h" + a + "v" + (s / 2 - a / 2) + "h" + (s / 2 - a / 2) + "v" + a +
      "h-" + (s / 2 - a / 2) + "v" + (s / 2 - a / 2) + "h-" + a + "v-" + (s / 2 - a / 2) + "h-" + (s / 2 - a / 2) + "v-" + a +
      "h" + (s / 2 - a / 2) + "z", fill);
  }
  function lines(x, y, w, n, gap, col) {
    var out = "";
    for (var i = 0; i < n; i++) out += rect(x, y + i * gap, i === n - 1 ? w * 0.6 : w, 4, 2, col || S);
    return out;
  }
  function drop(cx, cy, s, fill) {
    return path("M" + cx + " " + (cy - s) + "c" + (-s * 0.65) + " " + s * 0.95 + " " + (-s) + " " + s * 1.4 + " " + (-s) + " " + s * 1.9 +
      "a" + s + " " + s + " 0 0 0 " + 2 * s + " 0c0 " + (-s * 0.5) + " " + (-s * 0.35) + " " + (-s * 0.95) + " " + (-s) + " " + (-s * 1.9) + "z", fill);
  }

  var items = {
    tablet: function () {
      var out = rect(74, 66, 172, 108, 12, W, S, 3);
      [96, 144].forEach(function (cy) {
        [108, 160, 212].forEach(function (cx) {
          out += circ(cx, cy, 18, BX, BL, 3) + g('transform="rotate(-30 ' + cx + " " + cy + ')"', rect(cx - 11, cy - 5, 22, 10, 5, B));
        });
      });
      return out;
    },
    capsule: function () {
      var c1 = g('transform="rotate(-28 160 98)"',
        path("M160 78h-40a20 20 0 0 0 0 40h40z", B) + path("M160 78h40a20 20 0 0 1 0 40h-40z", W, S, 3) +
        rect(112, 84, 36, 6, 3, "rgba(255,255,255,.45)"));
      var c2 = g('transform="rotate(24 180 168)"',
        path("M180 152h-34a16 16 0 0 0 0 32h34z", G) + path("M180 152h34a16 16 0 0 1 0 32h-34z", GL, G, 3));
      return c2 + c1;
    },
    bottle: function () {
      return rect(140, 48, 40, 18, 4, B) + rect(144, 64, 32, 20, 3, BL) +
        rect(110, 82, 100, 112, 16, BX, B, 3) + rect(113, 132, 94, 59, 13, GL) +
        rect(122, 108, 76, 64, 8, W) + plus(160, 128, 20, G) + lines(130, 148, 60, 2, 10);
    },
    vial: function () {
      return rect(134, 50, 52, 16, 3, SD) + rect(128, 64, 64, 10, 3, S) +
        rect(132, 74, 56, 112, 10, PAPER, B, 3) + rect(135, 124, 50, 59, 8, BL) +
        rect(138, 94, 44, 52, 5, W) + plus(160, 112, 18, B) + lines(144, 130, 32, 2, 8);
    },
    tube: function () {
      return rect(118, 52, 84, 14, 2, SD) + line(126, 59, 194, 59, S, 2) +
        path("M118 66h84l-8 104h-68z", W, B, 3) + path("M121 104h78l-3 28h-72z", GL) + plus(160, 118, 18, G) +
        rect(138, 170, 44, 24, 5, B);
    },
    dropper: function () {
      return rect(146, 44, 28, 42, 14, B) + rect(138, 82, 44, 16, 3, SD) + rect(122, 96, 76, 90, 14, PAPER, B, 3) +
        rect(125, 140, 70, 43, 11, BL) + rect(132, 114, 56, 40, 6, W) + plus(160, 128, 16, G) +
        drop(236, 84, 12, B);
    },
    sachet: function () {
      var back = g('transform="rotate(10 160 120)"', rect(104, 60, 112, 118, 6, GL, G, 3));
      var front = g('transform="rotate(-8 160 120)"',
        rect(100, 62, 120, 116, 6, W, S, 3) + rect(100, 62, 120, 12, 2, S) + rect(100, 166, 120, 12, 2, S) +
        plus(160, 112, 36, G) + lines(122, 140, 76, 2, 10));
      return back + front;
    },
    pump: function () {
      return rect(152, 62, 16, 30, 3, SD) + rect(134, 44, 58, 16, 8, G) + rect(188, 48, 22, 8, 4, G) +
        rect(116, 90, 88, 104, 20, W, G, 3) + rect(126, 118, 68, 50, 8, GL) + plus(160, 138, 20, G);
    },
    jar: function () {
      return rect(108, 82, 104, 26, 8, G) + rect(114, 104, 92, 84, 16, W, S, 3) + rect(122, 120, 76, 50, 6, GL) +
        plus(160, 140, 22, G);
    },
    box: function () {
      return path("M196 84l32-20v96l-32 20z", BL, B, 3) + path("M96 84l32-20h100l-32 20z", BX, B, 3) +
        rect(96, 84, 100, 96, 4, W, B, 3) + plus(146, 122, 30, G) + lines(114, 150, 64, 2, 9);
    },
    firstaid: function () {
      return path("M136 86v-10a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8v10", "none", K, 8) + rect(90, 86, 140, 96, 14, G) +
        plus(160, 134, 52, W);
    },
    bpmonitor: function () {
      return rect(48, 88, 76, 84, 16, BL, B, 3) + line(62, 110, 110, 110, B, 3) + line(62, 130, 110, 130, B, 3) +
        path("M124 146h12", "none", SD, 6) + rect(136, 68, 138, 112, 16, W, K, 3) + rect(150, 82, 110, 52, 8, K) +
        '<text x="162" y="118" fill="#8fe3bf" font-size="32" font-weight="700" font-family="monospace">120</text>' +
        '<text x="222" y="124" fill="#bcd0f7" font-size="16" font-weight="700" font-family="monospace">/80</text>' +
        circ(172, 157, 9, G) + circ(204, 157, 9, B) + circ(236, 157, 9, S);
    },
    thermometer: function () {
      return g('transform="rotate(-34 160 120)"',
        rect(68, 104, 172, 32, 16, W, K, 3) + rect(236, 110, 32, 20, 10, SD) + rect(86, 111, 54, 18, 4, K) +
        '<text x="92" y="125" fill="#8fe3bf" font-size="13" font-weight="700" font-family="monospace">36.8</text>' + circ(166, 120, 6, G));
    },
    glucometer: function () {
      return rect(148, 46, 24, 40, 3, BL, B, 2.5) + rect(112, 78, 96, 118, 18, W, K, 3) + rect(124, 92, 72, 40, 8, K) +
        '<text x="140" y="123" fill="#8fe3bf" font-size="28" font-weight="700" font-family="monospace">98</text>' +
        circ(160, 164, 14, G) + circ(130, 178, 5, S) + circ(190, 178, 5, S) + drop(240, 78, 13, R);
    },
    strips: function () {
      var sx = g('transform="rotate(-14 160 100)"', rect(142, 44, 16, 56, 3, W, SD, 2)) +
        g('transform="rotate(4 160 100)"', rect(154, 38, 16, 62, 3, W, SD, 2)) +
        g('transform="rotate(20 160 100)"', rect(166, 46, 16, 54, 3, BL, B, 2));
      return sx + rect(126, 92, 68, 98, 12, B) + rect(122, 88, 76, 18, 6, K) + rect(134, 120, 52, 44, 5, W) + drop(160, 132, 8, R) +
        lines(140, 152, 40, 1, 8, S);
    },
    nebulizer: function () {
      return rect(66, 112, 112, 76, 14, W, K, 3) + circ(94, 150, 10, G) + line(130, 130, 164, 130, S, 4) + line(130, 146, 164, 146, S, 4) +
        line(130, 162, 164, 162, S, 4) + path("M178 144c34 0 28-48 52-48", "none", SD, 6) +
        rect(222, 84, 36, 44, 9, BL, B, 3) + rect(256, 98, 26, 14, 6, W, K, 3);
    },
    device: function () {
      return rect(116, 56, 88, 132, 18, W, K, 3) + rect(128, 70, 64, 46, 8, K) +
        path("M134 94h12l5-12 8 22 6-10h14", "none", "#8fe3bf", 3) + circ(160, 148, 12, G) + circ(134, 168, 5, S) + circ(186, 168, 5, S);
    },
    scale: function () {
      return rect(84, 72, 152, 112, 18, W, K, 3) + rect(128, 88, 64, 28, 7, K) +
        '<text x="140" y="109" fill="#8fe3bf" font-size="19" font-weight="700" font-family="monospace">62.4</text>' +
        rect(106, 132, 48, 32, 12, PAPER, S, 2.5) + rect(166, 132, 48, 32, 12, PAPER, S, 2.5);
    },
    bed: function () {
      return rect(66, 82, 10, 90, 3, K) + rect(244, 100, 10, 72, 3, K) + path("M92 118V94h118v24", "none", S, 4) +
        rect(72, 118, 176, 26, 8, BL, B, 3) + rect(72, 146, 176, 10, 3, SD) + ell(106, 110, 24, 9, W, S, 2.5) +
        line(92, 156, 92, 170, K, 5) + line(228, 156, 228, 170, K, 5) + circ(92, 178, 10, K) + circ(228, 178, 10, K) +
        circ(92, 178, 3, S) + circ(228, 178, 3, S);
    },
    wheelchair: function () {
      return circ(128, 158, 42, "none", K, 5) + circ(128, 158, 34, "none", S, 2) + circ(128, 158, 5, K) +
        circ(226, 190, 13, W, K, 4) + path("M118 62l10 52h76", "none", B, 9) + path("M128 114l-4 44", "none", SD, 5) +
        path("M204 114l22 66", "none", SD, 6) + path("M104 56h26", "none", K, 8) + rect(120, 106, 90, 12, 5, B);
    },
    scissors: function () {
      return line(160, 118, 116, 52, S, 11) + line(160, 118, 204, 52, S, 11) + line(160, 118, 122, 168, SD, 9) +
        line(160, 118, 198, 168, SD, 9) + circ(116, 186, 18, "none", B, 8) + circ(204, 186, 18, "none", B, 8) + circ(160, 118, 6, K);
    },
    syringe: function () {
      return g('transform="rotate(-20 160 120)"',
        rect(94, 104, 122, 32, 6, W, K, 3) + rect(106, 108, 64, 24, 3, BL) + line(176, 104, 176, 112, K, 2) + line(190, 104, 190, 112, K, 2) +
        line(204, 104, 204, 112, K, 2) + rect(212, 98, 8, 44, 2, K) + line(220, 120, 276, 120, SD, 3) + rect(60, 114, 36, 12, 3, SD) +
        rect(48, 102, 10, 36, 3, B));
    },
    lamp: function () {
      return rect(112, 188, 96, 10, 5, K) + circ(122, 204, 6, K) + circ(198, 204, 6, K) + rect(156, 84, 8, 106, 3, SD) +
        path("M160 90l54-26", "none", SD, 7) + rect(204, 44, 66, 36, 16, B) + path("M214 86h46l16 52h-78z", "#fff3c4") + circ(160, 90, 7, K);
    },
    beaker: function () {
      var grads = "";
      [84, 104, 124, 144, 164].forEach(function (y, i) { grads += line(104, y, i % 2 ? 122 : 134, y, B, 2.5); });
      return path("M104 56h112v122a14 14 0 0 1-14 14h-84a14 14 0 0 1-14-14z", PAPER, B, 3) + path("M216 56l12-6", "none", B, 3) +
        path("M107 120h106v58a12 12 0 0 1-12 12h-82a12 12 0 0 1-12-12z", GL) + line(107, 120, 213, 120, G, 2.5) + grads;
    },
    flask: function () {
      return rect(134, 44, 52, 10, 4, B) + path("M140 54H180V86L228 176Q232 190 218 190H102Q88 190 92 176L140 86Z", PAPER, B, 3) +
        path("M111 140H209L228 176Q232 190 218 190H102Q88 190 92 176Z", GL) + line(111, 140, 209, 140, G, 2.5) +
        circ(150, 168, 5, W) + circ(176, 160, 3.5, W);
    },
    testtubes: function () {
      var out = "";
      [[106, GL], [146, BL], [186, "#f8e3b0"]].forEach(function (t) {
        out += path("M" + t[0] + " 60h30v100a15 15 0 0 1-30 0z", PAPER, B, 3) + rect(t[0] - 3, 54, 36, 8, 3, B) +
          path("M" + (t[0] + 1.5) + " 104h27v56a13.5 13.5 0 0 1-27 0z", t[1]);
      });
      return out + rect(92, 112, 136, 12, 4, K) + rect(98, 124, 8, 56, 3, K) + rect(214, 124, 8, 56, 3, K);
    },
    petri: function () {
      return ell(160, 156, 84, 26, BL, B, 3) + rect(76, 124, 168, 32, 0, PAPER) + line(76, 124, 76, 156, B, 3) + line(244, 124, 244, 156, B, 3) +
        ell(160, 124, 84, 26, PAPER, B, 3) + ell(160, 124, 62, 18, GL, G, 2) + circ(140, 122, 5, G) + circ(168, 128, 4, G) + circ(178, 118, 3, G) + circ(150, 130, 3, G);
    },
    "tube-lab": function () {
      return path("M128 80H192V150L170 194Q160 206 150 194L128 150Z", PAPER, B, 3) + path("M129 124H191V150L170 192Q160 203 150 192L129 150Z", BL) +
        rect(120, 56, 80, 26, 6, G) + line(136, 100, 150, 100, B, 2.5) + line(136, 112, 146, 112, B, 2.5) + line(136, 124, 150, 124, B, 2.5);
    },
    filter: function () {
      return circ(112, 138, 54, W, S, 3) + circ(124, 130, 54, W, S, 3) + circ(136, 122, 54, PAPER, SD, 3) +
        path("M196 74L266 74L231 176Z", PAPER, B, 3) + path("M214 74L231 176", "none", BL, 3) + path("M248 74L231 176", "none", BL, 3);
    },
    microscope: function () {
      return rect(110, 184, 120, 12, 6, K) + path("M184 82C262 86 268 176 206 186", "none", B, 12) + rect(116, 158, 78, 8, 3, SD) +
        g('transform="rotate(-18 160 90)"', rect(150, 36, 22, 26, 4, K) + rect(146, 62, 30, 62, 6, B) + rect(154, 124, 14, 24, 3, SD));
    },
    mortar: function () {
      return path("M98 124h124c0 40-26 66-62 66s-62-26-62-66z", PAPER, B, 3) + rect(88, 116, 144, 12, 6, B) + rect(134, 186, 52, 10, 4, B) +
        g('transform="rotate(26 196 84)"', rect(184, 30, 24, 108, 12, W, B, 3));
    },
    stopper: function () {
      function st(cx, w, h, y) {
        return path("M" + (cx - w / 2) + " " + y + "h" + w + "l-" + w * 0.12 + " " + h + "h-" + w * 0.76 + "z", "#d9795f", K, 2.5) +
          ell(cx, y, w / 2, 6, "#e7957c", K, 2.5) + ell(cx, y, w * 0.12, 3, K);
      }
      return st(112, 64, 62, 116) + st(172, 54, 54, 128) + st(222, 42, 44, 138);
    },
    model: function () {
      return rect(146, 46, 28, 30, 6, "#f0cdbb") + path("M118 74Q160 54 202 74L218 112L208 186H112L102 112Z", "#f5d9ca", "#d9b39f", 2.5) +
        ell(140, 108, 14, 22, "#e89aa4") + ell(180, 108, 14, 22, "#e89aa4") + circ(162, 132, 11, R) + path("M130 150h52q10 16-6 22h-40q-12-8-6-22z", "#c9835f") +
        rect(98, 186, 124, 10, 4, K);
    },
    /* ---- laboratory items ---- */
    slides: function () {
      function sl(x, y, rot, fill) {
        return g('transform="rotate(' + rot + " " + (x + 60) + " " + (y + 20) + ')"', rect(x, y, 120, 40, 4, PAPER, B, 3) + rect(x + 8, y + 6, 24, 28, 2, fill) +
          rect(x + 54, y + 10, 28, 20, 2, "rgba(188,208,247,.7)", B, 2) + circ(x + 68, y + 20, 5, G));
      }
      return sl(88, 62, -6, "#f8e3b0") + sl(104, 112, 3, GL) + sl(84, 160, -2, BL);
    },
    dissection: function () {
      return rect(70, 150, 180, 46, 8, K) + rect(78, 158, 164, 30, 5, "#1d3763") +
        path("M92 136L196 78", "none", B, 9) + path("M196 78l22-12-8 26z", SD, K, 2) +
        path("M118 142L168 92", "none", SD, 5) + path("M130 150L176 100", "none", SD, 5) + circ(112, 146, 8, "none", SD, 4) + circ(124, 154, 8, "none", SD, 4) +
        g('transform="translate(176 62) scale(.46) rotate(20 160 120)"', items.scissors());
    },
    stand: function () {
      return rect(84, 186, 132, 12, 5, K) + rect(112, 48, 10, 140, 4, SD) + rect(112, 88, 80, 9, 3, B) + rect(104, 82, 26, 22, 4, K) + circ(192, 92, 12, "none", B, 4) +
        rect(112, 138, 66, 8, 3, B) + rect(104, 132, 26, 22, 4, K);
    },
    funnel: function () {
      return path("M100 60H220L180 134V196H140V134Z", PAPER, B, 3) + path("M118 82H202L176 130H144Z", GL) + line(104, 60, 216, 60, B, 4) + circ(160, 104, 5, W);
    },
    bunsen: function () {
      return ell(160, 198, 66, 9, K) + rect(150, 98, 20, 96, 6, SD) + rect(138, 86, 44, 16, 5, K) + rect(148, 168, 24, 9, 3, B) + circ(160, 140, 5, K) +
        path("M160 18c13 18 20 30 20 42a20 20 0 0 1-40 0c0-12 7-24 20-42z", "#f7c25a") + path("M160 38c8 11 12 18 12 26a12 12 0 0 1-24 0c0-8 4-15 12-26z", B);
    },
    burette: function () {
      var t = "";
      for (var i = 0; i < 9; i++) t += line(150, 56 + i * 12, i % 2 ? 160 : 168, 56 + i * 12, B, 2);
      return rect(142, 28, 36, 152, 8, PAPER, B, 3) + rect(143, 96, 34, 84, 0, GL) + line(143, 96, 177, 96, G, 2.5) + t +
        rect(126, 180, 68, 10, 4, K) + rect(154, 174, 12, 22, 3, G) + path("M154 190h12l-6 24z", PAPER, B, 2.5);
    },
    pipette: function () {
      var t = "";
      for (var i = 0; i < 10; i++) t += line(150, 52 + i * 12, i % 2 ? 158 : 164, 52 + i * 12, B, 2);
      return path("M148 40h24v140l-12 30-12-30z", PAPER, B, 3) + path("M149 106h22v74l-11 27-11-27z", GL) + rect(144, 30, 32, 12, 4, B) + t;
    },
    cylinder: function () {
      var t = "";
      for (var i = 0; i < 8; i++) t += line(140, 66 + i * 14, i % 2 ? 150 : 158, 66 + i * 14, B, 2);
      return rect(122, 36, 76, 152, 8, PAPER, B, 3) + rect(123, 112, 74, 76, 0, GL) + line(123, 112, 197, 112, G, 2.5) + t + rect(104, 186, 112, 12, 6, B) + path("M198 36l10-5", "none", B, 3);
    },
    meter: function () {
      var ticks = "";
      for (var i = 0; i <= 10; i++) {
        var a = Math.PI * (1 - i / 10), x1 = 160 + 52 * Math.cos(a), y1 = 150 - 52 * Math.sin(a), x2 = 160 + (i % 5 ? 59 : 64) * Math.cos(a), y2 = 150 - (i % 5 ? 59 : 64) * Math.sin(a);
        ticks += line(x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1), K, 2);
      }
      return rect(80, 44, 160, 148, 16, W, K, 4) + path("M104 150a56 56 0 0 1 112 0", "none", SD, 2) + ticks + line(160, 150, 188, 104, R, 3.5) + circ(160, 150, 7, K) +
        circ(116, 176, 7, R) + circ(160, 176, 7, K) + circ(204, 176, 7, G) + rect(120, 160, 80, 6, 3, BX);
    },
    lens: function () {
      return line(52, 92, 128, 92, Y, 3) + line(52, 112, 124, 112, Y, 3) + line(52, 132, 128, 132, Y, 3) +
        line(192, 92, 258, 114, Y, 3) + line(196, 112, 258, 114, Y, 3) + line(192, 132, 258, 114, Y, 3) +
        path("M160 38C200 74 200 150 160 186C120 150 120 74 160 38Z", "rgba(214,235,252,.85)", B, 3.5) + path("M146 78C136 100 136 124 146 146", "none", W, 4) +
        rect(152, 186, 16, 10, 3, K) + rect(104, 194, 112, 10, 5, K);
    },
    prism: function () {
      return line(44, 140, 112, 140, K, 3.5) + line(112, 140, 208, 142, SD, 3) +
        path("M160 44L232 176H88Z", "rgba(214,235,252,.9)", B, 3.5) + path("M160 72L204 152H116Z", "rgba(255,255,255,.55)") +
        line(208, 142, 276, 116, R, 3.5) + line(208, 142, 280, 134, Y, 3.5) + line(208, 142, 280, 152, G, 3.5) + line(208, 142, 274, 172, B, 3.5);
    },
    caliper: function () {
      var t = "";
      for (var i = 0; i < 16; i++) t += line(84 + i * 10, 100, 84 + i * 10, i % 5 ? 108 : 116, K, 2);
      return rect(52, 98, 220, 28, 3, W, K, 3) + t + rect(52, 98, 18, 92, 3, K) + rect(130, 90, 70, 44, 8, B) + rect(130, 126, 14, 64, 3, SD) +
        circ(186, 100, 9, K) + rect(144, 104, 40, 16, 3, BX);
    },
    magnet: function () {
      return path("M100 56h46v76a14 14 0 0 0 28 0V56h46v76a60 60 0 0 1-120 0z", R, K, 3) + rect(100, 56, 46, 26, 0, "#dfe6f2", K, 3) + rect(174, 56, 46, 26, 0, "#dfe6f2", K, 3) +
        line(112, 100, 112, 128, W, 4);
    },
    goggles: function () {
      return line(76, 120, 50, 118, K, 9) + line(244, 120, 270, 118, K, 9) + ell(120, 120, 44, 36, "rgba(205,232,250,.85)", K, 4.5) + ell(200, 120, 44, 36, "rgba(205,232,250,.85)", K, 4.5) +
        rect(152, 112, 16, 10, 4, K) + path("M100 104c6-8 16-12 26-12", "none", W, 4) + path("M180 104c6-8 16-12 26-12", "none", W, 4);
    },
    balance: function () {
      return rect(76, 150, 168, 44, 12, K) + ell(150, 136, 52, 10, "#dfe6f2", SD, 3) + rect(146, 140, 8, 14, 2, SD) + rect(184, 160, 48, 22, 4, GL, G, 2) +
        rect(192, 166, 6, 10, 1, G) + rect(202, 166, 6, 10, 1, G) + rect(212, 166, 6, 10, 1, G) + circ(100, 172, 7, B);
    },
    chart: function () {
      return rect(90, 42, 140, 10, 5, K) + rect(96, 52, 128, 146, 4, W, S, 3) + circ(160, 106, 36, GL, G, 3) + circ(160, 106, 13, G) +
        circ(148, 94, 4, W) + rect(112, 156, 96, 6, 3, S) + rect(112, 170, 70, 6, 3, S);
    }
  };

  /* Wide scenes for the gallery placeholders */
  function sc(name, inner) { return inner; }
  var scenes = {
    shelves: function () {
      var out = rect(0, 0, 320, 240, 0, "#eef3fa");
      [62, 118, 174].forEach(function (y, r) {
        out += rect(24, y + 36, 272, 8, 3, SD);
        for (var i = 0; i < 9; i++) {
          var h = 24 + ((i * 7 + r * 5) % 4) * 6;
          out += rect(32 + i * 29, y + 36 - h, 22, h, 3, i % 3 === 0 ? B : i % 3 === 1 ? G : BL) + rect(32 + i * 29, y + 36 - h + 6, 22, 5, 0, "rgba(255,255,255,.7)");
        }
      });
      return out;
    },
    instruments: function () {
      return rect(0, 0, 320, 240, 0, "#eef3fa") + rect(0, 168, 320, 72, 0, "#dde6f1") +
        g('transform="translate(-40 28) scale(.74)"', items.microscope()) + g('transform="translate(78 62) scale(.6)"', items.meter()) +
        g('transform="translate(150 72) scale(.62)"', items.balance());
    },
    glassware: function () {
      return rect(0, 0, 320, 240, 0, "#eaf4f8") + rect(0, 176, 320, 64, 0, "#d5e5ec") +
        g('transform="translate(-34 46) scale(.7)"', items.beaker()) + g('transform="translate(52 40) scale(.7)"', items.flask()) +
        g('transform="translate(120 52) scale(.62)"', items.testtubes());
    },
    physicsbench: function () {
      return rect(0, 0, 320, 240, 0, "#eef0fb") + rect(0, 176, 320, 64, 0, "#dfe3f5") +
        g('transform="translate(-30 30) scale(.7)"', items.lens()) + g('transform="translate(70 28) scale(.62)"', items.prism()) +
        g('transform="translate(150 66) scale(.58)"', items.magnet());
    },
    counter: function () {
      return rect(0, 0, 320, 240, 0, "#eef6f2") + g('transform="translate(112 -2) scale(.5)"', items.flask()) + rect(24, 108, 272, 8, 3, SD) +
        rect(24, 116, 272, 10, 0, "rgba(0,0,0,0)") + rect(40, 150, 240, 12, 4, K) + rect(52, 162, 216, 70, 0, W, S, 3) +
        line(160, 162, 160, 232, S, 3) + rect(214, 134, 40, 16, 4, B) + rect(70, 128, 30, 22, 3, GL, G, 2);
    },
    storefront: function () {
      var awn = "";
      for (var i = 0; i < 8; i++) awn += path("M" + (36 + i * 31) + " 70h31v28a15.5 14 0 0 1-31 0z", i % 2 ? W : B, B, 2);
      return rect(0, 0, 320, 240, 0, "#e9f0fb") + rect(0, 196, 320, 44, 0, "#cfd9ea") + rect(30, 44, 260, 154, 6, W, S, 3) + rect(54, 48, 212, 20, 4, B) +
        awn + rect(60, 124, 70, 74, 4, "#dbe9fb", SD, 3) + rect(150, 124, 84, 74, 4, "#cfe3d9", SD, 3) + g('transform="translate(168 120) scale(.32)"', items.flask());
    }
  };

  /* Public: art(name, tone) → svg string. tone = blue | green | indigo | teal */
  J.art = function (name, tone, label) {
    var t = TONES[tone] || TONES.blue;
    var attrs = ' viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"' +
      (label ? ' role="img" aria-label="' + J.u.esc(label) + '"' : ' aria-hidden="true" focusable="false"');
    if (scenes[name]) return "<svg" + attrs + ">" + scenes[name]() + "</svg>";
    var fn = items[name] || items.box;
    return "<svg" + attrs + ">" + rect(0, 0, 320, 240, 0, t[0]) + circ(262, 38, 96, t[1]) + circ(40, 220, 60, t[1]) +
      ell(160, 204, 84, 9, "rgba(12,31,61,.1)") + fn() + "</svg>";
  };
  J.artNames = Object.keys(items).concat(Object.keys(scenes));
})();
