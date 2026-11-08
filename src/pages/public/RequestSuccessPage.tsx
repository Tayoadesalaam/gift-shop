import { Search } from "lucide-react"
import { Eyebrow, LinkButton } from "../../components/UI"

export default function RequestSuccessPage() {
  return (
    <section className="state-page">
      <div className="state-card">
        <Search aria-hidden="true" />
        <Eyebrow>Request status</Eyebrow>
        <h1>No recent request found.</h1>
        <p>
          A confirmation appears here only after our secure service has saved
          your request.
        </p>
        <LinkButton to="/create-gift">Create a Gift</LinkButton>
      </div>
    </section>
  )
}
