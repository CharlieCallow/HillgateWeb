(function () {
  "use strict";

  function closeAllDropdowns(except) {
    document.querySelectorAll(".hg-nav__link[aria-haspopup]").forEach(function (trigger) {
      if (trigger === except) return;
      trigger.setAttribute("aria-expanded", "false");
      var menuId = trigger.getAttribute("aria-controls");
      if (!menuId) return;
      var menu = document.getElementById(menuId);
      if (menu) menu.setAttribute("data-open", "false");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var triggers = document.querySelectorAll(".hg-nav__link[aria-haspopup]");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        closeAllDropdowns(trigger);
        trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        var menuId = trigger.getAttribute("aria-controls");
        if (!menuId) return;
        var menu = document.getElementById(menuId);
        if (menu) menu.setAttribute("data-open", expanded ? "false" : "true");
      });
    });

    document.addEventListener("click", function (event) {
      var inside = event.target.closest && event.target.closest(".hg-nav__item");
      if (!inside) closeAllDropdowns(null);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAllDropdowns(null);
    });

    var toggle = document.querySelector(".hg-nav__toggle");
    var links = document.querySelector(".hg-nav__links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.getAttribute("data-open") === "true";
        links.setAttribute("data-open", open ? "false" : "true");
        toggle.setAttribute("aria-expanded", open ? "false" : "true");
      });
    }
  });
})();
