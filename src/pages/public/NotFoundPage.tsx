import { LinkButton } from "../../components/UI"

export default function NotFoundPage() {
  return (
    <section className="state-page">
      <div className="state-card">
        <span className="state-number">404</span>
        <h1>This page has wandered off.</h1>
        <p>Let’s get you back to something thoughtful.</p>
        <LinkButton to="/">Return home</LinkButton>
      </div>
    </section>
  )
}
