import { Button } from "../../components/UI"
import { AdminHeading, AdminCmsCards } from "./shared"
import { Plus } from "lucide-react"

export default function AdminPortfolioPage() {
  return (
    <div className="admin-page">
      <AdminHeading
        eyebrow="Content"
        title="Portfolio"
        copy="Curate the work that tells the LoveZrap story."
        action={
          <Button disabled>
            <Plus size={16} /> New creation
          </Button>
        }
      />
      <div className="cms-grid">{AdminCmsCards()}</div>
    </div>
  )
}
