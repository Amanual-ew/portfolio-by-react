import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { useActive, useProgress } from './hooks.js'
import { GITHUB, LINKEDIN, PHONE, TECH, TELEGRAM } from './data.js'

export default function App() {
  const progress = useProgress()
  const active = useActive(['work', 'skills', 'about', 'contact'])
  const loop = [...TECH, ...TECH]
  const footerSocials = [
    { label: 'GitHub', href: GITHUB, icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5a12 12 0 0 0-3.79 23.37c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.8.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23A11.44 11.44 0 0 1 12 7.27c1.02 0 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.61-5.5 5.9.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"/>
      </svg>
    ) },
    { label: 'LinkedIn', href: LINKEDIN, icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.87h2.88v9.63H5.5Zm5.07 0h2.76v1.32h.04c.38-.72 1.33-1.48 2.73-1.48 2.92 0 3.45 1.92 3.45 4.41v6.38h-2.88v-5.98c0-1.42-.03-3.26-1.98-3.26-1.99 0-2.29 1.55-2.29 3.15v6.09H10.57Z"/>
      </svg>
    ) },
    { label: 'WhatsApp', href: `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Amanual, I saw your portfolio and would like to talk.')}`, icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 1C6.02 1 1.17 5.85 1.17 11.88c0 2.1.55 4.15 1.6 5.96L1 23l5.32-1.6a10.9 10.9 0 0 0 5.73 1.7h.01c6.03 0 10.88-4.85 10.88-10.89 0-2.91-1.13-5.66-3.42-7.73Zm-8.47 16.7h-.01c-1.84 0-3.66-.5-5.26-1.44l-.38-.22-3.16.95 1-3.08-.25-.39A8.92 8.92 0 0 1 3.1 11.9a8.95 8.95 0 1 1 15.4 6.4l-.35.43-.93 1.06 1 1.29-.2.2-.12.13a8.88 8.88 0 0 1-5.67 2.08Zm5.03-6.67c-.28-.14-1.66-.82-1.91-.91-.25-.1-.43-.14-.6.14-.17.28-.67.91-.82 1.1-.15.18-.3.2-.58.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.3.42-.45.14-.14.18-.25.28-.42.09-.17.05-.32-.02-.45-.07-.14-.6-1.42-.82-1.94-.22-.52-.44-.45-.6-.46h-.52a1 1 0 0 0-.72.34c-.25.28-.95.93-.95 2.28s.97 2.64.11 5.67c.76 1.31 1.7 2.69 3.17 3.72.94.67 1.63 1.08 2.2 1.39a3.91 3.91 0 0 0 1.82.13c.56-.08 1.66-.68 1.9-1.34.25-.66.25-1.24.17-1.36-.08-.11-.28-.18-.6-.32Z"/>
      </svg>
    ) },
    { label: 'Telegram', href: TELEGRAM, icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.78 3.22c-.18-.18-.45-.24-.69-.17l-16.3 6.1a.9.9 0 0 0-.08 1.6l4.2 1.9 2.05 5.72a.9.9 0 0 0 1.64.1l2.4-5.04 4.62 2.21a.9.9 0 0 0 1.3-.92L20.78 3.22Zm-8.75 10.17 1.4-3.29 3.97 2.65-5.37 0.64Zm2.1-5.41-6.2 3.75-2.79-1.26 9-2.49Z"/>
      </svg>
    ) },
  ]
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
          <div className="footer-main">
            <div className="footer-brand">
              <span className="mini-mark">AE</span>
              <div className="footer-brand__text">
                <strong>Amanual Ewunetu</strong>
                <span>Frontend Developer</span>
              </div>
            </div>

            <p className="footer-copy">
              Building accessible, modern digital experiences that balance clarity, performance, and personality.
            </p>
          </div>

          <div className="footer-links-wrap">
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="#work">Work</a>
              <a href="#skills">Skills</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="footer-socials" aria-label="Social links">
              {footerSocials.map(({ label, href, icon }) => (
                <a key={label} className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-meta">
            <span className="availability"><i aria-hidden="true" /> Available for select projects</span>
            <span>© 2026</span>
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
