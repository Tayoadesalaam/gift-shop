import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react"
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"

export function SkipLink({ href }: { href: string }) {
  return (
    <a className="skip-link" href={href}>
      Skip to content
    </a>
  )
}

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet" | "dark"
}) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function LinkButton({
  to,
  children,
  variant = "primary",
  className = "",
  arrow = false,
}: {
  to: string
  children: ReactNode
  variant?: "primary" | "secondary" | "quiet" | "dark"
  className?: string
  arrow?: boolean
}) {
  return (
    <Link className={`button button-${variant} ${className}`} to={to}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" size={17} />}
    </Link>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow?: string
  title: string
  copy?: string
  align?: "center" | "left"
}) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

export function Field({
  label,
  error,
  hint,
  children,
  required,
}: {
  label: string
  error?: string
  hint?: string
  children: ReactNode
  required?: boolean
}) {
  return (
    <label className="field">
      <span className="field-label">
        {label} {required && <span aria-hidden="true">*</span>}
      </span>
      {hint && <span className="field-hint">{hint}</span>}
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="control" {...props} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="control" {...props} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="control control-textarea" {...props} />
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <section className="page-intro">
      <div className="shell page-intro-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  )
}

export function PreviewNotice() {
  return (
    <div className="preview-notice" role="status">
      <strong>Interface preview</strong>
      <span>Sample data only. Secure services are not connected yet.</span>
    </div>
  )
}
