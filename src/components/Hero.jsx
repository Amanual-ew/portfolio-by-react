import Reveal from './Reveal.jsx'
import { useTyping } from '../hooks.js'
import { ROLES, GLANCE, GITHUB, LINKEDIN, CV } from '../data.js'

function Word({ w, offset }) {
  return (
    <span className="word" aria-hidden="true">
      {[...w].map((c, i) => <span className="ch" key={i} style={{ '--i': offset + i }}>{c}</span>)}
    </span>
  )
}

export default function Hero() {
  const role = useTyping(ROLES)
  return (
    <div className="hero">
      <span className="blob b1" aria-hidden="true" />
      <span className="blob b2" aria-hidden="true" />
      <div>
        <Reveal as="p" className="status">Open to work: ready to take on any project or role</Reveal>
        <h1 aria-label="Amanual Ewunetu"><Word w="Amanual" offset={0} /><Word w="Ewunetu" offset={7} /></h1>
        <Reveal as="p" delay={500} className="role">{role}<span className="caret" aria-hidden="true" /></Reveal>
        <Reveal as="p" delay={650} className="lead">
          I build web applications with React, Next.js and TypeScript, backed by PostgreSQL and MySQL. My projects solve everyday problems in Ethiopia, from renting a car to ordering lunch.
        </Reveal>
        <Reveal delay={800} className="btns">
          <a className="btn primary" href="#work">View projects</a>
          <a className="btn" href={CV} download>Download CV</a>
        </Reveal>
        <Reveal delay={900} className="links-row">
          <a href={GITHUB}>GitHub</a>
          <a href={LINKEDIN}>LinkedIn</a>
        </Reveal>
      </div>
      <div>
        <Reveal as="dl" delay={400} className="glance">
          {GLANCE.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </Reveal>
      </div>
    </div>
  )
}
