# Personalized Gifting Website — Complete MVP Implementation Plan

## 1. Goal and definition of success

Build a production-oriented responsive React application for a premium personalized gifting studio. Anonymous customers can browse public content and submit a seven-step gift request without creating an account. Authorized staff can securely authenticate, manage requests and content, and inspect notification outcomes.

The implementation is complete when:

- Every public and admin route in the PRD exists, is linked, and has intentional loading, empty, success, and error states.
- A gift request is server-validated, saved to Supabase, assigned a unique reference, and only then shown as successful.
- Anonymous users cannot read or mutate private requests, messages, staff profiles, notes, histories, or notification logs.
- Admin and curator permissions are enforced by Supabase RLS/backend logic, not only by hidden React UI.
- Resend confirmation/admin emails are attempted after persistence and logged independently from request status.
- Manual WhatsApp click-to-chat is available only when the customer selected/consented to WhatsApp; the product never claims an automated WhatsApp message was sent.
- Portfolio and FAQs are database-backed and staff-editable.
- Core public and admin workflows pass automated, accessibility, responsive, and security checks.

## 2. Confirmed product decisions and launch assumptions

- Scope: complete MVP, not a visual-only prototype.
- Provisional brand: **Aveline Gifts**.
- Provisional tagline: **Made personal. Remembered always.**
- Provisional legal/contact addresses: `hello@avelinegifts.com` and `privacy@avelinegifts.com`; clearly centralize these values so the final domain can replace them.
- Market: United States; currency: USD.
- Budget ranges: Under $75, $75–150, $150–300, $300–500, and $500+.
- Service model: US domestic delivery assessment using city, state, ZIP code, and optional address lines. Full delivery address remains optional until needed for assessment/fulfillment.
- Response promise: within one business day.
- Quotes, payment status, and delivery milestones are recorded manually in the MVP. No card data is collected.
- Staff roles:
  - `admin`: all curator capabilities plus staff role/profile and operational-setting management.
  - `curator`: requests, notes, statuses, messages, portfolio, and FAQ management; no staff management or protected settings changes.
- Retention default: private requests, messages, histories, and notification logs are retained for 24 months, with a documented manual deletion/anonymization process until automated retention is added.
- Email: Resend through a server-side Supabase Edge Function.
- WhatsApp: manual click-to-chat only in MVP; automation remains explicitly “not configured.”
- Photography: select warm, high-quality Unsplash photography during implementation for gift wrapping, ribbons, flowers, notes, and curated gift arrangements. Store source/attribution metadata and use deliberate crops and descriptive alt text. Replace before launch if the business supplies owned photography.
- Testimonials: do not fabricate customer claims. Use a clearly labeled “What thoughtful gifting can feel like” editorial section or omit testimonials until approved quotes exist.

## 3. Prerequisites and security gates

1. Connect a Supabase project through the Figma Make Supabase connection before implementing any real backend or PII flow. The current repository is not connected.
2. Store the Resend API key as the server-side secret `RESEND_API_KEY`; never use a `VITE_` prefix or place it in client code.
3. Add server-side environment values for `RESEND_FROM_EMAIL`, `ADMIN_NOTIFICATION_EMAIL`, `PUBLIC_SITE_URL`, and optional `WHATSAPP_BUSINESS_NUMBER`.
4. Configure Supabase Auth with public signup disabled. Create/invite initial staff manually and insert matching `admin_profiles` records.
5. Treat Figma Make preview as a development environment, not as an approved production system for sensitive personal data. Before launch, perform privacy/legal review, security testing, retention review, provider/DPA review, domain verification, and production Supabase configuration.
6. Do not implement a frontend-only “successful submission” fallback. If Supabase is unavailable, preserve the in-tab draft, display a recoverable error, and do not navigate to success.

## 4. Technical architecture

### Frontend

- Keep React 19, Vite 8, TypeScript, and Tailwind CSS v4.
- Add:
  - `react-router` and use Data Mode with `RouterProvider` in `src/app/App.tsx` and `createBrowserRouter` in `src/app/routes.tsx`.
  - `@supabase/supabase-js` for browser auth/session and permitted data calls.
  - `react-hook-form`, `zod`, and `@hookform/resolvers` for questionnaire/admin validation.
  - `lucide-react` for restrained interface icons.
- Add testing packages in the testing phase: Vitest, React Testing Library, user-event, jest-dom, MSW, Playwright, and axe tooling.
- Keep `src/App.tsx` as a compatibility re-export of the new app entry so `src/main.tsx` remains simple.
- Use route-level lazy loading for admin pages and gallery-heavy public pages.
- Use one typed service layer so pages do not call Supabase directly.

### Backend

- Supabase PostgreSQL for relational data.
- Supabase Auth for staff only.
- Supabase Storage for portfolio media.
- Version-controlled SQL migrations under `supabase/migrations/`.
- Supabase Edge Functions for:
  - public gift-request submission,
  - public contact submission,
  - notification dispatch/retry,
  - admin-only atomic status changes where actor/history consistency is required,
  - privacy-safe analytics ingestion.
- RLS enabled on every table, including content and operational tables.
- Resend calls occur only in Edge Functions.

### Request submission transaction

1. Client validates for usability, attaches a generated idempotency key, and sends the payload to `submit-gift-request`.
2. Edge Function rate-limits, verifies spam controls, normalizes and validates the full payload with a server-owned schema, and invokes a database transaction/RPC.
3. Transaction creates the request, creates initial `New Request` history, stores consent records, generates a unique human-readable reference, and queues customer/admin notification jobs.
4. Function returns the reference only after the transaction commits.
5. Client clears the session draft and navigates to `/request-success` with non-sensitive navigation state.
6. Notification processing runs after persistence; each attempt is logged. Email failure does not invalidate the saved request.

## 5. Proposed source structure

```text
src/
  App.tsx
  app/
    App.tsx
    routes.tsx
    route-meta.ts
  components/
    ui/                 # Button, LinkButton, Input, Select, Textarea, Checkbox,
                        # RadioCard, Field, Alert, Dialog, Drawer, Badge, Spinner,
                        # EmptyState, Pagination, DataTable primitives
    layout/             # PublicHeader, MobileNav, PublicFooter, AdminShell
    sections/           # Reusable marketing sections
  config/
    brand.ts
    gift-options.ts
    request-statuses.ts
  features/
    gift-request/       # schema, types, reducer/provider, steps, review, service
    auth/               # session provider, guards, permission helpers
    requests/           # list/detail/status/note interfaces and services
    portfolio/
    faqs/
    messages/
    notifications/
    analytics/
  pages/
    public/
    admin/
  lib/
    supabase.ts
    env.ts
  hooks/
  utils/
  index.css
supabase/
  functions/
  migrations/
  seed.sql
public/
  images/
  sitemap.xml
  robots.txt
```

Create local UI primitives because the repository has no design-system dependency. Keep native accessible semantics encapsulated in those primitives, then reuse them consistently across public and admin interfaces.

## 6. Visual and interaction system

### Foundation

- Define Tailwind v4 theme variables in `src/index.css`:
  - cream `#FFF8F3`
  - blush `#F4DDE3`
  - dusty rose `#D991A8`
  - deep rose `#AD536F`
  - warm plum `#49353B`
  - warm beige `#E8D8CA`
  - secondary text `#71636A`
  - white `#FFFFFF`
- Add semantic aliases for background, surface, text, muted text, border, primary, primary-hover, focus, success, warning, and danger so pages do not scatter raw colors.
- Import public Google faces directly: Cormorant Garamond for editorial headings and Inter for body/forms/admin UI.
- Use approximately 70% cream/white, 20% blush, and 10% rose/plum. Avoid generic gradients, oversized icon decoration, glass effects, and excessive animation.
- Use generous editorial spacing, asymmetric image/text compositions, thin beige dividers, softly rounded cards, and subtle shadows only where depth clarifies hierarchy.
- Public pages use expressive serif display type; admin UI remains Inter-led and denser.
- Define shared breakpoints and container widths; make all primary actions and inputs comfortable for touch.
- Add visible `:focus-visible` states and honor `prefers-reduced-motion`.

### Core visual components

- Text wordmark, desktop navigation, mobile drawer, footer, and persistent “Create a Gift” CTA.
- Primary, secondary, quiet, destructive, and icon button variants with disabled/loading states.
- Form controls with labels, optional/helper text, error text, character counts, and correct `aria-describedby`.
- Editorial section heading, image card, occasion chip, process step, FAQ accordion, testimonial-safe editorial quote, CTA panel.
- Admin shell with responsive sidebar/drawer, top bar, status badges, metric cards, data table/list fallback, filters, confirmation dialogs, toasts, and empty/error states.

## 7. Routes and page behavior

### Public layout

- `/`: hero with premium imagery and supplied headline/copy; three-step “How it works”; featured database-backed creations; benefits; occasion grid; editorial trust section without fake testimonials; FAQ preview; final CTA.
- `/our-creations`: published portfolio grid ordered by featured/display order; category/tag filters; accessible image detail dialog or detail expansion; lazy images; no customer-identifying copy.
- `/about`: brand philosophy, curation process, expectations, response time, and service boundaries.
- `/faqs`: published FAQs grouped by category with accessible accordions and deep-linkable categories.
- `/contact`: validated form for name, email, optional phone, subject, and message; official email and conditional WhatsApp links; server-confirmed success only.
- `/privacy`: plain-language collection, purpose, processors, retention, rights/contact, security limitations, analytics, and consent information.
- `/terms`: service scope, proposal/payment process, customer responsibilities, changes/cancellations, delivery limitations, intellectual property, and contact. Label as provisional and require legal approval before launch.
- `/create-gift`: questionnaire shell and seven steps described below.
- `/request-success`: renders only when given a confirmed reference from the successful response; direct visits show a safe “No recent request found” state and CTA, never query a request by reference.
- `*`: branded 404 with navigation back home.

### Admin layout

- `/admin/login`: staff email/password login, generic auth errors, password-reset link, no signup.
- `/admin`: operational metric cards, recent activity, upcoming delivery items, and failed notifications.
- `/admin/requests`: debounced search; status/urgency/occasion/date filters; sort; URL-persisted filter state; paginated result table with mobile cards.
- `/admin/requests/:id`: request summary, answers grouped by questionnaire step, contact/consent, quote/payment/delivery fields, private notes, status control, status timeline, and notification history.
- `/admin/portfolio`: create/edit/publish/unpublish/reorder portfolio items, upload/reorder images, require alt text, and confirm deletion.
- `/admin/faqs`: create/edit/publish/unpublish/reorder FAQs and manage category.
- `/admin/messages`: search/filter messages, inspect content, mark handled/unhandled.
- `/admin/settings`: view operational settings for both roles; only admins can mutate protected settings and manage staff profile roles.
- Guard the entire admin branch. Loading a session shows a neutral loading shell; unauthenticated sessions redirect to login; unauthorized profiles show access denied and sign-out.

## 8. Seven-step questionnaire

Use one versioned Zod schema and typed form model. Each step validates only its relevant fields before advancing; final submit validates the complete payload. Keep draft state in `sessionStorage`, not durable `localStorage`, to limit PII persistence. Restore only a compatible schema version and clear the draft after confirmed submission.

1. **Occasion and timing**
   - Occasion, occasion date, preferred delivery date, urgency, date flexibility.
   - Require occasion and preferred delivery date; disallow impossible/past delivery dates; warn rather than block if lead time is short.
2. **Recipient**
   - Relationship (required), optional first name/nickname, optional age range.
   - Never request date of birth.
3. **Personality and interests**
   - Interests, traits, favorite things, preferences, dislikes, and notes.
   - Use prompts, token-like multi-selects where useful, optional text, and documented length limits.
4. **Feeling and gift style**
   - Intended feeling (required), categories/styles, personalization ideas, packaging preference, and avoidances.
5. **Budget and delivery**
   - USD budget range (required), city, state, ZIP, optional address lines, delivery instructions, preferred delivery date confirmation.
   - Explain why location is requested and keep full street address optional.
6. **Customer contact**
   - Name and email required; phone required only when WhatsApp is selected; preferred contact channel; WhatsApp update consent shown and required only for WhatsApp updates; separate optional marketing consent.
7. **Review and submit**
   - Readable grouped summary with “Edit” links back to each step.
   - Required Terms and Privacy acknowledgement with timestamp/version.
   - Submission button enters a non-repeatable loading state while retaining an idempotency key.

Additional behavior:

- Persistent progress label (“Step 3 of 7”) plus an accessible ordered step indicator.
- Back navigation never discards entered data.
- On server validation errors, return the user to the first invalid step and announce a summary.
- On network/backend failure, retain the session draft and show retry/contact guidance.
- Use browser autofill attributes for customer contact/address fields.
- Never place answers or the reference in the URL or analytics.

## 9. Database model and invariants

Use UUID primary keys, `timestamptz`, foreign keys, check constraints/enums where stable, and `created_at`/`updated_at` triggers. Prefer explicit columns for searchable/filterable fields and `jsonb` only for flexible answer groups that do not need operational queries.

### Core tables

- `gift_requests`
  - reference, idempotency key/hash, status, urgency
  - occasion/timing fields
  - recipient relationship/name/age range
  - personality/interests/preferences/dislikes/notes
  - intended feeling, gift styles/categories, personalization, packaging, avoidances
  - budget band/currency
  - delivery city/state/ZIP/address/instructions/date
  - customer name/email/phone, preferred channel
  - terms/privacy/WhatsApp/marketing consent values, policy versions, timestamps
  - quote amount/currency/notes, payment status/reference (never card details)
  - dispatch/completion/cancellation timestamps and standard audit timestamps
- `request_notes`: request, body, author, timestamps; private by definition.
- `request_status_history`: request, previous status, new status, actor, optional comment, timestamp; append-only.
- `request_delivery_milestones`: request, milestone type, date, details, actor.
- `contact_messages`: contact values, subject/message, handled state/by/at, timestamps.
- `portfolio_items`: title, slug, description, category, tags, featured, published, display order, timestamps.
- `portfolio_images`: item, storage path, alt text, display order, timestamps.
- `faq_items`: category, question, answer, published, display order, timestamps.
- `notification_logs`: request/contact relation, channel, template, recipient class (not raw recipient where avoidable), attempt count, status, provider reference, sanitized provider response/error, next retry, timestamps.
- `notification_jobs`: durable pending/retry queue with idempotency key, attempt/max-attempt values, scheduling, lock state.
- `admin_profiles`: auth user ID, display name, role, active state, timestamps.
- `analytics_events`: allowlisted event name, questionnaire step where relevant, coarse device category, timestamp; no form values, names, contact data, addresses, or recipient descriptions.
- `operational_settings`: singleton/config rows for response copy, contact channels, default currency, WhatsApp mode, notification configuration state, and policy versions. Protected mutation is admin-only.

### Database behavior

- Generate collision-resistant references in the database (for example, `AG-2026-XXXXXX`) with a unique constraint.
- Enforce one saved request per idempotency key.
- Create initial history in the same transaction as the request.
- Change status only through an atomic function that locks the request, validates allowed status values, updates timestamps, and inserts history with the authenticated actor.
- Do not require a rigid linear status sequence; allow any operationally valid transition while always recording it.
- Make status history append-only for staff.
- Use restrictive deletion rules for private records; admin deletion invokes an explicit, audited deletion/anonymization workflow rather than broad cascade from the UI.
- Add indexes for reference, normalized customer email/phone, status, urgency, occasion, submission date, preferred delivery date, publication/order fields, and notification retry status.

## 10. RLS, authorization, and storage

- Enable RLS on every table.
- Public users:
  - cannot directly select/insert/update/delete private request, message, note, history, notification, profile, analytics, or settings rows;
  - can read only published portfolio/FAQ projections, either via narrowly scoped policies or public views;
  - submit private data only through rate-limited Edge Functions.
- Authenticated active curators:
  - can read/update operational request fields;
  - can create notes and invoke status changes;
  - can manage messages, portfolio, and FAQs;
  - cannot read/change auth secrets or manage staff roles.
- Authenticated active admins receive curator permissions plus staff/settings management and privacy deletion workflows.
- Centralize `is_active_staff()` and `has_role()` SQL helpers, written to avoid RLS recursion and with fixed `search_path`.
- Storage:
  - separate original/admin upload path from public delivery path if transformations are introduced;
  - allow only active staff uploads;
  - allowlist JPEG/PNG/WebP, enforce a conservative size limit, reject SVG/executables, and use randomized paths;
  - make only published portfolio derivatives publicly readable;
  - require alt text before publish.

## 11. Edge Functions and notifications

### `submit-gift-request`

- CORS allowlist, JSON content/type/size checks, honeypot/Turnstile-compatible spam hook, IP/request throttling, server validation, normalization, idempotency, transaction call, and safe error mapping.
- Do not log raw payloads.
- Return only `{ reference }` plus a success marker after commit.

### `submit-contact-message`

- Same boundary controls; validate and store the message before reporting success.
- Queue a minimal staff alert without embedding sensitive message content.

### `process-notifications`

- Claims queued jobs safely, sends via Resend, records provider ID/outcome, and retries eligible transient failures with capped exponential backoff.
- Customer receipt includes reference, one-business-day expectation, next steps, and official contact.
- Admin alert includes reference, timestamp, and authenticated dashboard link, but excludes addresses and recipient narrative.
- Use stable per-template idempotency keys to prevent duplicate sends.
- Mark permanent failures for admin attention; never alter the underlying request to failed.

### WhatsApp

- No automated job is created in MVP.
- Request detail builds a click-to-chat URL from normalized phone number and a prefilled, non-sensitive message containing only greeting/reference.
- Show consent and preferred-channel status beside the action.
- If number/consent/configuration is absent, disable the action with an explanation.

## 12. Admin workflows

- Dashboard metrics are computed by RPC/views with bounded queries rather than downloading all requests.
- Request search normalizes email/phone and returns paginated fields only; details load separately.
- Urgency can be edited independently of status and is audited.
- Notes are append-only in the initial UI; corrections add a follow-up note rather than silently changing history.
- Quote/payment controls record amount, status, safe external/manual reference, and notes. Explicitly warn against entering card details.
- Status updates require optional comment and confirmation for cancellation/completion.
- Content editing uses drafts and publish toggles; public pages never display unpublished rows.
- Image reordering and FAQ/portfolio ordering use integer positions updated transactionally.
- Destructive actions use a confirmation dialog naming the item and report partial/upload failures clearly.

## 13. SEO, accessibility, performance, and analytics

### SEO

- Configure `.figma/make/site.json`, page-specific document titles/descriptions, canonical URLs once the domain exists, Open Graph defaults, favicon/wordmark assets, `robots.txt`, and `sitemap.xml`.
- Admin routes include `noindex`; public success route is also `noindex`.
- Use one semantic page heading, descriptive link copy, and alt text.
- Because this is a client SPA, document that advanced crawl/social requirements may later justify prerendering; do not imply full SSR.

### Accessibility

- WCAG 2.2 AA target.
- Semantic landmarks, skip link, logical heading order, keyboard-operable drawer/accordion/dialog, focus trapping/restoration, visible focus, 44px-class touch targets, error summary and field errors, live regions for async outcomes, and reduced-motion behavior.
- Never use color alone for statuses or validation.
- Verify the deep-rose/white and supporting text combinations with contrast tooling; adjust semantic token shades if the supplied color cannot satisfy a particular text-size use.

### Performance

- Responsive image sizes, modern formats where available, explicit dimensions/aspect ratios, lazy loading below the fold, and eager loading only for the primary hero image.
- Lazy-load admin and gallery route bundles.
- Avoid large animation libraries and unnecessary client dependencies.
- Paginate operational lists and cap query sizes.

### Analytics

- Track only allowlisted aggregate events: page visit, questionnaire started, step viewed/completed, validation failure count, successful submission, and contact submission.
- Operational reports derive first-response time, status counts, overdue work, notification outcomes, and completion rate from server data.
- Never send form values, identifiers, names, phone numbers, emails, recipient descriptions, addresses, or request references to analytics.

## 14. Seed and placeholder content

- Seed 6–8 portfolio items with licensed Unsplash imagery metadata, varied occasions, thoughtful alt text, featured flags, and ordering.
- Seed FAQs across process, budget, personalization, delivery, changes/cancellations, and payment.
- Seed no fake requests, customer names, testimonials, or production staff credentials.
- Centralize provisional brand/legal copy and include a launch checklist identifying every placeholder that must be approved or replaced.

## 15. Error handling and edge cases

- Expired admin session: preserve the attempted admin URL, redirect to login, and return after successful authentication.
- Deleted/disabled admin profile: deny all data access even if an Auth session exists.
- Direct success URL: show no request data and no success claim.
- Duplicate submit/retry/double-click: return the existing saved reference for the same idempotency key and do not enqueue duplicate templates.
- Saved request + email outage: show request success, state that confirmation email may be delayed, and expose failure only to staff.
- Backend unavailable before save: do not show success; retain session draft.
- Stale content edits: use `updated_at` optimistic concurrency and ask the editor to reload rather than silently overwrite.
- Invalid/oversized upload: reject before upload where possible and enforce again in storage/backend policy.
- Invalid dates/time zones: store timestamps in UTC, treat customer-entered occasion/delivery dates as US-local calendar dates, and display explicit date formatting.
- Empty public CMS: use intentional brand copy/CTA rather than broken grids.
- No result/admin empty states: preserve filters and provide clear reset/action controls.

## 16. Verification strategy

### During implementation

- Run `pnpm format` on changed code.
- Run `pnpm build` after broader feature slices and at completion.
- Do not start another dev server; use the already supervised Figma Make server and hot reload.
- Use runtime logs only to diagnose a concrete observed failure.

### Automated tests

- Unit:
  - questionnaire validation/date/contact/conditional-consent rules,
  - reference and formatting helpers,
  - status configuration and permission helpers,
  - notification retry eligibility/idempotency helpers.
- Component:
  - each questionnaire step, review editing, progress behavior, error announcement,
  - nav/drawer/accordion/dialog keyboard behavior,
  - admin filters, statuses, destructive confirmations, and role-restricted controls.
- Integration with MSW/local Supabase:
  - successful and failed request/contact submission,
  - draft preservation and duplicate handling,
  - auth loading/login/logout/expired-session behavior,
  - request status update with history,
  - content publish/unpublish,
  - notification success/transient/permanent failure logging.
- Database/security:
  - anonymous denial for every private table and storage path,
  - published-only public content reads,
  - curator versus admin matrix,
  - inactive staff denial,
  - append-only history,
  - duplicate idempotency constraint,
  - transactional request/history/job creation.
- End-to-end:
  - complete mobile customer request and confirmed reference,
  - server failure does not navigate to success,
  - staff login, search, request detail, note, status change, and history,
  - portfolio/FAQ publishing,
  - message handling,
  - manual WhatsApp fallback rules.
- Accessibility:
  - automated axe checks on each route/state plus manual keyboard/focus/error testing.
- Responsive:
  - representative phone, tablet, laptop, and wide desktop widths; prioritize questionnaire and admin tables/cards.
- Performance:
  - production bundle review and Lighthouse checks for home, questionnaire start, gallery, and admin login.

## 17. Phased execution order

### Phase 1 — Foundation and backend contract

1. Connect Supabase and create the Resend secret/configuration placeholders.
2. Add dependencies, router, source structure, brand config, design tokens/fonts, local UI primitives, public/admin shells, route metadata, and 404.
3. Add migrations, enums/constraints/indexes, RLS helpers/policies, storage policies, seed content, and generated database types.
4. Add environment validation and `.env.example` without secrets.

Exit condition: routes render through shared shells; migrations apply cleanly; anonymous/staff policy smoke tests pass.

### Phase 2 — Public content experience

1. Select and integrate Unsplash photography.
2. Build Home, Our Creations, About, FAQs, Contact, Privacy, and Terms.
3. Connect published content reads and secure contact submission.
4. Add public metadata, sitemap/robots, responsive behavior, and accessibility states.

Exit condition: all public informational routes work at target breakpoints and contact success is server-confirmed.

### Phase 3 — Gift request journey

1. Implement schema, typed state, session draft, seven steps, review/edit, conditional validation, and accessible progress.
2. Implement idempotent server submission transaction and success route.
3. Add safe analytics events and all error/retry states.

Exit condition: full anonymous submission persists exactly once and no pre-save success path exists.

### Phase 4 — Staff authentication and operations

1. Implement login/reset/session guards and role loading.
2. Build dashboard, requests list/detail, search/filter/sort/pagination, notes, urgency, quote/payment fields, delivery milestones, status history, and notification history.
3. Build portfolio, FAQ, message, and settings management with role restrictions.

Exit condition: curator/admin workflows work and direct unauthorized API/database access is denied.

### Phase 5 — Notification reliability

1. Add notification queue, Resend templates, dispatcher, capped retries, sanitized logs, and failed-notification dashboard state.
2. Add consent-aware manual WhatsApp click-to-chat.
3. Verify saved-request behavior during provider outage.

Exit condition: emails are attempted/logged after persistence, retries are idempotent, and WhatsApp UI makes no automation claim.

### Phase 6 — Hardening and launch preparation

1. Complete automated test suites and responsive/accessibility/manual browser checks.
2. Validate RLS/storage policies with anonymous, curator, admin, inactive, and expired-session cases.
3. Optimize images/bundles and review SEO/metadata.
4. Finalize README for setup, migrations, secrets, deployment, staff invitation, backup/recovery, retention/deletion, notification operations, and known limitations.
5. Replace/approve provisional brand, domain, contacts, legal copy, photography, service area, operating hours, and sender domain before production.

Exit condition: acceptance criteria are demonstrably met, security tests pass, no secrets are committed/exposed, and launch placeholders are either approved or replaced.

## 18. Planned documentation

Update `README.md` with:

- local prerequisites and the existing Figma Make dev-server behavior;
- required public/client and server-only environment variables;
- Supabase connection, migration, seed, and type-generation workflow;
- staff invitation/profile activation and role model;
- Resend domain/secret setup and retry operations;
- manual WhatsApp limitations;
- test/build/format commands;
- backup/restore and 24-month retention/deletion procedure;
- production deployment checklist and security assumptions;
- a statement that request success means “saved,” not “staff accepted,” and notification status is separate.

## 19. Explicitly deferred beyond MVP

- Customer accounts, login, and public request tracking.
- Automated checkout, payment processing, card storage, inventory, courier integrations, and native apps.
- AI recommendations.
- Automated WhatsApp Business messaging.
- Fully automated retention deletion, image transformation pipeline, or granular per-action staff permissions.
- SSR/prerendering unless launch SEO evidence requires it.
