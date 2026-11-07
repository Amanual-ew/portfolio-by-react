import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { useActive, useProgress } from './hooks.js'
import { PHONE, TECH } from './data.js'

export default function App() {
  const progress = useProgress()
  const active = useActive(['work', 'skills', 'about', 'contact'])
  const loop = [...TECH, ...TECH]
  const [message, setMessage] = useState('')

  const handleSendMessage = (event) => {
    event.preventDefault()
    const text = message.trim()

    if (!text) return

    const url = `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setMessage('')
  }

  useEffect(() => {
    const targetId = window.location.hash.replace('#', '') || new URLSearchParams(window.location.search).get('section')
    const target = targetId ? document.getElementById(targetId) : null

    if (!target) return

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <>
      <div className="flag" aria-hidden="true"><i /><i /><i /></div>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Nav active={active} />
      <main className="wrap">
        <Hero />
        <div className="marq" aria-hidden="true">
          <div>{loop.map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <div className="footer-brand">
            <span className="mini-mark">AE</span>
            <span>Amanual Ewunetu</span>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="footer-meta footer-meta--stack">
            <div className="footer-form-card">
              <span className="footer-form-label">Quick message</span>
              <form className="footer-form" onSubmit={handleSendMessage}>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write your message..."
                  rows="2"
                  aria-label="Write your message"
                />
                <button type="submit">Send</button>
              </form>
            </div>
            <div className="footer-copy">
              <span>© 2026</span>
              <span>Built with React + Vite</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
