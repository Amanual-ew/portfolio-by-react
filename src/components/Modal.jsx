import { useEffect, useRef } from 'react'
import Media from './Media.jsx'

export default function Modal({ p, onClose }) {
  const box = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    box.current.querySelector('.x').focus()

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const items = box.current.querySelectorAll('a[href], button')
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      if (previous && previous.focus) previous.focus()
    }
  }, [])

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" ref={box} onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Close project details">×</button>
        <Media p={p} modal />
        <div className="mbody">
          <h3 id="pm-title">{p.name}</h3>
          <p className="kind">{p.kind}</p>
          <p>{p.overview}</p>
          <h4>Key features</h4>
          <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h4>Built with</h4>
          <ul className="chips">{p.chips.map((c) => <li key={c}>{c}</li>)}</ul>
          <div className="btns">
            {p.live && <a className="btn primary" href={p.live} target="_blank" rel="noreferrer">Visit live demo</a>}
            <a className="btn" href={p.src} target="_blank" rel="noreferrer">View source code</a>
          </div>
        </div>
      </div>
    </div>
  )
}
