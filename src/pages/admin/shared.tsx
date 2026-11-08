import type { ReactNode } from "react"
import { ArrowRight, MoreHorizontal } from "lucide-react"
import { Link } from "react-router"
import { Button } from "../../components/UI"
import { creations, faqs } from "../../data/content"

export const requests = [
  {
    id: "1",
    ref: "AG-2026-K4M8P2",
    customer: "Clara Reynolds",
    occasion: "Anniversary",
    status: "New Request",
    budget: "$150–300",
    date: "Oct 11, 2026",
    delivery: "Oct 28",
    urgent: true,
  },
  {
    id: "2",
    ref: "AG-2026-N7Q3L9",
    customer: "Marcus Lee",
    occasion: "Birthday",
    status: "Under Review",
    budget: "$75–150",
    date: "Oct 11, 2026",
    delivery: "Nov 08",
    urgent: false,
  },
  {
    id: "3",
    ref: "AG-2026-W2R6A1",
    customer: "Evelyn Carter",
    occasion: "Wedding",
    status: "Proposal Prepared",
    budget: "$300–500",
    date: "Oct 10, 2026",
    delivery: "Nov 14",
    urgent: false,
  },
  {
    id: "4",
    ref: "AG-2026-B8T5H3",
    customer: "Noah Williams",
    occasion: "Thank you",
    status: "Awaiting Customer",
    budget: "$75–150",
    date: "Oct 09, 2026",
    delivery: "Oct 30",
    urgent: false,
  },
  {
    id: "5",
    ref: "AG-2026-C1F9J4",
    customer: "Sofia Patel",
    occasion: "Graduation",
    status: "In Production",
    budget: "$150–300",
    date: "Oct 08, 2026",
    delivery: "Oct 25",
    urgent: true,
  },
]

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/ /g, "-")
  return <span className={`status-badge status-${key}`}>{status}</span>
}

export function AdminHeading({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string
  title: string
  copy?: string
  action?: ReactNode
}) {
  return (
    <div className="admin-heading">
      <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        {copy && <span>{copy}</span>}
      </div>
      {action}
    </div>
  )
}

export function RequestTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? requests.slice(0, 4) : requests

  return (
    <div className="table-scroll">
      <table className="request-table">
        <thead>
          <tr>
            <th>Request</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Delivery</th>
            {!compact && <th>Budget</th>}
            <th>
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((request) => (
            <tr key={request.ref}>
              <td>
                <Link to={`/admin/requests/${request.id}`}>
                  <strong>{request.ref}</strong>
                  <small>
                    {request.occasion} {request.urgent && <b>Urgent</b>}
                  </small>
                </Link>
              </td>
              <td>{request.customer}</td>
              <td>
                <StatusBadge status={request.status} />
              </td>
              <td>{request.delivery}</td>
              {!compact && <td>{request.budget}</td>}
              <td>
                <Link
                  aria-label={`Open ${request.ref}`}
                  to={`/admin/requests/${request.id}`}
                >
                  <ArrowRight size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DetailSection({
  title,
  rows,
}: {
  title: string
  rows: [string, string][]
}) {
  return (
    <section className="admin-panel detail-section">
      <h2>{title}</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export { creations, faqs }

export function AdminCmsCards() {
  return creations.map((item, index) => (
    <article className="cms-card" key={item.title}>
      <img src={item.src} alt="" />
      <div>
        <span>{item.occasion}</span>
        <h2>{item.title}</h2>
        <p>
          {index < 4 ? "Published" : "Draft"} · Position {index + 1}
        </p>
      </div>
      <button aria-label={`Options for ${item.title}`}>
        <MoreHorizontal />
      </button>
    </article>
  ))
}
