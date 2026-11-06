import { useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import Modal from './Modal.jsx'
import Media from './Media.jsx'
import { reduceMotion } from '../hooks.js'
import { PROJECTS } from '../data.js'

function Shot({ p, onOpen }) {
  const ref = useRef(null)
  const move = (e) => {
    if (reduceMotion) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-4px)`
  }
  return (
    <button ref={ref} type="button" className="shot" onClick={onOpen} aria-label={`View details about ${p.name}`}
            onMouseMove={move} onMouseLeave={() => { ref.current.style.transform = '' }}>
      <div className="bar"><i /><i /><i /><span>{p.url}</span></div>
      <Media p={p} />
    </button>
  )
}

function Project({ p, onOpen }) {
  return (
    <Reveal as="article" className={`proj${p.flip ? ' flip' : ''}`}>
      <Shot p={p} onOpen={onOpen} />
      <div>
        <h3>{p.name}</h3>
        <p className="kind">{p.kind}</p>
        <p>{p.overview}</p>
        <ul className="chips">{p.chips.map((c) => <li key={c}>{c}</li>)}</ul>
        <div className="links">
          <button type="button" className="btn primary sm" onClick={onOpen}>View details</button>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
          <a href={p.src} target="_blank" rel="noreferrer">Source code</a>
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)
  return (
    <section id="work">
      <Reveal className="sec-head">
        <h2>Selected projects</h2>
        <p>Full-stack applications with authentication, databases and role-based features. Select a project to see its details.</p>
      </Reveal>
      {PROJECTS.map((p) => <Project key={p.name} p={p} onOpen={() => setOpen(p)} />)}
      {open && <Modal p={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
