import { useState, type FormEvent } from "react"
import { ArrowRight, Clock3, Mail, ShieldCheck } from "lucide-react"
import { brand } from "../../data/content"
import {
  Button,
  Field,
  Input,
  PageIntro,
  Textarea,
} from "../../components/UI"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "error">("idle")

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setStatus("error")
  }

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="We’d love to hear what you have in mind."
        copy="Have a question before you begin, or need help with an existing request? Send us a note."
      />
      <section className="contact-section">
        <div className="shell contact-grid">
          <div className="contact-details">
            <h2>Let’s talk gifting.</h2>
            <p>
              We read every message with care and usually reply within one
              business day.
            </p>
            <a href={`mailto:${brand.email}`}>
              <Mail aria-hidden="true" />{" "}
              <span>
                <small>Email us</small>
                {brand.email}
              </span>
            </a>
            <div>
              <Clock3 aria-hidden="true" />{" "}
              <span>
                <small>Studio hours</small>Monday–Friday, 9am–5pm ET
              </span>
            </div>
            <div className="contact-note">
              <ShieldCheck aria-hidden="true" />
              <p>
                Please don’t include payment-card information or highly
                sensitive personal details in your message.
              </p>
            </div>
          </div>
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-row">
              <Field label="Your name" required>
                <Input
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Email" required>
                <Input
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </Field>
            </div>
            <Field label="Phone" hint="Optional">
              <Input
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
              />
            </Field>
            <Field label="Subject" required>
              <Input required placeholder="How can we help?" />
            </Field>
            <Field label="Message" required>
              <Textarea
                required
                rows={6}
                placeholder="Tell us a little about what you need…"
              />
            </Field>
            {status === "error" && (
              <div className="form-alert" role="alert">
                Secure messaging isn’t connected yet. Please email{" "}
                <a href={`mailto:${brand.email}`}>{brand.email}</a> for now.
              </div>
            )}
            <Button type="submit">
              Send message <ArrowRight size={17} />
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
