import * as THREE from 'three'

// Procedural cratered surface texture (swap for real NASA maps in /public if you like)
export function makeTexture(base, pal, n = 600) {
  const k = document.createElement('canvas')
  k.width = 1024
  k.height = 512
  const x = k.getContext('2d')
  x.fillStyle = base
  x.fillRect(0, 0, 1024, 512)
  for (let i = 0; i < n; i++) {
    const px = Math.random() * 1024, py = Math.random() * 512, r = 4 + Math.random() * 50
    x.fillStyle = pal[i % 2] + (0.05 + Math.random() * 0.12) + ')'
    x.beginPath(); x.arc(px, py, r, 0, 7); x.fill()
    if (i % 3 === 0) {
      x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = 2
      x.beginPath(); x.arc(px, py, r * 0.6, 0, 7); x.stroke()
    }
  }
  const t = new THREE.CanvasTexture(k)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function surfacePos(lat, lon, r) {
  const a = (lat * Math.PI) / 180, o = (lon * Math.PI) / 180
  return [Math.cos(a) * Math.cos(o) * r * 1.01, Math.sin(a) * r * 1.01, -Math.cos(a) * Math.sin(o) * r * 1.01]
}

// Any file dropped in src/assets/textures named moon.* / mars.* is used automatically
const FILES = import.meta.glob('../assets/textures/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
export const textureUrl = (name) =>
  Object.entries(FILES).find(([k]) => new RegExp(`/${name}\\.`, 'i').test(k))?.[1]
