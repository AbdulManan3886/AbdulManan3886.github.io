import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './components/primitives'
import About from './sections/About'
import Capabilities from './sections/Capabilities'
import Contact from './sections/Contact'
import Credentials from './sections/Credentials'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Projects from './sections/Projects'
import Stats from './sections/Stats'

/* Thin reading-progress rule pinned to the top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #B600A8 0%, #7621B0 55%, #BE4C00 100%)',
      }}
    />
  )
}

/* A soft ring that trails the pointer — augments the native cursor, never replaces it. */
function CursorHalo() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [pos, setPos] = useState({ x: -200, y: -200 })

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[65] h-[260px] w-[260px] rounded-full"
      animate={{ x: pos.x - 130, y: pos.y - 130 }}
      transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 0.6 }}
      style={{
        background:
          'radial-gradient(circle, rgba(182,0,168,0.13) 0%, rgba(118,33,176,0.07) 38%, transparent 68%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

export default function App() {
  return (
    <main id="top" className="grain relative bg-ink" style={{ overflowX: 'clip' }}>
      <ScrollProgress />
      <CursorHalo />
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Capabilities />
      <Projects />
      <Experience />
      <Credentials />
      <Contact />
    </main>
  )
}
