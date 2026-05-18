/*
 * Single source-of-truth primary footer.
 *
 * Each page declares its depth with <meta name="hg-base" content="../../" />
 * so the injected links resolve correctly whether the site is opened from a
 * web server or from the local filesystem (file://).
 *
 * The canonical licence statement is rendered here so it appears on every
 * page. Keep the wording consistent with the version that is filed with the
 * supervisors.
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

  var LICENCE_STATEMENT =
    "Hillgate Finance B.V. offers electronic money services to its clients subject to a licence " +
    "granted by De Nederlandsche Bank (R200389) and offers crypto-asset services subject to its " +
    "licence granted by Stichting Autoriteit Financiële Markten (rxxxxx).";

  function render() {
    return (
      '<div class="hg-container">' +
        '<div class="hg-footer__licence">' +
          '<p>' + LICENCE_STATEMENT + '</p>' +
        '</div>' +

        '<div class="hg-footer__grid">' +
          '<div class="hg-footer__brand">' +
            '<img src="' + url("assets/logo-white.svg") + '" alt="Hillgate" />' +
            '<p class="hg-footer__tagline">Regulated payments, currency exchange and settlement for institutional counterparties in the EEA.</p>' +
            '<p class="hg-footer__entity">' +
              'Hillgate Finance B.V., a private company with limited liability incorporated in the ' +
              'Netherlands. Registered office in Amsterdam.' +
            "</p>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Products</h4>" +
            "<ul>" +
              '<li><a href="' + url("products/third-party-payments/index.html") + '">Third-Party Payments</a></li>' +
              '<li><a href="' + url("products/exchange/index.html") + '">Currency and crypto-asset exchange</a></li>' +
              '<li><a href="' + url("products/instant-settlement/index.html") + '">Instant Settlement Network</a></li>' +
              '<li><a href="' + url("access/index.html") + '">How clients access Hillgate</a></li>' +
            "</ul>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Legal</h4>" +
            "<ul>" +
              '<li><a href="' + url("legal/licences/index.html") + '">Licences</a></li>' +
              '<li><a href="' + url("legal/micar/index.html") + '">MiCAR</a></li>' +
              '<li><a href="' + url("legal/risk-disclosure/index.html") + '">Risk Disclosure</a></li>' +
              '<li><a href="' + url("legal/conflicts-of-interest/index.html") + '">Conflicts of interest</a></li>' +
              '<li><a href="' + url("legal/complaints/index.html") + '">Complaints</a></li>' +
              '<li><a href="' + url("legal/marketing-communications-policy/index.html") + '">Marketing communications</a></li>' +
            "</ul>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Company</h4>" +
            "<ul>" +
              '<li><a href="' + url("about/index.html") + '">About</a></li>' +
              '<li><a href="' + url("contact/index.html") + '">Get in contact</a></li>' +
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
