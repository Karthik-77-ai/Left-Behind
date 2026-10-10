import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CHAPTERS, PLANETS } from '../data/chapters'

// Smoothly flies the camera to whichever chapter is active.
export default function CameraRig({ cur, activeRef }) {
  const v = useMemo(() => ({
    look: new THREE.Vector3(), dp: new THREE.Vector3(), dl: new THREE.Vector3(),
    w: new THREE.Vector3(), d: new THREE.Vector3(),
  }), [])

  useFrame(({ camera, pointer }) => {
    const c = CHAPTERS[cur], { dp, dl, w, d, look } = v
    if (!c.k) {
      dp.set(0, cur ? 4 : 3, cur ? 34 : 30); dl.set(0, 0, 0)
    } else if (activeRef.current) {
      activeRef.current.getWorldPosition(w); dl.copy(w)
      if (c.k === 'f') dp.copy(w).add(d.set(1, 0.6, 4))
      else {
        d.copy(w).sub(new THREE.Vector3(...PLANETS[c.p].pos)).normalize()
        dp.copy(w).add(d.multiplyScalar(c.k === 's' ? 2.1 : 3.6)).add(new THREE.Vector3(0, 0.4, 0))
      }
    }
    dp.x += pointer.x * 0.5; dp.y += pointer.y * 0.3 // subtle mouse parallax
    camera.position.lerp(dp, 0.035)
    look.lerp(dl, 0.05)
    camera.lookAt(look)
  })
  return null
}
