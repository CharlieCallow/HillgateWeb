/*
 * Single source-of-truth regulatory footer.
 *
 * Every public page renders this strip immediately above the primary footer.
 * To update the wording, edit this file. The change propagates to every page
 * on the next load.
 *
 * The canonical licence statement lives in assets/site-footer.js (rendered as
 * the entity statement in the primary footer). This strip carries only the
 * brief risk line that institutional counterparties should see on every page.
 */
(function () {
  "use strict";

  var BODY =
    "Risk Disclosure. The value of crypto-assets can fall as well as rise and may be highly volatile. " +
    "Counterparties may lose some or all of the funds committed to a position. " +
    "Read the full Risk Disclosure before transacting.";

  function render() {
    return (
      '<aside class="hg-regulatory-strip" role="region" aria-label="Risk Disclosure">' +
        '<div class="hg-container hg-regulatory-strip__inner">' +
          '<p class="hg-regulatory-strip__body">' + BODY + "</p>" +
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
