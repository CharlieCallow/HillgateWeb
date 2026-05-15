# AFM MiCAR RFI site audit (Q16, Q27, Q28)

Status of the public website against the routes required to respond to AFM RFI questions 16, 27 and 28.

## Q16: routes required vs. routes present

| Required route | Status before refinement | Action |
|---|---|---|
| `/` | Present as `index.html`. Re-introduces Hillgate in every section. CTA says "Open account", which is wrong for mediated institutional onboarding. Mentions "professional clients" without confining to EEA institutional. | Rewrite. Single hero sentence, three product tiles for the new product names, regulated trust strip, "Request institutional access" CTA. |
| `/products/third-party-payments` | Closest current page: `services-payments.html`. Names "Payments" not "Third-Party Payments". Service description is generic. No standing regime banner at top. | Move and rewrite to the new product name. Add standing regime banner at the top of the page. |
| `/products/fx-trading` | Closest current page: `services-convert.html` (Convert). Mixes FX and crypto execution. Has a regulatory basis panel at the bottom, not at the top. | Move and rewrite focused on FX trading. Add standing regime banner at the top. |
| `/products/instant-settlement` | Not present. `services-crypto.html` covers crypto custody/transfer/execution generically and implies the service is live. | Create new page. Frame as institutional settlement network across fiat (EMI) and crypto (MiCAR upon authorisation). State that crypto-leg configurations commence following AFM authorisation. |
| `/legal/licences` | Closest current page: `disclosures-regulatory.html`. Has the right content shape but the wording does not match the required exact phrasing for the EMI authorisation. Implies CASP authorisation is in place. Does not mention the Stichting Hillgate Finance / Deutsche Bank safeguarding arrangement. | Move and rewrite. Use the exact EMI wording. Replace any "authorised as CASP" claim with the "application under assessment" wording. Add safeguarding paragraph. |
| `/legal/disclosures` | Closest current page: `disclosures.html` (hub). Is a tile grid pointing to sub-pages, not a Kraken-style jurisdictional block layout. | Move and rewrite. Use jurisdiction-specific H2 blocks. Include risk warning, conflicts of interest summary, complaints handling pointer, environmental disclosures pointer. |
| `/legal/fees` | Closest current page: `disclosures-fees.html`. Content is broadly correct. Need to verify it appears in the primary footer of every page. | Move and edit lightly. Link from the new primary footer on every page. |
| `/legal/risk-disclosure` | Closest current page: `disclosures-risks.html`. Body is fine; routing and footer link are the change. | Move and edit lightly. Link from the new primary footer on every page. |
| `/legal/environmental-disclosures` | Closest current page: `disclosures-esg.html`. Body needs a clearer pointer to per-asset disclosures and an explanation that per-asset disclosures appear on each crypto-asset detail page once services commence. | Move and rewrite. Add a placeholder per-asset disclosure template. |
| `/legal/complaints` | Closest current page: `disclosures-complaints.html`. Carries the right caveat (TODO: pending Q70) but uses retail-oriented Kifid framing. | Move and edit. Note that Hillgate clients are institutional and Kifid is generally retail-only. Keep the supervisor escalation path. |
| `/legal/conflicts-of-interest` | Closest current page: `disclosures-conflicts.html`. | Move and edit lightly. |
| `/legal/marketing-communications-policy` | Not present. | Create. Plain-English summary of the internal policy. |
| `/legal/terms`, `/legal/privacy`, `/legal/cookies` | Present as anchors on `legal.html`. | Split into three separate routes under `/legal/`. |
| `/access` (or `/how-it-works`) | Not present. | Create. Cover web-app vs API split, mediated onboarding gating, choice environment per Q27(d). |
| `/about` | Present as `about.html`. Currently focuses on retail-style "Who we are" with placeholder leadership cards. | Move to `/about/`. Lightly edit, no critical changes for the RFI scope. |
| `/contact` | Present as `contact.html`. | Move to `/contact/`. Reframe as the institutional onboarding enquiry channel. |

## Q27: web-app vs. API access

| Required element | Status | Action |
|---|---|---|
| Public `/access` (or `/how-it-works`) page covering web-app and API channels | Absent | Create. |
| Per-service channel matrix (web-app supported, API supported) | Absent | Add to `/access`. |
| Choice environment section (clear, fair, not misleading; what each option includes / excludes; pointer to fee schedule and risk disclosure pre-commit) | Absent | Add to `/access`. |
| Statement that account functionality is gated on completed onboarding | Absent | Add to `/access` and to the head of `/legal/licences`. |
| Private appendix: step-by-step screens and endpoint flows for the AFM | Absent | Create `docs/afm-rfi-appendix.md` with section placeholders. |

## Q28: marketing, risk warning, fees, environmental disclosure

| Required element | Status before refinement | Action |
|---|---|---|
| Persistent footer strip on every page with the exact wording in the brief | Absent. Current footer carries a long-form dual-licence statement that already implies CASP authorisation, which is incorrect. | Build a single-source-of-truth regulatory footer component. Wire into the global layout. Remove inline duplicates. |
| Primary footer top-level links: Licences, Fees, Risk disclosure, Conflicts of interest, Complaints, Environmental disclosures, Terms of service, Privacy notice, Cookie settings | Partial. Current footer has Disclosures sub-links but the labels and order do not match Q28. | Update primary footer to the Q28 list, in order, on every page. |
| Marketing communications policy page | Absent | Create `/legal/marketing-communications-policy`. |

## Editorial rule audit

| Rule | Findings before refinement |
|---|---|
| No em dashes | 39 instances across `index.html`, `about.html`, `contact.html`, `legal.html`, `services-*.html`, `disclosures-*.html` and `README.md`. Mostly in `<title>` tags, the logo `aria-label`, the footer tagline and a few body sentences. |
| No AI filler phrases | No matches for the cited examples. Pass. |
| Do not re-introduce Hillgate in every section | Several sections in the current product pages open with "Hillgate offers" or "Hillgate maintains". Address during rewrites. |
| British English | Spelling is already British (authorisation, organisation, programme). Pass. |
| No retail framing | The homepage CTA reads "Open account" and the contact page mentions "consumer or retail clients" which is the right direction. Replace "Open account" with "Request institutional access". Remove any "professional clients" framing that is broader than EEA institutional. |

## Plan

1. Write the source-of-truth regulatory footer (`assets/regulatory-footer.js`) plus matching CSS.
2. Move shared nav and primary footer into JS injectors so the Q28 link set lives in one place and propagates.
3. Restructure routes into `products/`, `legal/`, `access/`, `about/`, `contact/` directories with `index.html` per route.
4. Rewrite copy under the editorial rules. Replace the EMI / CASP wording with the brief's exact text.
5. Create the new pages: products, licences, access, marketing communications policy, environmental disclosures with the per-asset template.
6. Create `docs/afm-rfi-appendix.md` with the section placeholders.
7. Sweep for em dashes and remaining inline regulatory wording.
8. Update `README.md` to reflect the new structure and the source-of-truth pattern.
