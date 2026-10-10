import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { makeTexture } from '../utils/textures'
import { atmosphereMaterial } from '../utils/atmosphere'

// Distant "home" planet for scale and mood.
export default function Earth() {
  const map = useMemo(() => makeTexture('#1d4f9c', ['rgba(46,140,76,', 'rgba(255,255,255,'], 900), [])
  const atm = useMemo(() => atmosphereMaterial('#5aa2ff', 1.6), [])
  return (
    <group position={[-42, 15, -95]}>
      <mesh><sphereGeometry args={[4, 48, 32]} /><meshStandardMaterial map={map} roughness={0.8} emissive="#08224a" /></mesh>
      <mesh scale={1.18} material={atm}><sphereGeometry args={[4, 32, 24]} /></mesh>
      <Html center position={[0, -6, 0]} zIndexRange={[4, 0]} style={{ pointerEvents: 'none' }}><div className="plabel big show" style={{ opacity: 0.6 }}>Earth</div></Html>
    </group>
  )
}
