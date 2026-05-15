/*
 * Single source-of-truth top navigation.
 *
 * Renders the sticky nav on every page and wires the dropdown / mobile menu
 * handlers against the injected markup. To change the set of links visible in
 * the header, edit this file.
 */
(function () {
  "use strict";

  function caret() {
    return (
      '<svg class="hg-nav__caret" viewBox="0 0 10 10" aria-hidden="true">' +
        '<path d="M2 4l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>"
    );
  }

  function render() {
    return (
      '<div class="hg-nav__inner">' +
        '<a href="/" class="hg-nav__logo" aria-label="Hillgate, home"><img src="/assets/logo.svg" alt="Hillgate" /></a>' +

        '<button class="hg-nav__toggle" aria-expanded="false" aria-controls="hg-nav-links" aria-label="Open menu"><span aria-hidden="true"></span></button>' +

        '<ul class="hg-nav__links" id="hg-nav-links" data-open="false">' +
          '<li class="hg-nav__item">' +
            '<button class="hg-nav__link" aria-haspopup="true" aria-expanded="false" aria-controls="hg-nav-products">Products' + caret() + "</button>" +
            '<ul class="hg-nav__dropdown" id="hg-nav-products" data-open="false">' +
              '<li><a href="/products/third-party-payments/">Third-Party Payments</a></li>' +
              '<li><a href="/products/fx-trading/">FX Trading</a></li>' +
              '<li><a href="/products/instant-settlement/">Instant Settlement Network</a></li>' +
            "</ul>" +
          "</li>" +
          '<li class="hg-nav__item"><a class="hg-nav__link" href="/access/">How it works</a></li>' +
          '<li class="hg-nav__item"><a class="hg-nav__link" href="/about/">About</a></li>' +
          '<li class="hg-nav__item">' +
            '<button class="hg-nav__link" aria-haspopup="true" aria-expanded="false" aria-controls="hg-nav-legal">Legal' + caret() + "</button>" +
            '<ul class="hg-nav__dropdown" id="hg-nav-legal" data-open="false">' +
              '<li><a href="/legal/licences/">Licences</a></li>' +
              '<li><a href="/legal/fees/">Fees</a></li>' +
              '<li><a href="/legal/risk-disclosure/">Risk disclosure</a></li>' +
              '<li><a href="/legal/conflicts-of-interest/">Conflicts of interest</a></li>' +
              '<li><a href="/legal/complaints/">Complaints</a></li>' +
              '<li><a href="/legal/environmental-disclosures/">Environmental disclosures</a></li>' +
              '<li><a href="/legal/marketing-communications-policy/">Marketing communications</a></li>' +
              '<li><a href="/legal/disclosures/">Disclosures overview</a></li>' +
            "</ul>" +
          "</li>" +
        "</ul>" +

        '<div class="hg-nav__cta">' +
          '<a class="hg-nav__login" href="/access/">Client log in</a>' +
          '<a class="hg-button-primary" href="/contact/">Request institutional access</a>' +
        "</div>" +
      "</div>"
    );
  }

  function closeAllDropdowns(except) {
    var triggers = document.querySelectorAll(".hg-nav__link[aria-haspopup]");
    for (var i = 0; i < triggers.length; i++) {
      var trigger = triggers[i];
      if (trigger === except) continue;
      trigger.setAttribute("aria-expanded", "false");
      var menuId = trigger.getAttribute("aria-controls");
      if (!menuId) continue;
      var menu = document.getElementById(menuId);
      if (menu) menu.setAttribute("data-open", "false");
    }
  }

  function wire() {
    var triggers = document.querySelectorAll(".hg-nav__link[aria-haspopup]");
    for (var i = 0; i < triggers.length; i++) {
      (function (trigger) {
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
      })(triggers[i]);
    }

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
  }

  function inject() {
    var hosts = document.querySelectorAll("[data-site-nav]");
    for (var i = 0; i < hosts.length; i++) {
      if (hosts[i].getAttribute("data-injected") === "true") continue;
      hosts[i].className = "hg-nav";
      hosts[i].setAttribute("role", "banner");
      hosts[i].innerHTML = render();
      hosts[i].setAttribute("data-injected", "true");
    }
    wire();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
