import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  return (
    <button className="tog" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? '☀' : '☾'}
    </button>
  )
}

const LINKS = [['work', 'Projects'], ['skills', 'Skills'], ['about', 'About']]

export default function Nav({ active }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="top">
      <div className="wrap">
        <a
          className="brand"
          href="#"
          aria-label="Amanual Ewunetu, back to top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0 })
            history.replaceState(null, '', window.location.pathname)
          }}
        >
          <span className="logo" aria-hidden="true">AE</span>
          <strong>Amanual Ewunetu</strong>
        </a>

        <div className="header-actions">
          <ThemeToggle />
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main" aria-expanded={menuOpen}>
          {LINKS.map(([id, t]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'act' : ''} onClick={() => setMenuOpen(false)}>{t}</a>
          ))}
          <a className="cta" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  )
}