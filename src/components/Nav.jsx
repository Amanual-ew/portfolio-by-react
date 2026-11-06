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
        <nav aria-label="Main">
          {LINKS.map(([id, t]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'act' : ''}>{t}</a>
          ))}
          <ThemeToggle />
          <a className="cta" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}