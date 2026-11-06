import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about">
      <div className="about">
        <div className="about-side">
          <Reveal as="h2">About me</Reveal>
          <Reveal delay={120}>
            <img
              className="about-photo"
              src="/profile2.png"
              alt="Amanual Ewunetu"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </Reveal>
        </div>
        <Reveal delay={150}>
          <p>I’m a Computer Science graduate who likes turning everyday problems into working software. My projects start from things I see around me: finding a car to rent, ordering a meal, running deliveries for a small city.</p>
          <p>I’m looking for a team where I can ship real features, learn from code reviews and keep growing as an engineer.</p>
          <ul className="edu">
            <li>BSc in Computer Science<span>Debre Tabor University</span></li>
            <li>Full Stack Development (in progress)<span>IBT College, Addis Ababa</span></li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}