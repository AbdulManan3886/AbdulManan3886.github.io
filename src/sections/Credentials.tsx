import { motion } from 'framer-motion'
import { Award, BadgeCheck, BookOpen, Trophy } from 'lucide-react'
import { useState } from 'react'
import { FadeIn, SectionHeading } from '../components/primitives'
import { CREDENTIALS } from '../lib/data'

/* Renders a photo only if the file is actually present in /public. */
function OptionalPhoto({
  src,
  alt,
  className,
  style,
}: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className={className}
      style={style}
    />
  )
}

const KIND_ICON = {
  award: Trophy,
  simulation: BadgeCheck,
  course: BookOpen,
} as const

export default function Credentials() {
  const [award, ...rest] = CREDENTIALS

  return (
    <section className="relative bg-ink px-5 py-24 sm:px-8 md:px-10 md:py-32">
      <div className="mb-4 text-center">
        <FadeIn y={20}>
          <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
            Awards and certifications
          </span>
        </FadeIn>
      </div>
      <div className="mb-14 text-center sm:mb-20">
        <SectionHeading>Credentials</SectionHeading>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Headline award */}
        <FadeIn y={34} className="relative overflow-hidden rounded-[32px] sm:rounded-[44px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(182,0,168,0.16) 0%, rgba(118,33,176,0.12) 42%, rgba(190,76,0,0.16) 100%)',
            }}
          />
          <div className="glass relative grid grid-cols-1 gap-8 rounded-[32px] p-7 sm:rounded-[44px] sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <Award size={20} strokeWidth={1.5} className="text-[#E8A276]" aria-hidden="true" />
                <span className="text-[0.66rem] uppercase tracking-[0.3em] text-mist/45">
                  {award.issuer} · {award.date}
                </span>
              </div>

              <h3
                className="mt-5 font-black uppercase leading-[0.94] tracking-tight text-mist"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3.4rem)' }}
              >
                Sustainable Innovation
                <br />
                Hackathon —{' '}
                <span className="grad-text-accent">Winner</span>
              </h3>

              <p
                className="mt-6 max-w-xl font-light leading-relaxed text-mist/65"
                style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}
              >
                {award.detail}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {['Gemini Enterprise', 'Vertex AI', 'Firebase', 'AI Studio', '36 hours'].map(
                  (t) => (
                    <li
                      key={t}
                      className="rounded-full border border-mist/15 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-wider text-mist/50"
                    >
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <OptionalPhoto
                  src="/media/gallery/hackathon-trophy.jpg"
                  alt="Google Cloud and Unilever Sustainable Innovation Hackathon winner award"
                  className="h-full w-full rounded-3xl object-cover"
                  style={{ minHeight: '190px' }}
                />
                <OptionalPhoto
                  src="/media/gallery/hackathon-team.jpg"
                  alt="Abdul Manan with the winning hackathon team"
                  className="h-full w-full rounded-3xl object-cover"
                  style={{ minHeight: '190px' }}
                />
              </div>

              {/* Always-present visual anchor, works with or without the photos */}
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { k: '1st', v: 'Place' },
                  { k: '36h', v: 'Build' },
                  { k: '5', v: 'Team led' },
                ].map((s, i) => (
                  <motion.div
                    key={s.k}
                    className="glass rounded-2xl px-3 py-4 text-center"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  >
                    <div className="text-2xl font-black leading-none text-mist">{s.k}</div>
                    <div className="mt-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-mist/40">
                      {s.v}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Certificate grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((c, i) => {
            const Icon = KIND_ICON[c.kind]
            return (
              <FadeIn
                key={c.title}
                delay={i * 0.08}
                y={28}
                className="glass glass-hover group flex flex-col rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <Icon
                    size={19}
                    strokeWidth={1.5}
                    className="text-mist/45 transition-colors duration-300 group-hover:text-[#C08BE8]"
                    aria-hidden="true"
                  />
                  <span className="text-[0.62rem] uppercase tracking-[0.2em] text-mist/30">
                    {c.date}
                  </span>
                </div>

                <p className="mt-6 text-[0.68rem] uppercase tracking-[0.26em] text-mist/40">
                  {c.issuer}
                </p>
                <h3 className="mt-2 text-base font-medium leading-snug text-mist sm:text-lg">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-mist/45">
                  {c.detail}
                </p>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
