/*
 * Single source-of-truth primary footer.
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

  function render() {
    return (
      '<div class="hg-container">' +
        '<div class="hg-footer__grid">' +
          '<div class="hg-footer__brand">' +
            '<img src="' + url("assets/logo-white.svg") + '" alt="Hillgate" />' +
            '<p class="hg-footer__tagline">Regulated payments, FX and settlement services for EEA institutional counterparties.</p>' +
            '<p class="hg-footer__entity">' +
              'Hillgate Finance B.V., a private company with limited liability incorporated in the Netherlands. ' +
              'Registered office in Amsterdam. KvK [TODO: number].' +
            "</p>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Products</h4>" +
            "<ul>" +
              '<li><a href="' + url("products/third-party-payments/index.html") + '">Third-Party Payments</a></li>' +
              '<li><a href="' + url("products/fx-trading/index.html") + '">FX Trading</a></li>' +
              '<li><a href="' + url("products/instant-settlement/index.html") + '">Instant Settlement Network</a></li>' +
              '<li><a href="' + url("access/index.html") + '">How it works</a></li>' +
            "</ul>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Legal and disclosures</h4>" +
            "<ul>" +
              '<li><a href="' + url("legal/licences/index.html") + '">Licences</a></li>' +
              '<li><a href="' + url("legal/fees/index.html") + '">Fees</a></li>' +
              '<li><a href="' + url("legal/risk-disclosure/index.html") + '">Risk disclosure</a></li>' +
              '<li><a href="' + url("legal/conflicts-of-interest/index.html") + '">Conflicts of interest</a></li>' +
              '<li><a href="' + url("legal/complaints/index.html") + '">Complaints</a></li>' +
              '<li><a href="' + url("legal/environmental-disclosures/index.html") + '">Environmental disclosures</a></li>' +
              '<li><a href="' + url("legal/marketing-communications-policy/index.html") + '">Marketing communications</a></li>' +
              '<li><a href="' + url("legal/disclosures/index.html") + '">Disclosures overview</a></li>' +
            "</ul>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Company</h4>" +
            "<ul>" +
              '<li><a href="' + url("about/index.html") + '">About</a></li>' +
              '<li><a href="' + url("contact/index.html") + '">Contact</a></li>' +
              '<li><a href="' + url("legal/terms/index.html") + '">Terms of service</a></li>' +
              '<li><a href="' + url("legal/privacy/index.html") + '">Privacy notice</a></li>' +
              '<li><a href="' + url("legal/cookies/index.html") + '">Cookie settings</a></li>' +
            "</ul>" +
          "</div>" +
        "</div>" +

        '<div class="hg-footer__bottom">' +
          "<span>&copy; 2026 Hillgate Finance B.V. All rights reserved.</span>" +
          '<span class="hg-footer__bottom-meta">www.hillgate.com</span>' +
        "</div>" +
      "</div>"
    );
  }

  function inject() {
    var hosts = document.querySelectorAll("[data-site-footer]");
    for (var i = 0; i < hosts.length; i++) {
      if (hosts[i].getAttribute("data-injected") === "true") continue;
      hosts[i].className = "hg-footer";
      hosts[i].setAttribute("role", "contentinfo");
      hosts[i].innerHTML = render();
      hosts[i].setAttribute("data-injected", "true");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
