import { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { CRAFT, PLANETS } from '../data/chapters'
import { surfacePos } from '../utils/textures'
import { goTo } from '../utils/scroll'
import Craft from './Models'

// One chapter = one little spacecraft model + glowing halo. Hover = info popup, click = jump to chapter.
export default function Marker({ chapter, index, active, activeRef }) {
  const group = useRef(), halo = useRef(), body = useRef(), orient = useRef()
  const [hover, setHover] = useState(false)
  const p = PLANETS[chapter.p]
  const initial = chapter.k === 's' ? surfacePos(chapter.la, chapter.lo, p.r) : chapter.k === 'f' ? chapter.w : [0, 0, 0]

  // stand the craft upright on the local surface normal
  useLayoutEffect(() => {
    if (chapter.k !== 's') return
    orient.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...initial).normalize())
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (chapter.k === 'o') {
      const a = t * chapter.s
      group.current.position.set(p.pos[0] + Math.cos(a) * p.r * chapter.r, Math.sin(a * 0.7) * p.r * 0.5, Math.sin(a) * p.r * chapter.r)
      orient.current.rotation.y = a * 1.5
    }
    if (chapter.k === 'f') { orient.current.rotation.x = t * 0.4; orient.current.rotation.z = t * 0.25 }
    if (chapter.blink) body.current.visible = Math.sin(t * 9) > -0.2
    const target = active ? 1 : hover ? 0.9 : 0.5
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, target, 0.1))
    halo.current.scale.setScalar(1 + 0.45 * Math.sin(t * 4 + index))
    halo.current.material.opacity = active ? 0.28 : 0.14
    if (active) activeRef.current = group.current
  })

  return (
    <group ref={group} position={initial}>
      <group ref={orient}>
        <group ref={body}><Craft type={CRAFT[index]} /></group>
        {chapter.k === 's' && (
          <mesh position={[0, 0.5, 0]} visible={active}>
            <cylinderGeometry args={[0.004, 0.004, 1, 6]} />
            <meshBasicMaterial color={chapter.c} transparent opacity={0.5} />
          </mesh>
        )}
      </group>
      <mesh ref={halo} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color={chapter.c} transparent opacity={0.28} depthWrite={false} />
      </mesh>
      <mesh
        position={[0, 0.1, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = '' }}
        onClick={(e) => { e.stopPropagation(); goTo(index) }}
      >
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {hover && (
        <Html position={[0, 0.55, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div className={`tip ${chapter.p}`}>
            <small>{chapter.tag}</small><b>{chapter.t}</b><span>{chapter.d}</span>
            <em>{chapter.f.replace('STATUS · ', '')}</em><u>Click to read the story →</u>
          </div>
        </Html>
      )}
    </group>
  )
}
