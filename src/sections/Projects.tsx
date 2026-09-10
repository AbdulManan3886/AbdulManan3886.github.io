import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ShieldAlert, Waves } from 'lucide-react'
import { useRef } from 'react'
import { FadeIn, GhostButton, SectionHeading, useMediaQuery } from '../components/primitives'
import { PROJECTS, type Project } from '../lib/data'

/* ------------------------------------------------------------------ */
/* Per-project visuals                                                 */
/* ------------------------------------------------------------------ */

function ImageTrio({ project }: { project: Project }) {
  const img = project.images!
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
      <div className="flex flex-col gap-3 sm:col-span-2">
        <img
          src={img.a}
          alt={`${project.name} interface`}
          loading="lazy"
          className="w-full rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[50px]"
          style={{ height: 'clamp(96px, 13vh, 190px)' }}
        />
        <img
          src={img.b}
          alt={`${project.name} console`}
          loading="lazy"
          className="w-full rounded-[28px] object-cover object-top sm:rounded-[40px] md:rounded-[50px]"
          style={{ height: 'clamp(120px, 17vh, 250px)' }}
        />
      </div>
      <img
        src={img.c}
        alt={`${project.name} overview`}
        loading="lazy"
        className="w-full rounded-[28px] object-cover object-left-top sm:col-span-3 sm:rounded-[40px] md:rounded-[50px]"
        style={{ height: 'clamp(228px, 31vh, 452px)' }}
      />
    </div>
  )
}

function PhishPanel({ accent }: { accent: string }) {
  const flags = [
    { label: 'Reply-To mismatch', weight: '+28' },
    { label: 'Credential / SSO request', weight: '+24' },
    { label: 'Shortened URL in body', weight: '+18' },
    { label: 'Urgency language', weight: '+12' },
  ]
  return (
    <div className="glass overflow-hidden rounded-[28px] p-5 sm:rounded-[36px] sm:p-6 md:rounded-[44px] md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert size={20} strokeWidth={1.5} style={{ color: accent }} aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-mist/50">
            verdict
          </span>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
        >
          Phishing · 91 / 100
        </span>
      </div>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #BE4C00)` }}
          initial={{ width: '0%' }}
          whileInView={{ width: '91%' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        />
      </div>

      <ul className="mt-5 divide-y divide-white/[0.07]">
        {flags.map((f) => (
          <li key={f.label} className="flex items-center justify-between py-2.5">
            <span className="text-sm text-mist/80 sm:text-base">{f.label}</span>
            <span className="font-mono text-xs text-mist/45">{f.weight}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm font-light leading-relaxed text-mist/50">
        Every rule that fired is listed with its weight, so the analyst can disagree with the
        score instead of trusting it.
      </p>
    </div>
  )
}

function ForensicsPanel({ accent }: { accent: string }) {
  const timeline = [
    { t: '09:14', e: 'Disk image acquired · write blocker attached', tag: 'MD5 verified' },
    { t: '09:41', e: 'Registry hives extracted · USB history reviewed', tag: 'Autopsy' },
    { t: '11:02', e: 'ClamAV sweep across 26,087 files', tag: '10 detections' },
    { t: '13:26', e: 'Return-Path ≠ From on internal-looking sender', tag: 'Break' },
  ]
  return (
    <div className="glass overflow-hidden rounded-[28px] p-5 sm:rounded-[36px] sm:p-6 md:rounded-[44px] md:p-7">
      <span className="font-mono text-xs uppercase tracking-[0.24em] text-mist/50">
        chain of custody
      </span>
      <ol className="relative mt-5 border-l border-white/10 pl-6">
        {timeline.map((row, i) => (
          <motion.li
            key={row.t}
            className="relative pb-6 last:pb-0"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <span
              className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full"
              style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
            />
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-xs text-mist/45">{row.t}</span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[0.66rem] uppercase tracking-widest"
                style={{ background: `${accent}1f`, color: accent }}
              >
                {row.tag}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-mist/80 sm:text-base">{row.e}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

function IotPanel({ accent }: { accent: string }) {
  const sensors = [
    { name: 'pH', value: '7.24', bar: 62 },
    { name: 'Turbidity', value: '3.1 NTU', bar: 28 },
    { name: 'Temperature', value: '18.6 °C', bar: 47 },
    { name: 'TDS', value: '412 ppm', bar: 71 },
    { name: 'Conductivity', value: '640 µS', bar: 55 },
    { name: 'Water level', value: '84 %', bar: 84 },
  ]
  return (
    <div className="glass overflow-hidden rounded-[28px] p-5 sm:rounded-[36px] sm:p-6 md:rounded-[44px] md:p-7">
      <div className="flex items-center gap-3">
        <Waves size={20} strokeWidth={1.5} style={{ color: accent }} aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-mist/50">
          six sensors · live stream
        </span>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {sensors.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-mist/75">{s.name}</span>
              <span className="font-mono text-sm text-mist">{s.value}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: accent }}
                initial={{ width: 0 }}
                whileInView={{ width: `${s.bar}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Visual({ project }: { project: Project }) {
  if (project.images) return <ImageTrio project={project} />
  if (project.no === '02') return <PhishPanel accent={project.accent} />
  if (project.no === '03') return <ForensicsPanel accent={project.accent} />
  return <IotPanel accent={project.accent} />
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function Card({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  // Below md the cards carry too much copy to survive a sticky stack, so they
  // fall back to an ordinary vertical list there.
  const stacked = useMediaQuery('(min-width: 768px)')
  const targetScale = 1 - (total - 1 - index) * 0.03
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, targetScale])

  return (
    <div className={`mb-5 flex items-start justify-center md:sticky md:top-24 md:mb-0 md:min-h-[560px] ${
        index === total - 1 ? 'md:h-[72vh]' : 'md:h-[88vh]'
      }`}>
      <motion.article
        style={stacked ? { scale, top: `${index * 28}px` } : undefined}
        className="relative w-full max-w-6xl origin-top overflow-hidden rounded-[32px] border-2 border-mist bg-ink p-4 sm:rounded-[44px] sm:p-6 md:rounded-[52px] md:p-7"
      >
        {/* Accent wash */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background: `radial-gradient(70% 100% at 50% 0%, ${project.accent}1f 0%, transparent 72%)`,
          }}
        />

        <header className="relative flex flex-col gap-5 px-2 pb-5 pt-1 sm:px-4 md:flex-row md:items-start md:justify-between md:gap-8 md:pb-6">
          <div className="flex items-start gap-5 md:gap-8">
            <span
              className="hero-heading shrink-0 font-black leading-[0.8]"
              style={{ fontSize: 'clamp(2.2rem, 5.4vw, 74px)' }}
            >
              {project.no}
            </span>
            <div className="pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-[0.66rem] uppercase tracking-[0.28em]"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </span>
                <span className="text-[0.66rem] uppercase tracking-[0.28em] text-mist/35">
                  {project.year}
                </span>
              </div>
              <h3
                className="mt-1.5 font-medium uppercase leading-none tracking-tight text-mist"
                style={{ fontSize: 'clamp(1.45rem, 3.4vw, 2.5rem)' }}
              >
                {project.name}
              </h3>
              <p
                className="mt-3 max-w-2xl font-light leading-relaxed text-mist/60"
                style={{ fontSize: 'clamp(0.83rem, 1.25vw, 0.98rem)' }}
              >
                {project.summary}
              </p>
            </div>
          </div>

          <div className="shrink-0 md:pt-3">
            {project.href ? (
              <GhostButton
                label={project.hrefLabel ?? 'Live project'}
                href={project.href}
                icon={<ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />}
              />
            ) : project.badge ? (
              <span className="btn-ghost inline-flex cursor-default items-center rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-widest opacity-50 sm:px-8 sm:py-3 sm:text-sm">
                {project.badge}
              </span>
            ) : null}
          </div>
        </header>

        <div className="relative grid grid-cols-1 gap-6 px-2 pb-2 sm:px-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ul className="flex flex-col gap-3.5">
              {project.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full"
                    style={{ background: project.accent }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-light leading-relaxed text-mist/70">{b}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-mist/15 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-wider text-mist/50"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <Visual project={project} />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section
      id="projects"
      ref={ref}
      className="relative z-10 -mt-10 scroll-mt-20 rounded-t-[40px] bg-ink px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-4 md:pt-28"
    >
      <div className="mb-4 text-center">
        <FadeIn y={20}>
          <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
            Things I have built
          </span>
        </FadeIn>
      </div>

      <div className="mb-12 text-center sm:mb-16">
        <SectionHeading>Projects</SectionHeading>
      </div>

      <div>
        {PROJECTS.map((project, i) => (
          <Card
            key={project.no}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
