import { useState } from 'react'

// Shows the project's screenshot. If the image file is missing it tries the live site's
// preview image, and if that also fails it shows the styled placeholder.
export default function Media({ p, modal = false }) {
  const [src, setSrc] = useState(p.image)
  const [failed, setFailed] = useState(!p.image)

  if (failed) {
    return (
      <div className={`mock ${modal ? 'mm ' : ''}${p.cls}`}>
        {!modal && <span className="peek">View details</span>}
        <em>{p.eyebrow}</em>
        <b>{p.title}</b>
        {!modal && <div className="row"><u /><u /><u /></div>}
      </div>
    )
  }

  return (
    <div className={`pimg${modal ? ' pm' : ''}`}>
      {!modal && <span className="peek">View details</span>}
      <img
        src={src}
        alt={`${p.name} preview`}
        loading="lazy"
        onError={() => {
          if (p.fallback && src !== p.fallback) setSrc(p.fallback)
          else setFailed(true)
        }}
      />
    </div>
  )
}
