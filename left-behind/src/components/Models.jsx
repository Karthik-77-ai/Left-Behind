import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Low-poly procedural spacecraft (≈0.3 world units wide). No external model files.
const M = {
  gold: <meshStandardMaterial color="#d3a73c" metalness={0.55} roughness={0.35} emissive="#4a3406" />,
  foil: <meshStandardMaterial color="#e8b94a" metalness={0.7} roughness={0.25} emissive="#5a4208" />,
  steel: <meshStandardMaterial color="#c5ccd8" metalness={0.5} roughness={0.4} emissive="#1c222c" />,
  dark: <meshStandardMaterial color="#262c38" metalness={0.3} roughness={0.8} />,
  panel: <meshStandardMaterial color="#1f4fa8" metalness={0.6} roughness={0.3} emissive="#0a1f55" />,
  white: <meshStandardMaterial color="#f4f4f4" roughness={0.5} emissive="#333" />,
}
const Wheel = ({ p, r = 0.035, w = 0.025 }) => (
  <mesh position={p} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r, r, w, 14]} />{M.dark}</mesh>
)
const Legs = ({ n = 4, spread = 0.16, h = 0.2, mat = M.steel }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + Math.PI / n
    return (
      <mesh key={i} position={[Math.cos(a) * spread * 0.9, h / 2 - 0.02, Math.sin(a) * spread * 0.9]}
        rotation={[-Math.sin(a) * 0.5, 0, Math.cos(a) * 0.5]}>
        <cylinderGeometry args={[0.007, 0.007, h, 6]} />{mat}
      </mesh>
    )
  })}</>
)

function Heli() {
  const rotor = useRef()
  useFrame(({ clock }) => { if (rotor.current) rotor.current.rotation.y = clock.elapsedTime * 3 })
  return (
    <group>
      <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.06, 0.07, 0.06]} />{M.white}</mesh>
      <mesh position={[0, 0.15, 0]} rotation={[0, 0.4, 0]}><boxGeometry args={[0.09, 0.008, 0.09]} />{M.panel}</mesh>
      <mesh position={[0, 0.19, 0]}><cylinderGeometry args={[0.004, 0.004, 0.08, 6]} />{M.steel}</mesh>
      <group ref={rotor}>
        <mesh position={[0, 0.215, 0]}><boxGeometry args={[0.24, 0.003, 0.014]} />{M.dark}</mesh>
        <mesh position={[0, 0.235, 0]} rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[0.24, 0.003, 0.014]} />{M.dark}</mesh>
      </group>
      <Legs n={4} spread={0.07} h={0.12} />
    </group>
  )
}

export default function Craft({ type }) {
  switch (type) {
    case 'lm': // Apollo lunar module descent stage + flag
      return (
        <group>
          <mesh position={[0, 0.09, 0]}><cylinderGeometry args={[0.1, 0.12, 0.1, 8]} />{M.foil}</mesh>
          <mesh position={[0, 0.17, 0]}><cylinderGeometry args={[0.07, 0.1, 0.06, 8]} />{M.gold}</mesh>
          <Legs n={4} spread={0.17} h={0.2} />
          {[0, 1, 2, 3].map((i) => <mesh key={i} position={[Math.cos(i * 1.57 + 0.78) * 0.2, 0.01, Math.sin(i * 1.57 + 0.78) * 0.2]}><cylinderGeometry args={[0.025, 0.025, 0.012, 10]} />{M.steel}</mesh>)}
          <mesh position={[0.22, 0.14, 0.05]}><cylinderGeometry args={[0.003, 0.003, 0.28, 5]} />{M.steel}</mesh>
          <mesh position={[0.25, 0.24, 0.05]}><boxGeometry args={[0.06, 0.04, 0.004]} />{M.white}</mesh>
        </group>
      )
    case 'rover': // Lunar Roving Vehicle
      return (
        <group>
          <mesh position={[0, 0.09, 0]}><boxGeometry args={[0.2, 0.025, 0.12]} />{M.steel}</mesh>
          <mesh position={[-0.03, 0.12, 0]}><boxGeometry args={[0.06, 0.03, 0.1]} />{M.white}</mesh>
          {[[-0.09, 0.045, 0.085], [0.09, 0.045, 0.085], [-0.09, 0.045, -0.085], [0.09, 0.045, -0.085]].map((p, i) => <Wheel key={i} p={p} r={0.045} w={0.03} />)}
          <mesh position={[0.08, 0.15, 0]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.005, 0.005, 0.14, 6]} />{M.steel}</mesh>
          <mesh position={[0.11, 0.21, 0]} rotation={[0, 0, 0.9]}><coneGeometry args={[0.05, 0.03, 16]} />{M.white}</mesh>
        </group>
      )
    case 'ball':
      return <group><mesh position={[0, 0.03, 0]}><sphereGeometry args={[0.04, 16, 16]} />{M.white}</mesh><mesh position={[0.09, 0.03, 0.05]}><sphereGeometry args={[0.04, 16, 16]} />{M.white}</mesh></group>
    case 'snoopy': // LM ascent stage, tumbling in solar orbit
      return (
        <group position={[0, 0.1, 0]}>
          <mesh><icosahedronGeometry args={[0.12, 0]} />{M.foil}</mesh>
          <mesh position={[0, -0.14, 0]}><cylinderGeometry args={[0.02, 0.05, 0.08, 10]} />{M.dark}</mesh>
          <mesh position={[0.05, 0.1, 0.05]} rotation={[0.3, 0, -0.4]}><cylinderGeometry args={[0.004, 0.004, 0.2, 5]} />{M.steel}</mesh>
          <mesh position={[0, 0.02, 0.12]}><boxGeometry args={[0.07, 0.05, 0.02]} />{M.dark}</mesh>
        </group>
      )
    case 'orbiter': // Mars orbiters (Observer, Climate Orbiter, MAVEN)
      return (
        <group position={[0, 0.1, 0]}>
          <mesh><boxGeometry args={[0.14, 0.1, 0.1]} />{M.foil}</mesh>
          <mesh position={[0.25, 0, 0]}><boxGeometry args={[0.32, 0.008, 0.12]} />{M.panel}</mesh>
          <mesh position={[-0.25, 0, 0]}><boxGeometry args={[0.32, 0.008, 0.12]} />{M.panel}</mesh>
          <mesh position={[0.09, 0, 0]}><boxGeometry args={[0.04, 0.012, 0.012]} />{M.steel}</mesh>
          <mesh position={[-0.09, 0, 0]}><boxGeometry args={[0.04, 0.012, 0.012]} />{M.steel}</mesh>
          <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.07, 0.015, 0.035, 20]} />{M.white}</mesh>
          <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.006, 0.006, 0.05, 6]} />{M.steel}</mesh>
        </group>
      )
    case 'lander': // Mars Polar Lander
      return (
        <group>
          <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.1, 0.12, 0.05, 6]} />{M.foil}</mesh>
          <mesh position={[0.13, 0.14, 0]} rotation={[0, 0, 0.15]}><cylinderGeometry args={[0.09, 0.09, 0.008, 20]} />{M.panel}</mesh>
          <mesh position={[-0.13, 0.14, 0]} rotation={[0, 0, -0.15]}><cylinderGeometry args={[0.09, 0.09, 0.008, 20]} />{M.panel}</mesh>
          <mesh position={[0, 0.19, 0]}><cylinderGeometry args={[0.005, 0.005, 0.1, 6]} />{M.steel}</mesh>
          <Legs n={3} spread={0.16} h={0.2} />
        </group>
      )
    case 'mer': // Spirit / Opportunity
      return (
        <group>
          <mesh position={[0, 0.09, 0]}><boxGeometry args={[0.14, 0.05, 0.1]} />{M.gold}</mesh>
          <mesh position={[0, 0.12, 0]}><boxGeometry args={[0.22, 0.008, 0.16]} />{M.panel}</mesh>
          <mesh position={[0.04, 0.17, 0]}><cylinderGeometry args={[0.005, 0.005, 0.1, 6]} />{M.steel}</mesh>
          <mesh position={[0.04, 0.23, 0]}><boxGeometry args={[0.04, 0.02, 0.05]} />{M.dark}</mesh>
          {[-0.08, 0, 0.08].flatMap((x) => [0.09, -0.09].map((z) => <Wheel key={x + '' + z} p={[x, 0.035, z]} r={0.035} w={0.025} />))}
        </group>
      )
    case 'heli':
      return <Heli />
    default:
      return null
  }
}
