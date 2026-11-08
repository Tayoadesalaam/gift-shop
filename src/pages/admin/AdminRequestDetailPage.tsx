import { useState } from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
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
import { Link, useParams } from "react-router"
import {
  Button,
  Field,
  Input,
  Select,
  Textarea,
} from "../../components/UI"
import { AdminHeading, DetailSection, StatusBadge, requests } from "./shared"

export default function AdminRequestDetailPage() {
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
