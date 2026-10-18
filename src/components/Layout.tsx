import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router"
import {
  CircleHelp,
  Gift,
  LayoutDashboard,
  Menu,
  MessageSquare,
  PackageOpen,
  Settings,
  Sparkles,
  X,
} from "lucide-react"
import { brand } from "../data/content"
import { LinkButton, PreviewNotice } from "./UI"

const publicLinks = [
  { to: "/our-creations", label: "Our Creations" },
  { to: "/about", label: "About" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
]

export function PublicLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.pathname])

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="wordmark" to="/" aria-label={`${brand.name} home`}>
            <Sparkles size={16} strokeWidth={1.5} aria-hidden="true" />
            <span>{brand.name}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {publicLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <LinkButton to="/create-gift" className="header-cta">
              Create a Gift
            </LinkButton>
            <button
              className="menu-button"
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {publicLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/create-gift">Create a Gift</NavLink>
          </nav>
        )}
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand">
            <Link className="wordmark wordmark-light" to="/">
              <Sparkles size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{brand.name}</span>
            </Link>
            <p>{brand.tagline}</p>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <Link to="/our-creations">Our Creations</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/faqs">Frequently Asked</Link>
          </div>
          <div>
            <p className="footer-label">Get in touch</p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <Link to="/contact">Contact us</Link>
          </div>
          <div>
            <p className="footer-label">Begin</p>
            <Link to="/create-gift">Create a Gift</Link>
            <p className="footer-small">We reply within one business day.</p>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 {brand.name}</span>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/admin/login">Staff</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const adminLinks = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/requests", label: "Requests", icon: Gift },
  { to: "/admin/portfolio", label: "Portfolio", icon: PackageOpen },
  { to: "/admin/faqs", label: "FAQs", icon: CircleHelp },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminLayout() {
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link className="wordmark" to="/">
          <Sparkles size={16} strokeWidth={1.5} aria-hidden="true" />
          <span>{brand.name}</span>
        </Link>
        <p className="admin-kicker">Studio desk</p>
        <nav aria-label="Admin navigation">
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-profile">
          <span>AM</span>
          <div>
            <strong>Amelia Moore</strong>
            <small>Administrator · Preview</small>
          </div>
        </div>
      </aside>
      <div className="admin-content">
        <PreviewNotice />
        <div className="admin-mobile-header">
          <Link className="wordmark" to="/">
            {brand.name}
          </Link>
          <Link to="/admin/requests">Requests</Link>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
