// Procedural ambient space drone (Web Audio) — no audio files needed.
let ctx, master

function build() {
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500; lp.connect(master)
  ;[55, 82.4, 110.3, 164.8].forEach((f, i) => {
    const o = ctx.createOscillator(); o.type = i === 0 ? 'triangle' : 'sine'; o.frequency.value = f; o.detune.value = (i - 1.5) * 4
    const g = ctx.createGain(); g.gain.value = 0.11 / (i + 1)
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.04 + i * 0.03
    const lg = ctx.createGain(); lg.gain.value = g.gain.value * 0.6
    lfo.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(lp); o.start(); lfo.start()
  })
  // soft "solar wind" noise
  const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate), d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const n = ctx.createBufferSource(); n.buffer = buf; n.loop = true
  const nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = 600; nf.Q.value = 0.7
  const ng = ctx.createGain(); ng.gain.value = 0.035
  const sweep = ctx.createOscillator(); sweep.frequency.value = 0.05
  const sg = ctx.createGain(); sg.gain.value = 300; sweep.connect(sg); sg.connect(nf.frequency)
  n.connect(nf); nf.connect(ng); ng.connect(master); n.start(); sweep.start()
}

export function setAmbient(on) {
  if (on) {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)()
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination); build()
    }
    ctx.resume()
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 2)
  } else if (ctx) {
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
    setTimeout(() => ctx.suspend(), 900)
  }
}

// tiny sonar-like blip when the chapter changes
export function ping() {
  if (!ctx || ctx.state !== 'running') return
  const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime
  o.type = 'sine'; o.frequency.setValueAtTime(880, t); o.frequency.exponentialRampToValueAtTime(440, t + 0.6)
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
  o.connect(g); g.connect(master); o.start(t); o.stop(t + 1)
}
