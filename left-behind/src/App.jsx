import { useEffect, useRef, useState } from 'react'
import { setAmbient, ping } from './utils/ambient'
import { CHAPTERS } from './data/chapters'
import useActiveChapter from './hooks/useActiveChapter'
import Scene from './components/Scene'
import Hud from './components/Hud'
import Chapter from './components/Chapter'

export default function App() {
  const cur = useActiveChapter(CHAPTERS.length)
  const [sound, setSound] = useState(false)
  const first = useRef(true)
  const toggle = () => { setAmbient(!sound); setSound(!sound) }
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (sound) ping()
  }, [cur]) // eslint-disable-line
  useEffect(() => {
    const a = { MOON: '#8fd3ff', MARS: '#ff8a55' }[CHAPTERS[cur].p] || '#c9b8ff'
    document.documentElement.style.setProperty('--accent', a)
  }, [cur])
  return (
    <>
      <Scene cur={cur} />
      <div className="vignette" />
      <Hud cur={cur} sound={sound} onSound={toggle} />
      <main>
        {CHAPTERS.map((c, i) => <Chapter key={i} c={c} i={i} on={i === cur} />)}
      </main>
    </>
  )
}
