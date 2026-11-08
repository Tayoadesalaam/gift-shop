import { Plus } from "lucide-react"
import { Button } from "../../components/UI"
import { AdminHeading, faqs } from "./shared"

export default function AdminFaqPage() {
  return (
    <div className="admin-page">
      <AdminHeading
        eyebrow="Content"
        title="Frequently asked questions"
        copy="Keep public guidance clear and current."
        action={
          <Button disabled>
            <Plus size={16} /> New FAQ
          </Button>
        }
      />
      <section className="admin-panel cms-list">
        {faqs.map((item, index) => (
          <article key={item.question}>
            <span>{index + 1}</span>
            <div>
              <small>{item.category}</small>
              <h2>{item.question}</h2>
              <p>Published</p>
            </div>
            <Button variant="quiet" disabled>
              Edit
            </Button>
          </article>
        ))}
      </section>
    </div>
  )
}
