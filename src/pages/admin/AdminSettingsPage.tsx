import {
  AlertTriangle,
  Check,
  CircleDollarSign,
  Mail,
  MessageCircle,
  Settings,
} from "lucide-react"
import { Button } from "../../components/UI"
import { AdminHeading } from "./shared"

export default function AdminSettingsPage() {
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
              <dd>LoveZrap</dd>
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
