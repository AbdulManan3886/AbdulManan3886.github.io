import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

/* ------------------------------------------------------------------ */
/* FadeIn — scroll-triggered entrance, fires once                      */
/* ------------------------------------------------------------------ */

type FadeInProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: 'div' | 'section' | 'span' | 'li' | 'p' | 'h1' | 'h2' | 'h3' | 'nav' | 'article'
  id?: string
}

export function FadeIn({
  children,
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  id,
}: FadeInProps) {
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* Magnet — cursor-following magnetic pull                             */
/* ------------------------------------------------------------------ */

type MagnetProps = {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
  innerClassName?: string
  activeTransition?: string
  inactiveTransition?: string
  disabled?: boolean
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
  innerClassName,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  disabled = false,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (disabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const withinX = Math.abs(e.clientX - cx) < rect.width / 2 + padding
      const withinY = Math.abs(e.clientY - cy) < rect.height / 2 + padding

      if (withinX && withinY) {
        setActive(true)
        setOffset({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength })
      } else if (active) {
        setActive(false)
        setOffset({ x: 0, y: 0 })
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [active, padding, strength, disabled])

  return (
    <div ref={ref} className={className}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: active ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* AnimatedText — per-character scroll reveal                          */
/* ------------------------------------------------------------------ */

function Char({
  char,
  range,
  progress,
}: {
  char: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="relative inline-block whitespace-pre">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  )
}

export function AnimatedText({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = useMemo(() => text.split(' '), [text])
  const total = text.length

  let cursor = 0
  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const start = cursor
        cursor += word.length + 1
        return (
          <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
            {word.split('').map((char, ci) => {
              const from = (start + ci) / total
              const to = (start + ci + 1) / total
              return (
                <Char key={ci} char={char} range={[from, to]} progress={scrollYProgress} />
              )
            })}
            <Char
              char=" "
              range={[(start + word.length) / total, (start + word.length + 1) / total]}
              progress={scrollYProgress}
            />
          </span>
        )
      })}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function ContactButton({
  label = 'Get in touch',
  href = '#contact',
  className = '',
}: {
  label?: string
  href?: string
  className?: string
}) {
  return (
    <Magnet padding={90} strength={5} className="inline-block">
      <a
        href={href}
        className={`btn-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
      >
        {label}
      </a>
    </Magnet>
  )
}

export function GhostButton({
  label,
  href,
  className = '',
  icon,
}: {
  label: string
  href?: string
  className?: string
  icon?: ReactNode
}) {
  const cls = `btn-ghost inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-widest sm:px-8 sm:py-3 sm:text-sm ${className}`
  if (!href) return <span className={cls}>{label}</span>
  return (
    <a
      className={cls}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
    >
      {label}
      {icon}
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* Counter — number ticks up once in view                              */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  prefix = '',
  suffix = '',
  duration = 1.6,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 })
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (inView) mv.set(to)
  }, [inView, mv, to])

  useEffect(() => spring.on('change', (v) => setShown(Math.round(v))), [spring])

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {(reduced ? to : shown).toLocaleString('en-GB')}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* SectionHeading — the shared display heading                         */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  children,
  className = '',
  variant = 'gradient',
}: {
  children: ReactNode
  className?: string
  variant?: 'gradient' | 'ink'
}) {
  return (
    <FadeIn as="h2" y={40}>
      <span
        className={`block font-black uppercase leading-none tracking-tight ${
          variant === 'gradient' ? 'hero-heading' : 'text-ink'
        } ${className}`}
        style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
      >
        {children}
      </span>
    </FadeIn>
  )
}

/* ------------------------------------------------------------------ */
/* useReducedMotion helper                                             */
/* ------------------------------------------------------------------ */

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const on = () => setMatches(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}
