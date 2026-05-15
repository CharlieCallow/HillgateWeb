# Hillgate public website — mockup

Static HTML/CSS mockup of the Hillgate Finance B.V. public marketing site. This is the informational
site that sits in front of the authenticated platform; it is not a production site.

- Plain HTML5 and CSS3, no frameworks
- One shared `styles.css` with CSS custom properties for the design tokens
- One HTML file per route, flat directory
- Minimal `script.js` for nav dropdowns and the mobile menu only
- Mobile-responsive with a single breakpoint at 768px

## Run locally

Just open `index.html` in any modern browser:

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

If you prefer a local web server (recommended so that `<script src="script.js">` and relative paths
resolve identically to a hosted environment), any one of the following works:

```bash
# Python 3
python3 -m http.server 8000

# Node, with npx
npx serve .
```

Then visit `http://localhost:8000`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `services-payments.html` | Payments and e-money services (EMI) |
| `services-crypto.html` | Crypto-asset services (CASP) |
| `services-convert.html` | Conversion: FX and crypto execution |
| `about.html` | About Hillgate, leadership |
| `disclosures.html` | Disclosures hub |
| `disclosures-risks.html` | Risk disclosure |
| `disclosures-conflicts.html` | Conflicts of interest disclosure |
| `disclosures-esg.html` | ESG (MiCAR Articles 66(5) and 67(7)) |
| `disclosures-fees.html` | Fees and pricing schedule |
| `disclosures-regulatory.html` | Regulatory information, supervisors, ADR |
| `disclosures-complaints.html` | Complaints handling |
| `contact.html` | Contact details |
| `legal.html` | Terms, Privacy, Cookies |
| `styles.css` | All styles, design tokens, components |
| `script.js` | Nav dropdowns and mobile menu only |
| `assets/logo.svg` | Navy wordmark used in the nav |
| `assets/logo-white.svg` | White wordmark used in the footer |

## Design tokens

CSS custom properties on `:root` in `styles.css`:

- Brand: `--hg-navy`, `--hg-navy-hover`, `--hg-ink`, `--hg-muted`
- Surfaces: `--hg-bg`, `--hg-surface`, `--hg-border`
- Status: `--hg-success`, `--hg-warning`, `--hg-info`, `--hg-danger`
- Radii: `--hg-radius-sm` (6), `--hg-radius-md` (10), `--hg-radius-lg` (16)
- Spacing: `--hg-s-1` through `--hg-s-9`
- Type: `--hg-font` (Inter, with system fallbacks)

## Reusable component classes

- `.hg-button-primary`, `.hg-button-ghost`
- `.hg-card`, `.hg-panel`
- `.hg-tag-success`, `.hg-tag-warning`, `.hg-tag-info`, `.hg-tag-danger`
- `.hg-nav`, `.hg-footer`
- `.hg-prose`

## TODOs still requiring real content

Search the source for the literal string `TODO` (or `[TODO`) to find them in context.

### Regulatory placeholders

- `[TODO: AFM number]` — AFM CASP registration number, appears in:
  - `index.html` trust strip and footer
  - footer of every other page
  - `services-crypto.html` (regulatory basis panel)
  - `services-convert.html` (crypto leg)
  - `disclosures-regulatory.html`
  - `disclosures-fees.html`
- `[TODO: KvK number]`, `[TODO: LEI]`, `[TODO: address]` — legal entity details, in
  `disclosures-regulatory.html` and `contact.html`
- `[TODO: date]` — last-reviewed dates on the disclosures pages

### HTML comments to revisit post-authorisation

Every claim that Hillgate is currently authorised under MiCAR is annotated with
`<!-- TODO: confirm post-authorisation phrasing -->`. Grep for that comment:

```bash
grep -rn "confirm post-authorisation phrasing" .
```

Replace cautious "subject to authorisation" / "once authorised" wording with the
confirmed-authorisation phrasing once the AFM CASP licence is granted.

### Complaints page — pending Q70

The complaints page (`disclosures-complaints.html`) is marked `TODO: pending Q70 wording` in
several places. The final text on submission channels, response timelines and the ADR body is
gated on the RFI Q70 response.

### Fees schedule

All numeric fees in `disclosures-fees.html` are `[TODO]` placeholders. Real numbers come from
the commercial team and the account-agreement template.

### Leadership

Placeholder names, initials and bios in `about.html`. Replace with real names, roles and one-line
bios for the Management Board and Supervisory Board.

## What is intentionally out of scope

- No cookie banner (the privacy approach will land separately).
- No live chat widget.
- No sign-up form. CTAs link to a placeholder `/open-account` route — it will 404 in this mockup,
  which is expected.
- No copy of the authenticated platform.
- No multilingual support.
- No JavaScript beyond the small nav-dropdown / mobile-menu script.

## What good looks like (and why the structure is the way it is)

- Disclosures are reachable in one click from every page via the nav, and the bottom strip of the
  footer names the two licences directly so the regulatory framing is visible without scrolling on
  the disclosures sub-pages.
- Every service page names the licence under which it is offered, in its own panel, not buried in
  body text.
- No language anywhere implies Hillgate is currently authorised under MiCAR or that crypto services
  are live in a misleading way. The cautious wording is annotated for easy update post-authorisation.
- No returns claims, no comparative pricing claims, no "limited time" or "join thousands of users"
  marketing language.
