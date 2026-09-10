import {
  Activity,
  Binary,
  Boxes,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Fingerprint,
  FileSearch,
  Gauge,
  GitBranch,
  Landmark,
  Lock,
  Network,
  Radar,
  ScanLine,
  ShieldCheck,
  Siren,
  Terminal,
  Waypoints,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MARQUEE_ROW_A, MARQUEE_ROW_B } from '../lib/data'
import { usePrefersReducedMotion } from '../components/primitives'

const ICONS: Record<string, LucideIcon> = {
  'Azure Policy': ShieldCheck,
  'Microsoft Sentinel': Radar,
  'Vertex AI': BrainCircuit,
  'Gemini Enterprise': Boxes,
  'Power BI': Gauge,
  'Network Security Groups': Network,
  Firebase: Database,
  'Logic Apps': Workflow,
  Python: Terminal,
  Flask: GitBranch,
  'Cloud Governance': Cloud,
  'FTK Imager': ScanLine,
  Autopsy: FileSearch,
  ClamAV: Siren,
  'Chain of Custody': Fingerprint,
  'ISO/IEC 27037': Landmark,
  'ACPO Guidelines': Landmark,
  'Windows Registry': Binary,
  GDPR: Lock,
  'Threat Modelling': Waypoints,
  'Arduino ESP32': Cpu,
}

function Tile({ label, tone }: { label: string; tone: 'violet' | 'ember' }) {
  const Icon = ICONS[label] ?? Activity
  const glow =
    tone === 'violet'
      ? 'radial-gradient(120% 130% at 12% 0%, rgba(118,33,176,0.30) 0%, transparent 62%)'
      : 'radial-gradient(120% 130% at 12% 0%, rgba(190,76,0,0.26) 0%, transparent 62%)'

  return (
    <div
      className="glass relative flex h-[104px] w-[270px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-5 sm:h-[118px] sm:w-[310px]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <Icon
        size={22}
        strokeWidth={1.4}
        className={tone === 'violet' ? 'relative text-[#C08BE8]' : 'relative text-[#E8A276]'}
      />
      <span className="relative text-[0.95rem] font-medium leading-tight text-mist sm:text-base">
        {label}
      </span>
    </div>
  )
}

export default function Marquee() {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  const rowA = [...MARQUEE_ROW_A, ...MARQUEE_ROW_A, ...MARQUEE_ROW_A]
  const rowB = [...MARQUEE_ROW_B, ...MARQUEE_ROW_B, ...MARQUEE_ROW_B]

  return (
    <section
      ref={ref}
      className="relative bg-ink pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: 'clip' }}
    >
      <div className="mb-8 px-5 sm:px-8 md:px-10">
        <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
          What I work with
        </span>
      </div>

      <div className="edge-fade-x flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {rowA.map((label, i) => (
            <Tile key={`a-${i}`} label={label} tone="violet" />
          ))}
        </div>

        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {rowB.map((label, i) => (
            <Tile key={`b-${i}`} label={label} tone="ember" />
          ))}
        </div>
      </div>
    </section>
  )
}
