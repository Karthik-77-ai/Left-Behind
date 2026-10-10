import { useEffect, useRef, useState } from 'react'
import { goTo } from '../utils/scroll'

// Tracks which chapter section is on screen; also wires arrow / PageUp / PageDown keys.
export default function useActiveChapter(total) {
  const [cur, setCur] = useState(0)
  const ref = useRef(0)
  ref.current = cur

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur(+e.target.dataset.i)),
      { threshold: 0.55 }
    )
    document.querySelectorAll('section').forEach((s) => io.observe(s))

    const onKey = (e) => {
      const d = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : ['ArrowUp', 'PageUp'].includes(e.key) ? -1 : 0
      if (d) { e.preventDefault(); goTo(Math.max(0, Math.min(total - 1, ref.current + d))) }
    }
    addEventListener('keydown', onKey)
    return () => { io.disconnect(); removeEventListener('keydown', onKey) }
  }, [total])

  return cur
}
