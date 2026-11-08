import { PageIntro, SectionHeading, Eyebrow } from "../../components/UI"
import { creations } from "../../data/content"
import { FinalCta } from "./HomePage"

export default function AboutPage() {
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
            <Eyebrow>The LoveZrap philosophy</Eyebrow>
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
            <p>
              Founded by Damilola Babalola, LoveZrap is built around the belief
              that every meaningful gift carries a story worth honoring.
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
