import Reveal from './Reveal.jsx'
import { EMAIL, GITHUB, LINKEDIN, PHONE, PHONE_DISPLAY, TELEGRAM, TELEGRAM_USERNAME } from '../data.js'

// Simple line icons (24x24), drawn with the current text colour
const ICONS = {
  email: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
  whatsapp: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  telegram: (
    <>
      <path d="M21.3 4.4a1.8 1.8 0 0 0-2.2-1.7L3.3 9.1c-1.1.4-1.1 1.7 0 2l5.1 1.7 2.8 7.6c.3.9 1.5.9 1.9 0l3.2-6.1 4.8 3.5c.8.6 1.9.1 2.1-.8l2.4-13.2z" />
      <path d="M9.3 13.5l9.7-6.4" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

const WA_TEXT = encodeURIComponent('Hello Amanual, I saw your portfolio and would like to talk.')

const METHODS = [
  { icon: 'email', label: 'Email', value: EMAIL, href: `mailto:${EMAIL}?subject=${encodeURIComponent('Hello Amanual')}` },
  { icon: 'whatsapp', label: 'WhatsApp message', value: PHONE_DISPLAY, href: `https://wa.me/${PHONE.replace('+', '')}?text=${WA_TEXT}`, external: true },
  { icon: 'phone', label: 'Phone call', value: PHONE_DISPLAY, href: `tel:${PHONE}` },
  { icon: 'telegram', label: 'Telegram', value: TELEGRAM_USERNAME, href: TELEGRAM, external: true },
  { icon: 'linkedin', label: 'LinkedIn message', value: 'amanual-ewunetu', href: LINKEDIN, external: true },
  { icon: 'github', label: 'GitHub', value: 'Amanual-ew', href: GITHUB, external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <Reveal className="contact-shell">
        <div className="contact-header">
          <span className="eyebrow">Let’s connect</span>
          <h2>Build something meaningful together.</h2>
          <p>Have a project in mind, a role to fill, or a challenge to solve? Message me the way that suits you and I’ll get back to you soon.</p>
        </div>

        <div className="contact-actions">
          <a className="btn primary" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Project inquiry')}`}>
            Start a conversation
          </a>
          <a className="btn secondary" href={`https://wa.me/${PHONE.replace('+', '')}?text=${WA_TEXT}`} target="_blank" rel="noreferrer">
            WhatsApp me
          </a>
          <a className="btn secondary" href={TELEGRAM} target="_blank" rel="noreferrer">
            Telegram me
          </a>
        </div>

        <div className="cms">
          {METHODS.map((m) => (
            <a key={m.label} className="cm" href={m.href} {...(m.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <span className="ico"><Icon name={m.icon} /></span>
              <span className="cm-text">
                <small>{m.label}</small>
                <strong>{m.value}</strong>
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}