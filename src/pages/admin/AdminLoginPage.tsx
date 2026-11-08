import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { ArrowRight, Eye, EyeOff, Heart } from "lucide-react"
import { Button, Field, Input, SkipLink } from "../../components/UI"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    setError(true)
  }

  return (
    <div className="login-page">
      <SkipLink href="#login-main" />
      <div className="login-brand">
        <Link to="/">
          <Heart size={18} fill="currentColor" /> LoveZrap
        </Link>
        <blockquote>“Thoughtfulness is the quiet art of noticing.”</blockquote>
        <p>Private studio operations</p>
      </div>
      <main className="login-panel" id="login-main" tabIndex={-1}>
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
                placeholder="you@lovezrap.com"
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
          <small>Access is limited to authorized LoveZrap staff.</small>
        </div>
      </main>
    </div>
  )
}
