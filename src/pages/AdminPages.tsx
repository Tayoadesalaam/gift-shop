import { useState, type FormEvent } from "react"
import { Link, useParams } from "react-router"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Eye,
  EyeOff,
  Filter,
  Gift,
  Mail,
  MessageCircle,
  MoreHorizontal,
  PackageCheck,
  Plus,
  Search,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react"
import {
  Button,
  Field,
  Input,
  PreviewNotice,
  Select,
  Textarea,
} from "../components/UI"
import { creations, faqs } from "../data/content"

const requests = [
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

function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replaceAll(" ", "-")
  return <span className={`status-badge status-${key}`}>{status}</span>
}

function AdminHeading({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string
  title: string
  copy?: string
  action?: React.ReactNode
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

export function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  function submit(event: FormEvent) {
    event.preventDefault()
    setError(true)
  }
  return (
    <div className="login-page">
      <div className="login-brand">
        <Link to="/">
          <Sparkles size={18} /> Aveline Gifts
        </Link>
        <blockquote>“Thoughtfulness is the quiet art of noticing.”</blockquote>
        <p>Private studio operations</p>
      </div>
      <div className="login-panel">
        <div className="login-card">
          <p className="admin-kicker">Staff access</p>
          <h1>Welcome back.</h1>
          <p>Sign in to manage requests and studio content.</p>
          <form onSubmit={submit}>
            <Field label="Email address">
              <Input
                required
                type="email"
                autoComplete="email"
                placeholder="you@avelinegifts.com"
              />
            </Field>
            <Field label="Password">
              <div className="password-control">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>
            {error && (
              <div className="form-alert" role="alert">
                Staff authentication isn’t connected yet. No credentials were
                sent.
              </div>
            )}
            <Button type="submit">
              Sign in <ArrowRight size={17} />
            </Button>
          </form>
          <Link className="login-preview-link" to="/admin">
            View interface preview with sample data
          </Link>
          <small>Access is limited to authorized Aveline staff.</small>
        </div>
      </div>
    </div>
  )
}

export function AdminDashboardPage() {
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

function RequestTable({ compact = false }: { compact?: boolean }) {
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

export function AdminRequestsPage() {
  const [search, setSearch] = useState("")
  const shown = requests.filter((item) =>
    `${item.ref} ${item.customer}`.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <div className="admin-page">
      <AdminHeading
        eyebrow="Gift requests"
        title="Every story, thoughtfully organized."
        copy="Search, review, and move each request forward."
      />
      <section className="admin-panel">
        <div className="filter-toolbar">
          <label className="search-control">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reference or customer…"
            />
          </label>
          <Button variant="quiet">
            <Filter size={16} /> Status
          </Button>
          <Button variant="quiet">
            <CalendarDays size={16} /> Date
          </Button>
          <Select aria-label="Sort requests">
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Delivery date</option>
            <option>Urgency</option>
          </Select>
        </div>
        {shown.length ? (
          <div className="table-scroll">
            <table className="request-table">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Delivery</th>
                  <th>Budget</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {shown.map((request) => (
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
                    <td>{request.date}</td>
                    <td>{request.delivery}</td>
                    <td>{request.budget}</td>
                    <td>
                      <Link to={`/admin/requests/${request.id}`}>
                        <ArrowRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-admin">
            <Search />
            <h3>No matching requests</h3>
            <p>Try a different name or reference.</p>
          </div>
        )}
        <div className="table-footer">
          <span>Showing {shown.length} of 48 requests</span>
          <div>
            <Button variant="quiet" disabled>
              Previous
            </Button>
            <Button variant="quiet">Next</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export function AdminRequestDetailPage() {
  const { id } = useParams()
  const request = requests.find((item) => item.id === id) || requests[0]
  const [status, setStatus] = useState(request.status)
  return (
    <div className="admin-page">
      <Link className="back-link" to="/admin/requests">
        <ArrowLeft size={15} /> All requests
      </Link>
      <AdminHeading
        eyebrow={request.ref}
        title={`${request.occasion} for Clara’s partner`}
        copy={`Submitted ${request.date} · Preferred delivery ${request.delivery}`}
        action={<Button disabled>Save changes</Button>}
      />
      <div className="request-detail-grid">
        <div className="admin-stack">
          <section className="admin-panel detail-hero">
            <div>
              <StatusBadge status={status} />
              {request.urgent && <span className="urgent-pill">Urgent</span>}
            </div>
            <h2>
              A ten-year anniversary, told through the places they’ve shared.
            </h2>
            <p>
              Clara wants the gift to feel quietly romantic and deeply
              personal—not overly traditional.
            </p>
          </section>
          <DetailSection
            title="The moment"
            rows={[
              ["Occasion", "Anniversary"],
              ["Occasion date", "October 30, 2026"],
              ["Preferred delivery", "October 28, 2026"],
              ["Date flexibility", "No, this date is important"],
            ]}
          />
          <DetailSection
            title="Their story"
            rows={[
              ["Relationship", "Partner"],
              ["Recipient", "Jamie"],
              ["Age range", "35–44"],
              [
                "Personality",
                "Warm, observant, quietly funny, and sentimental without admitting it.",
              ],
              [
                "Interests",
                "Independent films, coastal road trips, old bookshops, and cooking elaborate Sunday dinners.",
              ],
              [
                "Favorite things",
                "Deep green, jasmine, handwritten notes, and their first trip to Maine.",
              ],
              ["Dislikes", "Anything overly flashy or branded."],
            ]}
          />
          <DetailSection
            title="Feeling & style"
            rows={[
              ["Intended feeling", "Loved"],
              [
                "Gift style",
                "A keepsake with a small collection of sensory details",
              ],
              [
                "Personalization",
                "Coordinates of the inn from their first trip, their date, and a private phrase",
              ],
              ["Packaging", "Minimal & refined"],
              ["Avoid", "Red roses and traditional anniversary motifs"],
            ]}
          />
          <DetailSection
            title="Budget & delivery"
            rows={[
              ["Budget", "$150–300 USD"],
              ["Destination", "Brooklyn, NY 11215"],
              [
                "Delivery note",
                "Doorman building; weekday delivery preferred.",
              ],
            ]}
          />
        </div>
        <aside className="admin-stack request-side">
          <section className="admin-panel">
            <h2>Move this request forward</h2>
            <Field label="Status">
              <Select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {[
                  "New Request",
                  "Under Review",
                  "Awaiting Customer",
                  "Proposal Prepared",
                  "Awaiting Approval",
                  "Awaiting Payment",
                  "In Production",
                  "Ready for Dispatch",
                  "Dispatched",
                  "Completed",
                  "Cancelled",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="Internal update">
              <Textarea
                rows={3}
                placeholder="Optional context for the status history"
              />
            </Field>
            <Button disabled>Update status</Button>
          </section>
          <section className="admin-panel">
            <h2>Customer</h2>
            <dl className="side-details">
              <div>
                <dt>Name</dt>
                <dd>Clara Reynolds</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>clara@example.com</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>+1 (718) 555-0148</dd>
              </div>
              <div>
                <dt>Preferred</dt>
                <dd>Email</dd>
              </div>
            </dl>
            <Button variant="secondary" disabled>
              <Mail size={16} /> Email customer
            </Button>
          </section>
          <section className="admin-panel">
            <div className="panel-heading">
              <div>
                <h2>Private notes</h2>
                <p>Visible to staff only.</p>
              </div>
            </div>
            <Textarea rows={4} placeholder="Add a note for the team…" />
            <Button disabled>Add note</Button>
            <div className="note-item">
              <strong>Amelia Moore</strong>
              <small>Oct 12 · 10:24am</small>
              <p>
                Researching a custom map detail and a small-batch jasmine
                candle.
              </p>
            </div>
          </section>
          <section className="admin-panel">
            <h2>Quote & payment</h2>
            <div className="form-row">
              <Field label="Quote">
                <Input value="245.00" readOnly />
              </Field>
              <Field label="Payment">
                <Select>
                  <option>Not requested</option>
                </Select>
              </Field>
            </div>
            <small className="safe-note">
              Never enter payment-card details here.
            </small>
          </section>
          <section className="admin-panel">
            <h2>Activity</h2>
            <div className="timeline">
              <div>
                <span />
                <p>
                  <strong>Request received</strong>
                  <small>Oct 11 · 3:42pm</small>
                </p>
              </div>
              <div>
                <span />
                <p>
                  <strong>Customer email queued</strong>
                  <small>Connection pending</small>
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function DetailSection({
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

export function AdminPortfolioPage() {
  return (
    <div className="admin-page">
      <AdminHeading
        eyebrow="Content"
        title="Portfolio"
        copy="Curate the work that tells the Aveline story."
        action={
          <Button disabled>
            <Plus size={16} /> New creation
          </Button>
        }
      />
      <div className="cms-grid">
        {creations.map((item, index) => (
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
        ))}
      </div>
    </div>
  )
}

export function AdminFaqPage() {
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

export function AdminMessagesPage() {
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

export function AdminSettingsPage() {
  return (
    <div className="admin-page">
      <AdminHeading
        eyebrow="Administration"
        title="Studio settings"
        copy="Operational defaults and connection status."
      />
      <div className="settings-grid">
        <section className="admin-panel">
          <div className="settings-icon">
            <Settings />
          </div>
          <h2>Studio details</h2>
          <p>
            Business name, contact channels, response promise, and working
            hours.
          </p>
          <dl className="side-details">
            <div>
              <dt>Business</dt>
              <dd>Aveline Gifts</dd>
            </div>
            <div>
              <dt>Response time</dt>
              <dd>1 business day</dd>
            </div>
            <div>
              <dt>Currency</dt>
              <dd>USD</dd>
            </div>
          </dl>
          <Button disabled variant="secondary">
            Edit details
          </Button>
        </section>
        <section className="admin-panel">
          <div className="settings-icon">
            <Mail />
          </div>
          <h2>Email notifications</h2>
          <p>Resend customer confirmations and staff alerts.</p>
          <div className="connection-status disconnected">
            <AlertTriangle /> Not connected
          </div>
          <Button disabled variant="secondary">
            Configure
          </Button>
        </section>
        <section className="admin-panel">
          <div className="settings-icon">
            <MessageCircle />
          </div>
          <h2>WhatsApp</h2>
          <p>Manual click-to-chat fallback; no automated messages.</p>
          <div className="connection-status">
            <Check /> Manual mode
          </div>
          <Button disabled variant="secondary">
            View setup
          </Button>
        </section>
        <section className="admin-panel">
          <div className="settings-icon">
            <CircleDollarSign />
          </div>
          <h2>Budget bands</h2>
          <p>Five customer-facing ranges from under $75 to $500+.</p>
          <div className="connection-status">
            <Check /> USD configured
          </div>
          <Button disabled variant="secondary">
            Edit ranges
          </Button>
        </section>
      </div>
    </div>
  )
}
