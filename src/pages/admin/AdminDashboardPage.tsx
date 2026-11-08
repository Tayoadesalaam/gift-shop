import { Link } from "react-router"
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Gift,
  MessageCircle,
  PackageCheck,
} from "lucide-react"
import { AdminHeading, RequestTable, requests } from "./shared"

export default function AdminDashboardPage() {
  const metrics = [
    { label: "New requests", value: "12", change: "+4 this week", icon: Gift },
    {
      label: "Awaiting customer",
      value: "7",
      change: "3 need attention",
      icon: MessageCircle,
    },
    {
      label: "In production",
      value: "9",
      change: "2 due this week",
      icon: PackageCheck,
    },
    {
      label: "Completed this month",
      value: "24",
      change: "+18% from Sep",
      icon: Check,
    },
  ]

  return (
    <div className="admin-page">
      <AdminHeading
        eyebrow="Monday, October 12"
        title="Good morning, Amelia."
        copy="Here’s what’s happening in the studio today."
      />
      <div className="metric-grid">
        {metrics.map(({ label, value, change, icon: Icon }) => (
          <article className="metric-card" key={label}>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{change}</small>
            </div>
            <Icon size={21} />
          </article>
        ))}
      </div>
      <div className="admin-two-column">
        <section className="admin-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent requests</h2>
              <p>The newest stories waiting for your attention.</p>
            </div>
            <Link to="/admin/requests">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <RequestTable compact />
        </section>
        <aside className="admin-stack">
          <section className="admin-panel">
            <div className="panel-heading">
              <div>
                <h2>Needs attention</h2>
                <p>Time-sensitive studio tasks.</p>
              </div>
            </div>
            <div className="attention-list">
              <div>
                <span className="attention-icon warning">
                  <Clock3 />
                </span>
                <p>
                  <strong>2 urgent deliveries</strong>
                  <small>Due in the next 7 days</small>
                </p>
                <ChevronDown />
              </div>
              <div>
                <span className="attention-icon danger">
                  <AlertTriangle />
                </span>
                <p>
                  <strong>1 failed email</strong>
                  <small>Retry needed</small>
                </p>
                <ChevronDown />
              </div>
              <div>
                <span className="attention-icon neutral">
                  <MessageCircle />
                </span>
                <p>
                  <strong>3 customer replies due</strong>
                  <small>Waiting over 24 hours</small>
                </p>
                <ChevronDown />
              </div>
            </div>
          </section>
          <section className="admin-panel studio-note">
            <p>Studio note</p>
            <blockquote>
              “The details aren’t the details. They make the design.”
            </blockquote>
            <small>— Charles Eames</small>
          </section>
        </aside>
      </div>
    </div>
  )
}
