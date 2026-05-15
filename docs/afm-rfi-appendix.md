# AFM MiCAR RFI private appendix

Companion document to the public website. Holds the step-by-step screen flows and API endpoint
sequences that respond to RFI Q27 but do not belong on the public site. Hand over with the formal
response.

## Status

Skeleton. Each section lists the screens, dialog steps or endpoint sequences involved so the
mock-ups, screenshots and request/response examples can be inserted before submission.

## Conventions

- Screen labels use the navigation breadcrumb visible in the production web app, prefixed with
  "Web app".
- API endpoints use the path under `api.hillgate.com/v1`. Authentication, idempotency and
  pagination patterns are described once in the API onboarding section and referenced from each
  flow.
- Each flow lists prerequisites, the actor's path, the regulator-relevant control points and the
  evidence trail produced for that flow.

---

## 1. Web app onboarding flow

How a prospective institutional counterparty progresses from the public enquiry form to a usable
web-app account. Mediated. No self-service registration.

Insertion points:

- [ ] Screenshot: public enquiry form (already exists at `/contact/`, capture for reference).
- [ ] Screen: onboarding-team triage view (internal).
- [ ] Screen: KYC questionnaire (1 of n) capturing identification of the legal entity.
- [ ] Screen: ultimate-beneficial-owner declaration.
- [ ] Screen: source-of-funds questionnaire.
- [ ] Screen: product-by-product appropriateness assessment.
- [ ] Screen: account agreement review and signature step.
- [ ] Screen: first-login activation (separate flow described below).
- [ ] Decision matrix: KYC outcome (approve, request more information, decline) and the trigger
      for each.
- [ ] Evidence trail: list of documents archived, retention period, who can read them.

## 2. Web app first-login activation

How an onboarded user receives credentials and completes first login.

- [ ] Out-of-band initial credential issuance.
- [ ] Screen: first-login password reset.
- [ ] Screen: 2FA enrolment.
- [ ] Screen: role assignment confirmation by the entity's admin.

## 3. Web app trading flow (FX Trading)

- [ ] Prerequisite: account holds sufficient balance in the source currency.
- [ ] Screen: FX Trading landing.
- [ ] Screen: pair selector and amount input.
- [ ] Screen: quote presented (reference rate, spread, fee, expiry).
- [ ] Screen: confirm and execute.
- [ ] Screen: execution report.
- [ ] Evidence trail: timestamped quote-acceptance log, execution record, journal entry.

## 4. Web app transfer flow (Third-Party Payments)

- [ ] Prerequisite: beneficiary has been trusted (see custody and beneficiary-trusting flow).
- [ ] Screen: Payments landing.
- [ ] Screen: beneficiary picker.
- [ ] Screen: payment details, reference, value date.
- [ ] Screen: 2FA challenge if amount exceeds the role's limit.
- [ ] Screen: payment confirmation.
- [ ] Evidence trail: instruction, scheme outbound message, settlement event.

## 5. Web app beneficiary trusting workflow

The web-app-only workflow that gates API payment instructions.

- [ ] Screen: add beneficiary.
- [ ] Screen: travel-rule fields for crypto beneficiaries (once available).
- [ ] Screen: name-screening result presentation.
- [ ] Screen: dual-approval prompt for the entity's second authoriser.
- [ ] Evidence trail: beneficiary record, approver identities, screening outputs.

## 6. Web app custody flow (available following MiCAR authorisation)

- [ ] Screen: custody landing (placeholder until authorisation).
- [ ] Screen: deposit address generation.
- [ ] Screen: travel-rule capture for inbound transfers.
- [ ] Screen: withdrawal request to a trusted external address.
- [ ] Evidence trail: wallet ledger, key-management audit log, segregation attestation.

## 7. API onboarding (none, by design)

There is no API path to onboarding. The API has no public, pre-onboarding endpoints. API keys
are issued only after web-app onboarding is complete and a key is requested from inside the web
application.

- [ ] Statement: the API authentication root rejects all calls without a key issued through the
      web application.
- [ ] Screenshot: the web-app screen on which an admin requests and downloads an API key.
- [ ] Evidence trail: key issuance event, key fingerprint stored, last-used timestamp.

## 8. API trading flow (FX Trading)

- [ ] Endpoint: `POST /quotes` (request a quote).
- [ ] Endpoint: `POST /trades` (accept a quote, executes).
- [ ] Endpoint: `GET /trades/{id}` (retrieve execution).
- [ ] Worked example: request and response payloads for a representative pair.
- [ ] Error cases: expired quote, insufficient balance, exceeded role limit.

## 9. API transfer flow (Third-Party Payments)

- [ ] Endpoint: `POST /payments` (instruct a payment to a previously trusted beneficiary).
- [ ] Endpoint: `GET /payments/{id}` (retrieve status).
- [ ] Endpoint: `POST /payments/{id}:cancel` (cancel where the scheme permits).
- [ ] Worked example: request and response payloads for a representative SEPA and SWIFT payment.
- [ ] Error cases: untrusted beneficiary (rejected at the API), failed name-matching, scheme
      cut-off.

## 10. API transaction history retrieval

- [ ] Endpoint: `GET /transactions` (paginated, filterable by product, date, status).
- [ ] Endpoint: `GET /statements/{period}` (download a regulated statement format).
- [ ] Endpoint: `GET /reconciliations` (CAMT.053 export and CSV equivalents).
- [ ] Worked example: pagination, idempotency tokens.

## 11. Cross-cutting controls (referenced by each flow above)

- [ ] Role-based access matrix for the web app.
- [ ] API scope and rate-limit matrix.
- [ ] Authentication and session lifetimes.
- [ ] Transaction monitoring rules engaged during each flow.
- [ ] Sanctions and PEP screening checkpoints.
- [ ] Travel-rule data capture (for crypto-asset flows, once authorised).
- [ ] Logging, audit trail and statement of retention.
