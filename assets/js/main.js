// New Ones — drobne skrypty: menu mobilne, galeria (lightbox), rok w stopce.
(function () {
  "use strict";

  // Menu mobilne
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Rok w stopce
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Płynne otwieranie/zamykanie akordeonów (etapy budowy i wykończenia).
  // <details> działa też bez JS; skrypt dodaje tylko animację wysokości i treści.
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && typeof Element.prototype.animate === "function") {
    document.querySelectorAll("details.step").forEach(function (el) {
      var summary = el.querySelector("summary");
      var body = el.querySelector(".step__body");
      if (!summary || !body) return;
      var anim = null;   // bieżąca animacja wysokości
      var timer = null;

      function stopAll() {
        clearTimeout(timer);
        if (anim) anim.cancel();
        body.getAnimations().forEach(function (a) { a.cancel(); });
      }

      // Koniec animacji ustawiamy zegarem (nie zdarzeniem onfinish), żeby akordeon
      // nigdy nie utknął w połowie, np. gdy karta przeglądarki jest w tle.
      function done(isOpen, ms) {
        timer = setTimeout(function () {
          stopAll();
          anim = null;
          el.open = isOpen;
          el.style.overflow = "";
        }, ms);
      }

      summary.addEventListener("click", function (e) {
        e.preventDefault();
        // kliknięcie w trakcie animacji odwraca jej kierunek
        var closing = anim ? anim.expanding : el.open;
        var from = el.offsetHeight;
        stopAll();
        el.style.overflow = "hidden";
        el.open = true;

        if (closing) {
          var to = el.offsetHeight - body.offsetHeight;
          anim = el.animate({ height: [from + "px", to + "px"] }, { duration: 260, easing: "cubic-bezier(.4, 0, .2, 1)", fill: "forwards" });
          body.animate({ opacity: [1, 0] }, { duration: 180, easing: "ease-out", fill: "forwards" });
          anim.expanding = false;
          done(false, 260);
        } else {
          var target = el.offsetHeight;
          anim = el.animate({ height: [from + "px", target + "px"] }, { duration: 320, easing: "cubic-bezier(.2, .7, .2, 1)", fill: "forwards" });
          body.animate(
            { opacity: [0, 1], transform: ["translateY(-6px)", "none"] },
            { duration: 300, delay: 40, easing: "ease-out", fill: "both" }
          );
          anim.expanding = true;
          done(true, 340);
        }
      });
    });
  }

  // Lightbox dla galerii
  var box = document.querySelector(".lightbox");
  if (!box || typeof box.showModal !== "function") return;

  var img = box.querySelector("img");
  var count = box.querySelector(".lightbox__count");
  var items = [];
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var src = items[index];
    img.src = src.dataset.full || src.querySelector("img").src;
    img.alt = src.querySelector("img").alt;
    count.textContent = index + 1 + " / " + items.length;
  }

  document.querySelectorAll(".gallery").forEach(function (gallery) {
    var buttons = Array.prototype.slice.call(gallery.querySelectorAll("button"));
    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        items = buttons;
        show(i);
        box.showModal();
      });
    });
  });

  box.querySelector(".lightbox__close").addEventListener("click", function () { box.close(); });
  box.querySelector(".lightbox__prev").addEventListener("click", function () { show(index - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function () { show(index + 1); });
  // klik w tło (poza zdjęciem) zamyka podgląd
  var stage = box.querySelector(".lightbox__stage");
  box.addEventListener("click", function (e) { if (e.target === box || e.target === stage) box.close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.open) return;
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // przesuwanie palcem na telefonie
  var startX = null, startY = null;
  stage.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
  });
})();
