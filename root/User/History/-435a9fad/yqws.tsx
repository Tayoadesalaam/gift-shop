import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Mail,
  MessageCircle,
  PackageCheck,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { brand, creations, faqs, photos } from "../data/content"
import {
  Button,
  Eyebrow,
  Field,
  Input,
  LinkButton,
  PageIntro,
  SectionHeading,
  Textarea,
} from "../components/UI"

function CreationCard({ item }: { item: typeof creations[number] }) {
  return (
    <article className="creation-card">
      <div className="creation-image">
        <img src={item.src} alt={item.alt} loading="lazy" />
        <span>{item.occasion}</span>
      </div>
      <div className="creation-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  )
}

function FaqList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map((item, index) => (
        <details key={item.question} open={index === 0 && !limit}>
          <summary>
            <span>
              <small>{item.category}</small>
              {item.question}
            </span>
            <ChevronDown aria-hidden="true" size={20} />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <Eyebrow>Thoughtful gifting, beautifully personal</Eyebrow>
            <h1>
              Some people deserve more than an <em>ordinary</em> gift.
            </h1>
            <p>
              Tell us about someone special. We’ll turn the little things that
              make them unique into a gift worth remembering.
            </p>
            <div className="hero-actions">
              <LinkButton to="/create-gift" arrow>
                Create a Gift
              </LinkButton>
              <LinkButton to="/our-creations" variant="quiet">
                Explore our creations
              </LinkButton>
            </div>
            <div className="hero-trust">

            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img src={photos.hero.src} alt={photos.hero.alt} />
            </div>
            <div className="hero-note">
              <Heart size={18} fill="currentColor" aria-hidden="true" />
              <p>
                Curated around <em>their</em> story
              </p>
            </div>
            <span className="hero-flourish">A</span>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="shell">
          <SectionHeading
            eyebrow="A more thoughtful way to gift"
            title="You bring the story. We’ll shape the rest."
            copy="No endless scrolling. Just a warm, guided process built around the person you know best."
          />
          <div className="process-grid">
            {[
              {
                number: "01",
                icon: PenLine,
                title: "Tell us about them",
                copy: "Share their personality, favorite things, your relationship, and the moment you’re celebrating.",
              },
              {
                number: "02",
                icon: Sparkles,
                title: "We curate with care",
                copy: "We translate those details into a personal gift direction, thoughtfully chosen and beautifully presented.",
              },
              {
                number: "03",
                icon: PackageCheck,
                title: "We make it happen",
                copy: "Approve the idea, then we coordinate the personal touches, packaging, and next steps with you.",
              },
            ].map(({ number, icon: Icon, title, copy }) => (
              <article className="process-card" key={number}>
                <span className="process-number">{number}</span>
                <Icon aria-hidden="true" strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="shell">
          <div className="section-topline">
            <SectionHeading
              align="left"
              eyebrow="From the studio"
              title="Gifts made to feel like no one else’s"
              copy="A little inspiration from stories we’ve had the joy of bringing to life."
            />
            <Link to="/our-creations" className="text-link">
              View all creations <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="creation-grid creation-grid-featured">
            {creations.slice(0, 3).map((item) => (
              <CreationCard item={item} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="shell story-grid">
          <div className="story-image">
            <img src={photos.story.src} alt={photos.story.alt} loading="lazy" />
            <span>It’s always the details.</span>
          </div>
          <div className="story-copy">
            <Eyebrow>Why personal matters</Eyebrow>
            <h2>The best gifts say, “I really know you.”</h2>
            <p>
              Aveline began with a simple belief: thoughtfulness can’t be pulled
              from a shelf. It lives in remembered stories, familiar colors,
              private jokes, and the feeling you want someone to carry with
              them.
            </p>
            <ul>
              <li>
                <Check size={17} /> Built around one person, never a trend
              </li>
              <li>
                <Check size={17} /> Clear guidance from first idea to final
                detail
              </li>
              <li>
                <Check size={17} /> Your budget respected from the beginning
              </li>
            </ul>
            <LinkButton to="/about" variant="secondary" arrow>
              Our approach
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="occasions-section">
        <div className="shell">
          <SectionHeading
            eyebrow="For every kind of moment"
            title="Big milestones. Quiet gestures. Everything between."
          />
          <div className="occasion-list">
            {[
              "Birthdays",
              "Anniversaries",
              "Weddings",
              "Graduations",
              "Thank you",
              "Encouragement",
              "New beginnings",
              "Just because",
            ].map((occasion) => (
              <span key={occasion}>{occasion}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-preview">
        <div className="shell faq-preview-grid">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Good to know"
              title="Questions, answered with care."
              copy="A few helpful details before you begin. If you’re wondering about something else, we’re only a message away."
            />
            <LinkButton to="/faqs" variant="secondary">
              See all FAQs
            </LinkButton>
          </div>
          <FaqList limit={3} />
        </div>
      </section>

      <FinalCta />
    </>
  )
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div className="shell">
        <div className="final-cta-inner">
          <Sparkles aria-hidden="true" />
          <Eyebrow>Let’s make it mean something</Eyebrow>
          <h2>Someone special is waiting to feel truly seen.</h2>
          <p>
            Start with what you know about them. We’ll help with everything that
            comes next.
          </p>
          <LinkButton to="/create-gift" variant="dark" arrow>
            Create a Gift
          </LinkButton>
        </div>
      </div>
    </section>
  )
}

export function CreationsPage() {
  const [filter, setFilter] = useState("All")
  const categories = ["All", ...new Set(creations.map((item) => item.occasion))]
  const filtered =
    filter === "All"
      ? creations
      : creations.filter((item) => item.occasion === filter)
  return (
    <>
      <PageIntro
        eyebrow="Our creations"
        title="A glimpse at what thoughtfulness can become."
        copy="Every gift begins with a person, not a product. Explore a few of the stories, moods, and details that have inspired us."
      />
      <section className="gallery-section">
        <div className="shell">
          <div className="filter-row" aria-label="Filter creations">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "primary" : "quiet"}
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="creation-grid">
            {filtered.map((item) => (
              <CreationCard item={item} key={item.title} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title="Thoughtful is a feeling, not a price tag."
        copy="We help you turn what you know, remember, and feel about someone into a gift that speaks for you."
      />
      <section className="about-story">
        <div className="shell story-grid">
          <div className="story-image story-image-tall">
            <img src={creations[3].src} alt={creations[3].alt} />
          </div>
          <div className="story-copy">
            <Eyebrow>The Aveline philosophy</Eyebrow>
            <h2>There is no formula for knowing someone well.</h2>
            <p>
              The most meaningful gifts are rarely the loudest. They are the
              ones that remember a passing comment, honor a chapter, or say what
              can be difficult to put into words.
            </p>
            <p>
              Our role is to listen closely, edit thoughtfully, and shape those
              details into an experience that feels personal from the first
              reveal to the final handwritten note.
            </p>
          </div>
        </div>
      </section>
      <section className="values-section">
        <div className="shell">
          <SectionHeading
            eyebrow="What guides us"
            title="Care in every decision."
          />
          <div className="values-grid">
            {[
              [
                "Personal before impressive",
                "We begin with who they are, not what happens to be trending.",
              ],
              [
                "Beautiful, never excessive",
                "Every detail earns its place. Luxury is care, clarity, and finish.",
              ],
              [
                "Honest throughout",
                "We are transparent about budget, timing, and what we can create well.",
              ],
            ].map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

export function FaqPage() {
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
    </>
  )
}

export function ContactPage() {
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

function LegalPage({
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
      "Our provisional retention period is 24 months. You may contact privacy@avelinegifts.com to ask about access, correction, or deletion, subject to legal and operational requirements.",
    ],
  ]
  const terms = [
    [
      "Our service",
      "Aveline provides gift curation and coordination. Submitting a request does not create a purchase, guarantee availability, or mean that your request has been accepted.",
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

export function RequestSuccessPage() {
  return (
    <section className="state-page">
      <div className="state-card">
        <Search aria-hidden="true" />
        <Eyebrow>Request status</Eyebrow>
        <h1>No recent request found.</h1>
        <p>
          A confirmation appears here only after our secure service has saved
          your request.
        </p>
        <LinkButton to="/create-gift">Create a Gift</LinkButton>
      </div>
    </section>
  )
}

export function NotFoundPage() {
  return (
    <section className="state-page">
      <div className="state-card">
        <span className="state-number">404</span>
        <h1>This page has wandered off.</h1>
        <p>Let’s get you back to something thoughtful.</p>
        <LinkButton to="/">Return home</LinkButton>
      </div>
    </section>
  )
}
