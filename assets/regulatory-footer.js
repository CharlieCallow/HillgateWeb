/*
 * Single source-of-truth regulatory strip.
 *
 * The strip is injected directly below the primary navigation and above
 * the page content, so the risk warning is the first thing a visitor sees
 * underneath the header. The strip and the navigation share a single
 * sticky wrapper so they stack cleanly without overlap and both remain
 * pinned to the viewport top while the page scrolls.
 *
 * To update the wording, edit this file. The change propagates to every
 * page on the next load.
 *
 * The canonical licence statement lives in assets/site-footer.js and is
 * rendered in the brand column of the primary footer.
 */
(function () {
  "use strict";

  var BODY =
    "Risk Disclosure. The value of crypto-assets can fall as well as rise and may be highly volatile. " +
    "Counterparties may lose some or all of the funds committed. " +
    "Read the full Risk Disclosure before transacting.";

  function buildStrip() {
    var strip = document.createElement("aside");
    strip.className = "hg-regulatory-strip";
    strip.setAttribute("role", "region");
    strip.setAttribute("aria-label", "Risk Disclosure");
    strip.innerHTML =
      '<div class="hg-container hg-regulatory-strip__inner">' +
        '<p class="hg-regulatory-strip__body">' + BODY + "</p>" +
      "</div>";
    return strip;
  }

  function inject() {
    var legacyHosts = document.querySelectorAll("[data-regulatory-footer]");
    for (var i = 0; i < legacyHosts.length; i++) {
      legacyHosts[i].parentNode.removeChild(legacyHosts[i]);
    }

    var nav = document.querySelector("[data-site-nav]");
    if (!nav) return;
    if (nav.parentNode && nav.parentNode.classList.contains("hg-top-stack")) return;

    var wrapper = document.createElement("header");
    wrapper.className = "hg-top-stack";

    nav.parentNode.insertBefore(wrapper, nav);
    wrapper.appendChild(nav);
    wrapper.appendChild(buildStrip());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
