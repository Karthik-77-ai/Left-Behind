import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { PLANETS } from '../data/chapters'
import { makeTexture, textureUrl } from '../utils/textures'
import { atmosphereMaterial } from '../utils/atmosphere'
import PlaceLabels from './PlaceLabels'

export default function Planet({ name, showLabels, children }) {
  const { pos, r, base, pal, spin, glow, atm } = PLANETS[name]
  const group = useRef()
  const fallback = useMemo(() => makeTexture(base, pal), [base, pal])
  const [map, setMap] = useState(fallback)
  const shell = useMemo(() => atmosphereMaterial(glow, atm), [glow, atm])

  // Real map from src/assets/textures/<name>.jpg when present, else the procedural one
  useEffect(() => {
    const url = textureUrl(name.toLowerCase())
    if (!url) return
    new THREE.TextureLoader().load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; setMap(t) })
  }, [name])

  useFrame(({ clock }) => { group.current.rotation.y = clock.elapsedTime * spin })

  return (
    <group ref={group} position={pos}>
      <mesh onPointerOver={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <sphereGeometry args={[r, 128, 96]} />
        <meshStandardMaterial map={map} bumpMap={map} bumpScale={name === 'MOON' ? 2.2 : 1.6} roughness={0.95} metalness={0} />
      </mesh>
      <mesh scale={1.13} material={shell}><sphereGeometry args={[r, 64, 48]} /></mesh>
      <PlaceLabels name={name} show={showLabels} />
      {children}
    </group>
  )
}
