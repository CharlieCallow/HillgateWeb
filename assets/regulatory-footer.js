/*
 * Single source-of-truth regulatory footer.
 *
 * Every public page renders this strip immediately above the primary footer.
 * To update the wording or the supervisor addresses, edit this file. The change
 * propagates to every page on the next load.
 */
(function () {
  "use strict";

  var BODY =
    "Crypto-assets are unregulated in many jurisdictions and their value can fall as well as rise. " +
    "You may lose some or all of the funds you commit. " +
    "Hillgate Finance B.V. is an electronic money institution authorised by De Nederlandsche Bank " +
    "(register WFTEG R200389). Hillgate's application for authorisation as a crypto-asset service " +
    "provider under MiCAR is under assessment by the Autoriteit Financiële Markten. " +
    "Crypto-asset services will commence following authorisation.";

  var SUPERVISORS =
    "De Nederlandsche Bank, Spaklerweg 4, 1096 BA Amsterdam. " +
    "Autoriteit Financiële Markten, Vijzelgracht 50, 1017 HS Amsterdam.";

  function render() {
    return (
      '<aside class="hg-regulatory-strip" role="region" aria-label="Regulatory notice">' +
        '<div class="hg-container hg-regulatory-strip__inner">' +
          '<p class="hg-regulatory-strip__body">' + BODY + "</p>" +
          '<p class="hg-regulatory-strip__supervisors">' + SUPERVISORS + "</p>" +
        "</div>" +
      "</aside>"
    );
  }

  function inject() {
    var hosts = document.querySelectorAll("[data-regulatory-footer]");
    for (var i = 0; i < hosts.length; i++) {
      if (hosts[i].getAttribute("data-injected") === "true") continue;
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
