/* Montay — site behaviour. Vanilla, no dependencies, ~4 KB.
   Everything degrades gracefully without JS: nav links work, photos are
   real <img> in <button>, videos fall back to a link to YouTube. */
(function () {
  "use strict";

  var doc = document;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- sticky header shadow ---------------- */
  var head = doc.querySelector(".masthead");
  if (head) {
    var onScroll = function () {
      head.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- mobile nav ---------------- */
  var burger = doc.querySelector(".burger");
  if (burger) {
    var nav = doc.getElementById("nav");
    burger.addEventListener("click", function () {
      var open = doc.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (nav) nav.setAttribute("aria-hidden", open ? "false" : "true");
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.body.classList.contains("nav-open")) {
        burger.click();
      }
    });
    // close when a link is chosen (same-page anchors especially)
    nav &&
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a") && doc.body.classList.contains("nav-open")) {
          doc.body.classList.remove("nav-open");
          burger.setAttribute("aria-expanded", "false");
        }
      });
  }

  /* ---------------- reveal on scroll ---------------- */
  var reveals = doc.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var ro = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              ro.unobserve(en.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      reveals.forEach(function (el) {
        ro.observe(el);
      });
    }
  }

  /* ---------------- gallery images fade in when decoded ---------------- */
  doc.querySelectorAll(".gallery img").forEach(function (img) {
    if (img.complete) img.classList.add("is-in");
    else
      img.addEventListener(
        "load",
        function () {
          img.classList.add("is-in");
        },
        { once: true }
      );
  });

  /* ---------------- click-to-play video facades ---------------- */
  doc.querySelectorAll("[data-embed]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var src = el.getAttribute("data-embed");
      var title = el.getAttribute("data-title") || "Video";
      var f = doc.createElement("iframe");
      f.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
      f.title = title;
      f.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.setAttribute("allowfullscreen", "");
      f.setAttribute("loading", "lazy");
      f.referrerPolicy = "strict-origin-when-cross-origin";
      el.replaceChildren(f);
      el.classList.add("is-playing");
      el.removeAttribute("data-embed");
    });
  });

  /* ---------------- lightbox ---------------- */
  var gallery = doc.querySelector(".gallery");
  var lb = doc.getElementById("lightbox");
  if (gallery && lb) {
    var items = [].slice.call(gallery.querySelectorAll("button[data-full]"));
    var stage = lb.querySelector(".lb__stage");
    var count = lb.querySelector(".lb__count");
    var idx = -1;
    var lastFocus = null;

    var preload = function (i) {
      var b = items[i];
      if (!b) return;
      var im = new Image();
      im.src = b.dataset.full;
    };

    var show = function (i) {
      idx = (i + items.length) % items.length;
      var b = items[idx];
      var img = doc.createElement("img");
      img.src = b.dataset.full;
      img.alt = b.querySelector("img") ? b.querySelector("img").alt : "";
      img.width = b.dataset.w || "";
      img.height = b.dataset.h || "";
      stage.replaceChildren(img);
      count.textContent = idx + 1 + " / " + items.length;
      preload(idx + 1);
      preload(idx - 1);
    };

    var open = function (i) {
      lastFocus = doc.activeElement;
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      doc.body.style.overflow = "hidden";
      show(i);
      lb.querySelector(".lb__close").focus();
    };

    var close = function () {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      doc.body.style.overflow = "";
      stage.replaceChildren();
      if (lastFocus) lastFocus.focus();
    };

    items.forEach(function (b, i) {
      b.addEventListener("click", function () {
        open(i);
      });
    });

    lb.addEventListener("click", function (e) {
      var act = e.target.closest("[data-lb]");
      if (act) {
        var a = act.dataset.lb;
        if (a === "close") close();
        if (a === "prev") show(idx - 1);
        if (a === "next") show(idx + 1);
        return;
      }
      if (e.target === lb || e.target.classList.contains("lb__stage")) close();
    });

    doc.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(idx + 1);
      else if (e.key === "ArrowLeft") show(idx - 1);
    });

    // swipe
    var x0 = null;
    lb.addEventListener(
      "touchstart",
      function (e) {
        x0 = e.changedTouches[0].clientX;
      },
      { passive: true }
    );
    lb.addEventListener(
      "touchend",
      function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 45) show(dx < 0 ? idx + 1 : idx - 1);
        x0 = null;
      },
      { passive: true }
    );
  }

  /* ---------------- current year in footer ---------------- */
  var y = doc.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
