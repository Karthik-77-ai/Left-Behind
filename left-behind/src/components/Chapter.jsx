import { CHAPTERS, SITE_NAMES } from '../data/chapters'
import { goTo } from '../utils/scroll'

const fmt = (v, p, n) => `${Math.abs(v).toFixed(1)}° ${v >= 0 ? p : n}`
const place = (c) =>
  c.k === 's' ? `${fmt(c.la, 'N', 'S')} · ${fmt(c.lo, 'E', 'W')}` : c.k === 'o' ? 'Orbital track' : c.k === 'f' ? 'Solar orbit' : null
const tone = (f) => (/lost|silent|never|burned|declared|drift/i.test(f) ? 'bad' : 'warn')

export default function Chapter({ c, i, on }) {
  const last = i === CHAPTERS.length - 1
  const Title = c.hero ? 'h1' : 'h2'
  const loc = place(c)
  return (
    <section className={`${c.p}${on ? ' on' : ''}`} data-i={i}>
      <div className={`card${c.hero ? ' hero' : ''}`}>
        {!c.hero && <span className="ghost">{String(i).padStart(2, '0')}</span>}
        <div className="tag">{c.tag}</div>
        <Title>{c.t}</Title>
        <div className="meta">
          <span className="date">{c.d}</span>
          {loc && <span className="loc">◎ {SITE_NAMES[i] ? `${SITE_NAMES[i]} · ` : ''}{loc}</span>}
        </div>
        <p>{c.x}</p>
        {c.hero ? <div className="sub">{c.f}</div> : (
          <div className={`chip ${tone(c.f)}`}><i />{c.f.replace('STATUS · ', '')}</div>
        )}
        {i === 0 && <button className="cta" onClick={() => goTo(1)}>Begin the journey <span>↓</span></button>}
        {last && (
          <>
            <div className="stats">
              <div><b>4</b>Moon stories</div><div><b>7</b>Mars stories</div><div><b>2</b>Worlds</div>
            </div>
            <button className="cta ghostbtn" onClick={() => goTo(0)}>Replay <span>↑</span></button>
          </>
        )}
      </div>
    </section>
  )
}
