import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { CHAPTERS } from '../data/chapters'
import Planet from './Planet'
import Marker from './Marker'
import CameraRig from './CameraRig'
import Earth from './Earth'

export default function Scene({ cur }) {
  const activeRef = useRef(null)
  const markers = CHAPTERS.map((c, i) => ({ c, i })).filter(({ c }) => c.k)
  const surface = (name) => markers.filter(({ c }) => c.k === 's' && c.p === name)
  const loose = markers.filter(({ c }) => c.k !== 's')

  return (
    <Canvas className="scene" dpr={[1, 2]} camera={{ fov: 50, position: [0, 2, 30], near: 0.1, far: 500 }}>
      <ambientLight intensity={0.35} color="#667799" />
      <hemisphereLight args={['#8fa4d6', '#2a1812', 0.35]} />
      <directionalLight position={[10, 8, 12]} intensity={2.1} />
      <Stars radius={200} depth={60} count={5000} factor={6} saturation={0.4} fade />
      <Earth />

      {['MOON', 'MARS'].map((name) => (
        <Planet key={name} name={name} showLabels={CHAPTERS[cur].p === name}>
          {surface(name).map(({ c, i }) => (
            <Marker key={i} index={i} chapter={c} active={cur === i} activeRef={activeRef} />
          ))}
        </Planet>
      ))}
      {loose.map(({ c, i }) => (
        <Marker key={i} index={i} chapter={c} active={cur === i} activeRef={activeRef} />
      ))}

      <CameraRig cur={cur} activeRef={activeRef} />
    </Canvas>
  )
}
