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
  const [chatOpen, setChatOpen] = useState(false)

  const handleSendMessage = (event) => {
    event.preventDefault()
    const text = message.trim()

    if (!text) return

    const url = `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setMessage('')
    setChatOpen(false)
  }

  useEffect(() => {
    const targetId = window.location.hash.replace('#', '') || new URLSearchParams(window.location.search).get('section')
    const target = targetId ? document.getElementById(targetId) : null

    if (!target) return

    requestAnimationFrame(() => {
      const header = document.querySelector('header.top')
      const offset = header ? header.offsetHeight + 12 : 0
      const top = target.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({ top, behavior: 'smooth' })
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

          <div className="footer-meta">
            <span>© 2026</span>
            <span>Built with React + Vite</span>
          </div>
        </div>
      </footer>

      <div className="chat-widget">
        <button
          type="button"
          className="chat-toggle"
          onClick={() => setChatOpen((open) => !open)}
          aria-label="Open quick message"
        >
          <span className="chat-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 1C6.02 1 1.17 5.85 1.17 11.88c0 2.1.55 4.15 1.6 5.96L1 23l5.32-1.6a10.9 10.9 0 0 0 5.73 1.7h.01c6.03 0 10.88-4.85 10.88-10.89 0-2.91-1.13-5.66-3.42-7.73Zm-8.47 16.7h-.01c-1.84 0-3.66-.5-5.26-1.44l-.38-.22-3.16.95 1-3.08-.25-.39A8.92 8.92 0 0 1 3.1 11.9a8.95 8.95 0 1 1 15.4 6.4l-.35.43-.93 1.06 1 1.29-.2.2-.12.13a8.88 8.88 0 0 1-5.67 2.08Zm5.03-6.67c-.28-.14-1.66-.82-1.91-.91-.25-.1-.43-.14-.6.14-.17.28-.67.91-.82 1.1-.15.18-.3.2-.58.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.3.42-.45.14-.14.18-.25.28-.42.09-.17.05-.32-.02-.45-.07-.14-.6-1.42-.82-1.94-.22-.52-.44-.45-.6-.46h-.52a1 1 0 0 0-.72.34c-.25.28-.95.93-.95 2.28s.97 2.64.11 5.67c.76 1.31 1.7 2.69 3.17 3.72.94.67 1.63 1.08 2.2 1.39a3.91 3.91 0 0 0 1.82.13c.56-.08 1.66-.68 1.9-1.34.25-.66.25-1.24.17-1.36-.08-.11-.28-.18-.6-.32Z"/>
            </svg>
          </span>
          Message
        </button>

        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <span>Quick message</span>
              <button type="button" className="chat-close" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button>
            </div>
            <form className="chat-form" onSubmit={handleSendMessage}>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write your message..."
                rows="3"
                aria-label="Write your message"
              />
              <button type="submit">Send on WhatsApp</button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
