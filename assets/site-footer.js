/*
 * Single source-of-truth primary footer.
 *
 * Renders the dark footer above the regulatory strip. The standing top-level
 * links required by AFM RFI Q28 are defined once here.
 */
(function () {
  "use strict";

  function render() {
    return (
      '<div class="hg-container">' +
        '<div class="hg-footer__grid">' +
          '<div class="hg-footer__brand">' +
            '<img src="/assets/logo-white.svg" alt="Hillgate" />' +
            '<p class="hg-footer__tagline">Regulated payments, FX and settlement services for EEA institutional counterparties.</p>' +
            '<p class="hg-footer__entity">' +
              'Hillgate Finance B.V., a private company with limited liability incorporated in the Netherlands. ' +
              'Registered office in Amsterdam. KvK [TODO: number].' +
            '</p>' +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Products</h4>" +
            "<ul>" +
              '<li><a href="/products/third-party-payments/">Third-Party Payments</a></li>' +
              '<li><a href="/products/fx-trading/">FX Trading</a></li>' +
              '<li><a href="/products/instant-settlement/">Instant Settlement Network</a></li>' +
              '<li><a href="/access/">How it works</a></li>' +
            "</ul>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Legal and disclosures</h4>" +
            "<ul>" +
              '<li><a href="/legal/licences/">Licences</a></li>' +
              '<li><a href="/legal/fees/">Fees</a></li>' +
              '<li><a href="/legal/risk-disclosure/">Risk disclosure</a></li>' +
              '<li><a href="/legal/conflicts-of-interest/">Conflicts of interest</a></li>' +
              '<li><a href="/legal/complaints/">Complaints</a></li>' +
              '<li><a href="/legal/environmental-disclosures/">Environmental disclosures</a></li>' +
              '<li><a href="/legal/marketing-communications-policy/">Marketing communications</a></li>' +
              '<li><a href="/legal/disclosures/">Disclosures overview</a></li>' +
            "</ul>" +
          "</div>" +

          '<div class="hg-footer__col">' +
            "<h4>Company</h4>" +
            "<ul>" +
              '<li><a href="/about/">About</a></li>' +
              '<li><a href="/contact/">Contact</a></li>' +
              '<li><a href="/legal/terms/">Terms of service</a></li>' +
              '<li><a href="/legal/privacy/">Privacy notice</a></li>' +
              '<li><a href="/legal/cookies/">Cookie settings</a></li>' +
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
