import { Counter, FadeIn } from '../components/primitives'
import { STATS } from '../lib/data'

export default function Stats() {
  return (
    <section className="relative bg-ink px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
      <FadeIn y={20}>
        <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
          What my placement year added up to
        </span>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[rgba(215,226,234,0.14)] bg-[rgba(215,226,234,0.14)] sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn
            key={stat.label}
            delay={i * 0.09}
            y={26}
            className="group relative bg-ink p-6 transition-colors duration-300 hover:bg-[#101012] sm:p-8"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: 'linear-gradient(90deg, transparent, #B600A8, transparent)' }}
            />
            <div
              className="font-black leading-none text-mist"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.9rem)' }}
            >
              <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <div className="mt-4 text-sm font-medium uppercase tracking-wider text-mist sm:text-base">
              {stat.label}
            </div>
            <p className="mt-2 text-sm font-light leading-relaxed text-mist/55">{stat.note}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
