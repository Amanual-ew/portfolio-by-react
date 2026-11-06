import { useEffect, useState } from 'react'

export const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useTyping(words) {
  const [text, setText] = useState(reduceMotion ? words[0] : '')
  useEffect(() => {
    if (reduceMotion) return
    let i = 0, j = 0, deleting = false, id
    const tick = () => {
      const w = words[i]
      j += deleting ? -1 : 1
      setText(w.slice(0, j))
      let wait = deleting ? 35 : 75
      if (!deleting && j === w.length) { deleting = true; wait = 1700 }
      else if (deleting && j === 0) { deleting = false; i = (i + 1) % words.length; wait = 350 }
      id = setTimeout(tick, wait)
    }
    id = setTimeout(tick, 900)
    return () => clearTimeout(id)
  }, [])
  return text
}

export function useProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return p
}

export function useActive(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return active
}
