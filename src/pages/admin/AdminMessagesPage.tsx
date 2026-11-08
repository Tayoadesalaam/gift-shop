import { ChevronDown } from "lucide-react"
import { AdminHeading } from "./shared"

export default function AdminMessagesPage() {
  return (
    <div className="admin-page">
      <AdminHeading
        eyebrow="Inbox"
        title="Messages"
        copy="General enquiries from the website."
      />
      <section className="admin-panel message-list">
        {[
          [
            "Nina Foster",
            "Question about rush timing",
            "Could you let me know whether a gift for next Friday might be possible?",
            "18 min ago",
          ],
          [
            "Owen Brooks",
            "Corporate thank-you gifts",
            "We’re exploring a small collection for five long-standing clients.",
            "Yesterday",
          ],
          [
            "Lena Ortiz",
            "Delivery area",
            "Do you currently deliver outside the continental US?",
            "Oct 9",
          ],
        ].map(([name, subject, copy, time], index) => (
          <article key={subject} className={index === 0 ? "unread" : ""}>
            <span>
              {name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div>
              <div>
                <h2>{subject}</h2>
                <small>{time}</small>
              </div>
              <strong>{name}</strong>
              <p>{copy}</p>
            </div>
            <ChevronDown />
          </article>
        ))}
      </section>
    </div>
  )
}
