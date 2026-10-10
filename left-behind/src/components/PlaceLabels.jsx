import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { PLACES, PLANETS } from '../data/chapters'
import { surfacePos } from '../utils/textures'

const w = new THREE.Vector3(), n = new THREE.Vector3(), cd = new THREE.Vector3()

function Label({ pl, planet, show, color }) {
  const g = useRef(), el = useRef()
  const r = PLANETS[planet].r
  const pos = surfacePos(pl.la, pl.lo, r).map((v) => v * 1.004)

  // fade labels out when they rotate onto the far side of the planet
  useFrame(({ camera }) => {
    if (!el.current) return
    g.current.getWorldPosition(w)
    n.fromArray(PLANETS[planet].pos).sub(w).negate().normalize()
    cd.copy(camera.position).sub(w).normalize()
    const facing = THREE.MathUtils.clamp((n.dot(cd) - 0.12) * 4, 0, 1)
    el.current.style.opacity = show ? facing : 0
  })

  return (
    <group ref={g} position={pos}>
      <Html center zIndexRange={[6, 0]} style={{ pointerEvents: 'none' }}>
        <div ref={el} className={`plabel${pl.big ? ' big' : ''}${pl.site ? ' site' : ''}`} style={{ '--lab': color }}>{pl.n}</div>
      </Html>
    </group>
  )
}

export default function PlaceLabels({ name, show }) {
  const color = name === 'MOON' ? '#8fd3ff' : '#ff8a55'
  return PLACES[name].map((pl) => <Label key={pl.n} pl={pl} planet={name} show={show} color={color} />)
}
