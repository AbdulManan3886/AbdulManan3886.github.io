import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import { useInView } from 'framer-motion'
import { Suspense, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../primitives'

const VIOLET = '#7621B0'
const MAGENTA = '#B600A8'
const EMBER = '#BE4C00'
const STEEL = '#BBCCD7'

/* ------------------------------------------------------------------ */
/* Shared canvas shell — only renders frames while on screen           */
/* ------------------------------------------------------------------ */

function SceneShell({
  children,
  className,
  camera = { position: [0, 0, 6] as [number, number, number], fov: 45 },
}: {
  children: ReactNode
  className?: string
  camera?: { position: [number, number, number]; fov: number }
}) {
  const host = useRef<HTMLDivElement>(null)
  const inView = useInView(host, { margin: '160px' })
  const reduced = usePrefersReducedMotion()

  return (
    <div ref={host} className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={camera}
        frameloop={inView && !reduced ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pointer-driven camera parallax                                      */
/* ------------------------------------------------------------------ */

function CameraRig({ amount = 0.7 }: { amount?: number }) {
  const { camera, pointer } = useThree()
  const base = useRef(camera.position.clone())
  useFrame((_, dt) => {
    const t = Math.min(1, dt * 2.2)
    camera.position.x += (base.current.x + pointer.x * amount - camera.position.x) * t
    camera.position.y += (base.current.y + pointer.y * amount * 0.6 - camera.position.y) * t
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ------------------------------------------------------------------ */
/* Drifting particle cloud                                             */
/* ------------------------------------------------------------------ */

function Dust({ count = 900, radius = 9, color = STEEL, size = 0.022 }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Even-ish spherical shell distribution, biased toward the outside
      const r = radius * Math.cbrt(0.25 + Math.random() * 0.75)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.024
    ref.current.rotation.x = Math.sin(t * 0.09) * 0.06
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/* ------------------------------------------------------------------ */
/* Hero — a wireframe core, orbiting shards and a soft distorted blob  */
/* ------------------------------------------------------------------ */

function HeroCore() {
  const knot = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const cage = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (knot.current) {
      knot.current.rotation.x = t * 0.11
      knot.current.rotation.y = t * 0.16
    }
    if (ring.current) {
      ring.current.rotation.z = -t * 0.2
      ring.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.3) * 0.12
    }
    if (cage.current) {
      cage.current.rotation.y = -t * 0.07
      cage.current.rotation.z = t * 0.04
    }
  })

  return (
    <group>
      {/* Outer wireframe cage */}
      <mesh ref={cage} scale={4.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.085} />
      </mesh>

      {/* Torus knot core — sits behind the portrait, so it stays quiet */}
      <mesh ref={knot} scale={0.5} position={[3.9, -0.4, -2.6]}>
        <torusKnotGeometry args={[1.15, 0.24, 200, 28]} />
        <MeshDistortMaterial
          color={VIOLET}
          emissive={MAGENTA}
          emissiveIntensity={0.3}
          roughness={0.28}
          metalness={0.88}
          distort={0.22}
          speed={1}
          transparent
          opacity={0.72}
        />
      </mesh>

      {/* Halo ring, echoing the ring behind the portrait */}
      <mesh ref={ring} scale={3.15} position={[0, -0.15, -1.2]}>
        <torusGeometry args={[1, 0.006, 12, 160]} />
        <meshBasicMaterial color={EMBER} transparent opacity={0.17} />
      </mesh>
    </group>
  )
}

function Shards() {
  const items = useMemo(
    () =>
      [
        { p: [-3.4, 1.5, -1.2], s: 0.42, c: MAGENTA, geo: 'octa' },
        { p: [3.5, -1.2, -0.6], s: 0.34, c: EMBER, geo: 'tetra' },
        { p: [2.7, 1.9, -2.4], s: 0.28, c: STEEL, geo: 'icosa' },
        { p: [-2.9, -1.9, -2.0], s: 0.5, c: VIOLET, geo: 'box' },
        { p: [4.4, 0.6, -3.2], s: 0.22, c: STEEL, geo: 'octa' },
        { p: [-4.6, 0.1, -2.6], s: 0.3, c: MAGENTA, geo: 'tetra' },
      ] as const,
    [],
  )

  return (
    <>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={1.1 + i * 0.17}
          rotationIntensity={0.9}
          floatIntensity={1.3}
          floatingRange={[-0.28, 0.28]}
        >
          <mesh position={it.p as unknown as [number, number, number]} scale={it.s}>
            {it.geo === 'octa' && <octahedronGeometry args={[1, 0]} />}
            {it.geo === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
            {it.geo === 'icosa' && <icosahedronGeometry args={[1, 0]} />}
            {it.geo === 'box' && <boxGeometry args={[1, 1, 1]} />}
            <meshStandardMaterial
              color={it.c}
              emissive={it.c}
              emissiveIntensity={0.3}
              roughness={0.18}
              metalness={0.9}
              flatShading
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export function HeroScene({ className }: { className?: string }) {
  return (
    <SceneShell className={className} camera={{ position: [0, 0, 7], fov: 42 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={1.5} color="#ffd9c0" />
      <pointLight position={[-5, -2, 3]} intensity={40} color={MAGENTA} distance={18} />
      <pointLight position={[5, 3, -2]} intensity={30} color={VIOLET} distance={20} />
      <CameraRig amount={0.85} />
      <HeroCore />
      <Shards />
      <Dust count={1100} radius={10} />
      <fog attach="fog" args={['#0C0C0C', 8, 20]} />
    </SceneShell>
  )
}

/* ------------------------------------------------------------------ */
/* About — four slow objects parked toward the corners                 */
/* ------------------------------------------------------------------ */

function CornerObject({
  position,
  scale,
  color,
  geo,
  speed,
}: {
  position: [number, number, number]
  scale: number
  color: string
  geo: 'torus' | 'icosa' | 'knot' | 'dodeca'
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.y = t * 0.55
  })
  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        {geo === 'torus' && <torusGeometry args={[1, 0.36, 24, 90]} />}
        {geo === 'icosa' && <icosahedronGeometry args={[1, 0]} />}
        {geo === 'knot' && <torusKnotGeometry args={[0.8, 0.26, 140, 24]} />}
        {geo === 'dodeca' && <dodecahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.22}
          roughness={0.16}
          metalness={0.92}
          flatShading={geo === 'icosa' || geo === 'dodeca'}
        />
      </mesh>
    </Float>
  )
}

export function AboutScene({ className }: { className?: string }) {
  return (
    <SceneShell className={className} camera={{ position: [0, 0, 9], fov: 45 }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} color="#ffe6d5" />
      <pointLight position={[-6, 2, 2]} intensity={45} color={MAGENTA} distance={22} />
      <pointLight position={[6, -2, 2]} intensity={35} color={EMBER} distance={22} />
      <CameraRig amount={0.45} />
      <CornerObject position={[-6.2, 3.1, -1.2]} scale={0.5} color={STEEL} geo="icosa" speed={0.5} />
      <CornerObject position={[6.3, 3.0, -1.6]} scale={0.42} color={MAGENTA} geo="torus" speed={0.42} />
      <CornerObject position={[-5.6, -3.2, -1.4]} scale={0.4} color={VIOLET} geo="dodeca" speed={0.6} />
      <CornerObject position={[5.8, -3.1, -1.2]} scale={0.38} color={EMBER} geo="knot" speed={0.38} />
      <Dust count={450} radius={11} size={0.018} />
    </SceneShell>
  )
}

/* ------------------------------------------------------------------ */
/* Contact — a slow wireframe globe                                    */
/* ------------------------------------------------------------------ */

function Globe() {
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (outer.current) {
      outer.current.rotation.y = t * 0.09
      outer.current.rotation.x = 0.35
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.14
      inner.current.rotation.z = t * 0.05
    }
  })
  return (
    <group>
      <mesh ref={outer} scale={2.6}>
        <sphereGeometry args={[1, 26, 18]} />
        <meshBasicMaterial color={STEEL} wireframe transparent opacity={0.14} />
      </mesh>
      <mesh ref={inner} scale={1.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={MAGENTA}
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </group>
  )
}

export function ContactScene({ className }: { className?: string }) {
  return (
    <SceneShell className={className} camera={{ position: [0, 0, 7], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 4]} intensity={40} color={EMBER} distance={20} />
      <pointLight position={[-4, -3, 3]} intensity={40} color={VIOLET} distance={20} />
      <CameraRig amount={0.5} />
      <Globe />
      <Dust count={500} radius={8} size={0.02} color={EMBER} />
    </SceneShell>
  )
}
