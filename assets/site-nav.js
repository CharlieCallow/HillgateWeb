/*
 * Single source-of-truth top navigation.
 *
 * Each page declares its depth with <meta name="hg-base" content="../../" />
 * so the injected links resolve correctly whether the site is opened from a
 * web server or from the local filesystem (file://).
 */
(function () {
  "use strict";

  var BASE = (function () {
    var m = document.querySelector('meta[name="hg-base"]');
    return m ? m.getAttribute("content") : "";
  })();

  function url(path) {
    return BASE + path;
  }

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
        '<a href="' + url("index.html") + '" class="hg-nav__logo" aria-label="Hillgate, home"><img src="' + url("assets/logo.svg") + '" alt="Hillgate" /></a>' +

        '<button class="hg-nav__toggle" aria-expanded="false" aria-controls="hg-nav-links" aria-label="Open menu"><span aria-hidden="true"></span></button>' +

        '<ul class="hg-nav__links" id="hg-nav-links" data-open="false">' +
          '<li class="hg-nav__item">' +
            '<button class="hg-nav__link" aria-haspopup="true" aria-expanded="false" aria-controls="hg-nav-products">Products' + caret() + "</button>" +
            '<ul class="hg-nav__dropdown" id="hg-nav-products" data-open="false">' +
              '<li><a href="' + url("products/third-party-payments/index.html") + '">Third-Party Payments</a></li>' +
              '<li><a href="' + url("products/fx-trading/index.html") + '">FX Trading</a></li>' +
              '<li><a href="' + url("products/instant-settlement/index.html") + '">Instant Settlement Network</a></li>' +
            "</ul>" +
          "</li>" +
          '<li class="hg-nav__item"><a class="hg-nav__link" href="' + url("access/index.html") + '">How it works</a></li>' +
          '<li class="hg-nav__item"><a class="hg-nav__link" href="' + url("about/index.html") + '">About</a></li>' +
          '<li class="hg-nav__item">' +
            '<button class="hg-nav__link" aria-haspopup="true" aria-expanded="false" aria-controls="hg-nav-legal">Legal' + caret() + "</button>" +
            '<ul class="hg-nav__dropdown" id="hg-nav-legal" data-open="false">' +
              '<li><a href="' + url("legal/licences/index.html") + '">Licences</a></li>' +
              '<li><a href="' + url("legal/fees/index.html") + '">Fees</a></li>' +
              '<li><a href="' + url("legal/risk-disclosure/index.html") + '">Risk disclosure</a></li>' +
              '<li><a href="' + url("legal/conflicts-of-interest/index.html") + '">Conflicts of interest</a></li>' +
              '<li><a href="' + url("legal/complaints/index.html") + '">Complaints</a></li>' +
              '<li><a href="' + url("legal/environmental-disclosures/index.html") + '">Environmental disclosures</a></li>' +
              '<li><a href="' + url("legal/marketing-communications-policy/index.html") + '">Marketing communications</a></li>' +
              '<li><a href="' + url("legal/disclosures/index.html") + '">Disclosures overview</a></li>' +
            "</ul>" +
          "</li>" +
        "</ul>" +

        '<div class="hg-nav__cta">' +
          '<a class="hg-nav__login" href="' + url("access/index.html") + '">Client log in</a>' +
          '<a class="hg-button-primary" href="' + url("contact/index.html") + '">Request institutional access</a>' +
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
