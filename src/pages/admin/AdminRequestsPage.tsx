import { useState } from "react"
import { Link } from "react-router"
import {
  ArrowRight,
  CalendarDays,
  Filter,
  Search,
} from "lucide-react"
import { Button, Select } from "../../components/UI"
import { AdminHeading, StatusBadge, requests } from "./shared"

export default function AdminRequestsPage() {
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
