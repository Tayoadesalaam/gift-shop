import { Link } from "react-router"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import { brand, creations, faqs, photos } from "../../data/content"
import {
  Button,
  Eyebrow,
  Field,
  Input,
  LinkButton,
  PageIntro,
  SectionHeading,
  Textarea,
} from "../../components/UI"

function CreationCard({ item }: { item: (typeof creations)[number] }) {
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

export function FaqList({ limit }: { limit?: number }) {
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

export function FinalCta() {
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

export default function HomePage() {
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
              LoveZrap began with a simple belief: thoughtfulness can’t be pulled
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
