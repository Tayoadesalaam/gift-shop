import { MessageCircle } from "lucide-react"
import { LinkButton, PageIntro, SectionHeading } from "../../components/UI"
import { FaqList, FinalCta } from "./HomePage"

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="Frequently asked"
        title="A little clarity before we begin."
        copy="From budgets and timing to personalization and delivery, here’s what to expect."
      />
      <section className="faq-page-section">
        <div className="shell narrow-shell">
          <FaqList />
          <div className="contact-strip">
            <MessageCircle aria-hidden="true" />
            <div>
              <h3>Still wondering about something?</h3>
              <p>
                Tell us what’s on your mind and we’ll reply within one business
                day.
              </p>
            </div>
            <LinkButton to="/contact" variant="secondary">
              Ask us
            </LinkButton>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
