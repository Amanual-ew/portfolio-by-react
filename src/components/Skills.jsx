import Reveal from './Reveal.jsx'
import { SKILLS } from '../data.js'

// Small line icons (24x24) for each skill group
const ICONS = {
  Frontend: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
  Backend: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </>
  ),
  Databases: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  Tools: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
}

function GroupIcon({ name }) {
  return (
    <span className="sk-ico" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </svg>
    </span>
  )
}

export default function Skills() {
  return (
    <section id="skills">
      <Reveal className="sec-head">
        <h2>Skills</h2>
        <p>The tools I use to build and ship web applications.</p>
      </Reveal>
      <dl className="skills">
        {SKILLS.map(([group, items], n) => (
          <Reveal key={group} delay={n * 120}>
            <dt><GroupIcon name={group} />{group}</dt>
            <dd>{items.map((s, i) => <span key={s} style={{ '--i': i }}>{s}</span>)}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}