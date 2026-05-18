# Hillgate public website (www.hillgate.com)

Static HTML/CSS mockup of the Hillgate Finance B.V. public marketing site. Built to respond to
AFM MiCAR RFI questions 16, 27 and 28. Not a production site.

- Plain HTML5 and CSS3, no framework.
- One shared `styles.css` with CSS custom properties for the design tokens.
- Directory-per-route layout: every route resolves to an `index.html` so URLs match the structure
  used in the AFM submission (`/products/third-party-payments/`, `/legal/licences/`, etc.).
- Three small JS injectors carry the shared chrome: top navigation, primary footer, and the
  regulatory footer strip. Each is a single source of truth.
- Mobile responsive at a single 768px breakpoint.

## Run locally

The site uses relative paths, so it works two ways:

1. **Open the file directly.** Unzip the folder and double-click `index.html`. The browser
   opens the page over `file://` and every link, asset and script resolves through relative
   paths.
2. **Serve it.** From the repository root, run `python3 -m http.server 8000` (or `npx serve .`),
   then open `http://localhost:8000`. The routes match the production URL structure.

Each page declares its depth via `<meta name="hg-base" content="../../" />`. The nav and footer
JS injectors read that meta value to build the right relative link to every other page,
regardless of how deep the current page is.

## Routes

| Route | File |
|---|---|
| `/` | `index.html` |
| `/products/third-party-payments` | `products/third-party-payments/index.html` |
| `/products/exchange` | `products/exchange/index.html` |
| `/products/instant-settlement` | `products/instant-settlement/index.html` |
| `/access` | `access/index.html` |
| `/about` | `about/index.html` |
| `/contact` | `contact/index.html` (Request access) |
| `/legal/licences` | `legal/licences/index.html` |
| `/legal/micar` | `legal/micar/index.html` |
| `/legal/risk-disclosure` | `legal/risk-disclosure/index.html` |
| `/legal/conflicts-of-interest` | `legal/conflicts-of-interest/index.html` |
| `/legal/complaints` | `legal/complaints/index.html` |
| `/legal/marketing-communications-policy` | `legal/marketing-communications-policy/index.html` |
| `/legal/terms` | `legal/terms/index.html` |
| `/legal/privacy` | `legal/privacy/index.html` |
| `/legal/cookies` | `legal/cookies/index.html` |
| `/legal/pdfs/*` | MiCAR policy and disclosure PDFs (placeholders pending Erik) |

## AFM RFI highlight mode

The site reads as a regular institutional marketing site by default. Marketing-flavour
sections (hero ledes, benefit cards, stats strip, persona blocks) use lorem-ipsum placeholder
copy. The blocks that actually respond to AFM RFI Q16, Q27 and Q28 are tagged with
`data-rfi="Q16"` (or Q27 / Q28) and a human-readable `data-rfi-label`.

A floating "Highlight AFM RFI answers" button (bottom-right of every page) outlines those
blocks in amber and stamps each with a corner badge. Toggle it on while walking an AFM
reviewer through the site. State persists in localStorage across pages.

The toggle is implemented in `assets/rfi-highlight.js` and styled by the `.hg-rfi-toggle`
and `html[data-rfi-mode="on"] [data-rfi]` rules in `styles.css`.

## Shared chrome: single source of truth

Three JS modules in `assets/`:

- `assets/site-nav.js`: injects the sticky top navigation and wires the dropdown plus mobile-menu
  handlers. Every page contains `<div data-site-nav></div>` near the top of `<body>`.
- `assets/site-footer.js`: injects the primary navy footer with the standing top-level link set
  required by AFM RFI Q28 (Licences, Fees, Risk disclosure, Conflicts of interest, Complaints,
  Environmental disclosures, Terms of service, Privacy notice, Cookie settings). Every page
  contains `<div data-site-footer></div>`.
- `assets/regulatory-footer.js`: injects the persistent regulatory strip. Wording lives in this
  file and only in this file. Every page contains `<div data-regulatory-footer></div>`,
  positioned immediately above the primary footer in the markup.

Editing the regulatory wording: open `assets/regulatory-footer.js`, edit the `BODY` and
`SUPERVISORS` constants, save. The change propagates to every page on the next request.

The page template, used by every HTML file under this tree:

```html
<!doctype html>
<html lang="en">
<head> ... </head>
<body>
  <div data-site-nav></div>

  <main> ... </main>

  <div data-regulatory-footer></div>
  <div data-site-footer></div>

  <script src="/assets/site-nav.js"></script>
  <script src="/assets/site-footer.js"></script>
  <script src="/assets/regulatory-footer.js"></script>
</body>
</html>
```

## Design tokens

CSS custom properties on `:root` in `styles.css`:

- Brand: `--hg-navy`, `--hg-navy-hover`, `--hg-ink`, `--hg-muted`
- Surfaces: `--hg-bg`, `--hg-surface`, `--hg-border`
- Status: `--hg-success`, `--hg-warning`, `--hg-info`, `--hg-danger`
- Radii: `--hg-radius-sm` (6), `--hg-radius-md` (10), `--hg-radius-lg` (16)
- Spacing: `--hg-s-1` through `--hg-s-9`
- Type: `--hg-font` (Inter with system fallbacks)

## Reusable component classes

- `.hg-button-primary`, `.hg-button-ghost`
- `.hg-card`, `.hg-panel`
- `.hg-pill`, `.hg-pill--active`, `.hg-pill--pending`, `.hg-pill--inactive` (regulatory status)
- `.hg-tag-success`, `.hg-tag-warning`, `.hg-tag-info`, `.hg-tag-danger`
- `.hg-regime-banner` (standing regime banner at the top of every product page)
- `.hg-regulatory-strip` (single-source-of-truth regulatory footer)
- `.hg-matrix` (channel matrix used on `/access`)
- `.hg-choice` (side-by-side comparison cards used on `/access`)
- `.hg-callout`, `.hg-callout--warning`
- `.hg-deflist` (definition list used on legal pages)
- `.hg-standing-summary` (top-of-page summary block on legal and access pages)
- `.hg-prose` (long-form text wrapper, 65ch max-width)

## Editorial rules in force

- No em dashes anywhere. Replaced with commas, colons, periods, parentheses or sentence breaks.
- No AI-toned filler ("seamless", "robust", "leverage", "empower", "unlock", etc).
- Hillgate is not re-introduced in every section. Once the page header has set the context, body
  copy uses unattributed sentences or "the firm".
- Plain declarative sentences. Institutional B2B tone.
- British English (authorisation, organisation, programme).
- No retail framing. The CTA is "Request institutional access" and onboarding is mediated.

## Regulatory framing

- The canonical licence statement is rendered in the site footer on every page:
  "Hillgate Finance B.V. offers electronic money services to its clients subject to a licence
  granted by De Nederlandsche Bank (R200389) and offers crypto-asset services subject to its
  licence granted by Stichting Autoriteit Financiële Markten (rxxxxx)."
- The wording lives in `assets/site-footer.js`. Update it there to propagate site-wide.
- The MiCAR register reference is `rxxxxx` until the AFM assigns the entry. Do not state a
  specific MiCAR register number until it is issued.
- The DNB EMI register reference is `R200389` (real, stable).
- The Stichting Hillgate Finance / Deutsche Bank safeguarding arrangement is named on the
  Licences page.

## Documents

- `docs/afm-rfi-site-audit.md`: audit of the public site against the Q16 / Q27 / Q28 requirements.
- `docs/afm-rfi-appendix.md`: skeleton of the private appendix that accompanies the AFM response,
  covering web-app and API flows with screenshot insertion points.

## TODOs

Real content gaps to close before launch. Grep the source for `TODO`:

```bash
grep -rn "TODO" --include="*.html" --include="*.md" --include="*.js" .
```

Categories:

- MiCAR register number: replace the agreed `rxxxxx` placeholder once the AFM assigns the entry.
- MiCAR policy and disclosure PDFs in `legal/pdfs/`: replace the placeholder PDFs with the final
  documents prepared by Erik.
- Crypto-asset exchange fee structure on the MiCAR page: the proposed commercial margin tiers
  are placeholders pending confirmation with Taher.
- Leadership placeholder names on `/about/`.
- "Last updated" dates on the legal pages where one is needed.
- Cookie inventory on `/legal/cookies/`.
- Complaints page response timeline values, gated on the response to RFI Q70.

## What is intentionally out of scope

- Cookie banner. None is shown because no non-essential cookies are set. A banner is added at the
  point any non-essential cookie is introduced.
- Live chat widget.
- Self-service registration. The CTA is "Request institutional access" and routes to the contact
  form.
- The authenticated application. This repository is the public site only.
- Multilingual support.
- JavaScript beyond the three shared-chrome injectors.
