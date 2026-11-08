import { useMemo, useState } from "react"
import { Button, LinkButton, PageIntro, SectionHeading } from "../../components/UI"
import { creations } from "../../data/content"
import { FinalCta } from "./HomePage"

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

export default function CreationsPage() {
  const [filter, setFilter] = useState("All")
  const categories = useMemo(
    () => ["All", ...new Set(creations.map((item) => item.occasion))],
    [],
  )

  const filtered =
    filter === "All" ? creations : creations.filter((item) => item.occasion === filter)

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
