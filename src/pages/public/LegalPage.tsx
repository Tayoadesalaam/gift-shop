import { LinkButton, PageIntro } from "../../components/UI"

export function LegalPage({
  title,
  type,
}: {
  title: string
  type: "privacy" | "terms"
}) {
  const privacy = [
    [
      "Information we collect",
      "We collect the details you choose to provide about yourself, the gift recipient, the occasion, your budget, and delivery needs. We ask only for information needed to assess or fulfill your request.",
    ],
    [
      "How we use it",
      "We use this information to review your request, communicate with you, prepare a proposal, coordinate delivery, keep operational records, and meet legal obligations.",
    ],
    [
      "Sharing and service providers",
      "We share only what is necessary with carefully selected service providers such as hosting and transactional email partners. We do not sell personal information.",
    ],
    [
      "Retention and your choices",
      "Our provisional retention period is 24 months. You may contact privacy@lovezrap.com to ask about access, correction, or deletion, subject to legal and operational requirements.",
    ],
  ]

  const terms = [
    [
      "Our service",
      "LoveZrap provides gift curation and coordination. Submitting a request does not create a purchase, guarantee availability, or mean that your request has been accepted.",
    ],
    [
      "Proposals and payment",
      "We will share a proposal and quote before work begins. Payment is arranged separately after approval. Never send payment-card information through our forms.",
    ],
    [
      "Changes and cancellations",
      "Changes are generally possible before proposal approval. Personalized or in-production items may be non-refundable; specific terms will be confirmed before payment.",
    ],
    [
      "Delivery",
      "Delivery dates are estimates until confirmed. We are not responsible for delays outside our reasonable control, but we will communicate clearly and help where we can.",
    ],
  ]

  return (
    <>
      <PageIntro
        eyebrow="The details"
        title={title}
        copy="Clear, plain-language information about how our service works."
      />
      <section className="legal-section">
        <div className="shell legal-grid">
          <aside>
            <span>Provisional policy</span>
            <p>Last updated October 12, 2026</p>
          </aside>
          <div>
            <div className="legal-note">
              This placeholder policy requires legal review and final business
              details before launch.
            </div>
            {(type === "privacy" ? privacy : terms).map(([heading, copy]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{copy}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy, with respect at the center." type="privacy" />
  )
}

export function TermsPage() {
  return (
    <LegalPage title="Simple terms, thoughtfully explained." type="terms" />
  )
}
