/*
 * AFM RFI highlight mode.
 *
 * Adds a floating toggle that outlines every element marked with data-rfi="Q16",
 * data-rfi="Q27" or data-rfi="Q28", and stamps each with a corner badge. Used
 * to walk an AFM reviewer through the parts of the public site that respond to
 * each RFI question. State persists in localStorage.
 */
(function () {
  "use strict";

  var KEY = "hg-rfi-mode";

  function setMode(on) {
    if (on) {
      document.documentElement.setAttribute("data-rfi-mode", "on");
    } else {
      document.documentElement.removeAttribute("data-rfi-mode");
    }
    try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
    var btn = document.querySelector(".hg-rfi-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.querySelector(".hg-rfi-toggle__label").textContent =
        on ? "Hide AFM RFI answers" : "Highlight AFM RFI answers";
    }
  }

  function init() {
    var initial = "0";
    try { initial = localStorage.getItem(KEY) || "0"; } catch (e) {}

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hg-rfi-toggle";
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML =
      '<span class="hg-rfi-toggle__dot" aria-hidden="true"></span>' +
      '<span class="hg-rfi-toggle__label">Highlight AFM RFI answers</span>';
    btn.addEventListener("click", function () {
      var on = document.documentElement.getAttribute("data-rfi-mode") === "on";
      setMode(!on);
    });
    document.body.appendChild(btn);

    setMode(initial === "1");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
