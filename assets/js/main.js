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
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.open) return;
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
