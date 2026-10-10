import { CHAPTERS } from '../data/chapters'
import { goTo } from '../utils/scroll'

export default function Hud({ cur, sound, onSound }) {
  const last = CHAPTERS.length - 1
  const pad = (n) => String(n).padStart(2, '0')
  const c = CHAPTERS[cur]
  return (
    <>
      <div className="bar" style={{ width: `${(cur / last) * 100}%` }} />
      <header className="hud">
        <div className="brand"><i /> LEFT BEHIND</div>
        <div className="now" key={cur}>{c.hero ? '' : c.t}</div>
        <div className="right">
          <button className={`snd${sound ? ' on' : ''}`} onClick={onSound} aria-pressed={sound} aria-label="Toggle ambient sound">
            <span className="eq"><i /><i /><i /><i /></span>{sound ? 'Sound on' : 'Sound off'}
          </button>
          <div className="count"><b>{pad(cur)}</b> / {pad(last)}</div>
        </div>
      </header>
      <nav className="dots">
        {CHAPTERS.map((ch, i) => (
          <button key={i} className={`${ch.p} ${i === cur ? 'a' : ''}`} aria-label={ch.t} onClick={() => goTo(i)}>
            <span>{ch.t}</span>
          </button>
        ))}
      </nav>
      <div className="hint">↑ ↓ to navigate</div>
    </>
  )
}
