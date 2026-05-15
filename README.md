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
| `/products/fx-trading` | `products/fx-trading/index.html` |
| `/products/instant-settlement` | `products/instant-settlement/index.html` |
| `/access` | `access/index.html` |
| `/about` | `about/index.html` |
| `/contact` | `contact/index.html` |
| `/legal/licences` | `legal/licences/index.html` |
| `/legal/disclosures` | `legal/disclosures/index.html` |
| `/legal/fees` | `legal/fees/index.html` |
| `/legal/risk-disclosure` | `legal/risk-disclosure/index.html` |
| `/legal/conflicts-of-interest` | `legal/conflicts-of-interest/index.html` |
| `/legal/complaints` | `legal/complaints/index.html` |
| `/legal/environmental-disclosures` | `legal/environmental-disclosures/index.html` |
| `/legal/marketing-communications-policy` | `legal/marketing-communications-policy/index.html` |
| `/legal/terms` | `legal/terms/index.html` |
| `/legal/privacy` | `legal/privacy/index.html` |
| `/legal/cookies` | `legal/cookies/index.html` |

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

- The EMI authorisation is named with the exact wording: "Payment services are provided by Hillgate
  Finance B.V. under an electronic money institution authorisation issued by De Nederlandsche Bank
  under the Wet op het financieel toezicht, register entry WFTEG R200389."
- The MiCAR position is named with the exact wording: "Crypto-asset services (custody and
  administration, exchange, transfer services) are not yet provided. Hillgate has submitted an
  application for authorisation as a crypto-asset service provider under Regulation (EU)
  2023/1114 (MiCAR) to the Autoriteit Financiële Markten (AFM). Services will commence following
  authorisation."
- Until the MiCAR authorisation is granted, the regulatory footer uses the phrase "under
  assessment by the Autoriteit Financiële Markten" and nothing stronger.
- The Stichting Hillgate Finance / Deutsche Bank safeguarding arrangement is named on the
  Licences page.

## Documents

- `docs/afm-rfi-site-audit.md`: audit of the public site against the Q16 / Q27 / Q28 requirements.
- `docs/afm-rfi-appendix.md`: skeleton of the private appendix that accompanies the AFM response,
  covering web-app and API flows with screenshot insertion points.

## TODOs

Real content gaps to close before launch. Grep the source for `TODO`:

```bash
grep -rn "TODO" --include="*.html" --include="*.md" .
```

Categories:

- Legal entity placeholders on the Licences page (`[TODO: KvK number]`, registered address, LEI).
- Numeric fees on the Fees page (`[TODO]` and `€[TODO]`).
- Leadership placeholder names on `/about/`.
- "Last updated" dates on the legal pages.
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
