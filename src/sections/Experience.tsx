import { GraduationCap } from 'lucide-react'
import { FadeIn, SectionHeading } from '../components/primitives'
import { EDUCATION, EXPERIENCE } from '../lib/data'

export default function Experience() {
  return (
    <section className="relative bg-ink px-5 py-24 sm:px-8 md:px-10 md:py-32">
      <div className="mb-4 text-center">
        <FadeIn y={20}>
          <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
            Placement and part-time work
          </span>
        </FadeIn>
      </div>
      <div className="mb-14 text-center sm:mb-20">
        <SectionHeading>Experience</SectionHeading>
      </div>

      <div className="mx-auto max-w-5xl">
        {EXPERIENCE.map((role, i) => (
          <FadeIn
            key={role.org}
            delay={i * 0.1}
            y={30}
            className="grid grid-cols-1 gap-6 border-t border-[rgba(215,226,234,0.14)] py-10 last:border-b md:grid-cols-12 md:gap-10 md:py-14"
          >
            <div className="md:col-span-4">
              <h3
                className="font-medium uppercase leading-tight text-mist"
                style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.9rem)' }}
              >
                {role.org}
              </h3>
              <p className="mt-2 text-sm font-light text-mist/55">{role.title}</p>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.24em] text-mist/35">
                {role.period}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-mist/35">
                {role.place}
              </p>
            </div>

            <ul className="flex flex-col gap-4 md:col-span-8">
              {role.points.map((p) => (
                <li key={p} className="flex gap-4">
                  <span
                    className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-[#B600A8]"
                    aria-hidden="true"
                  />
                  <span
                    className="font-light leading-relaxed text-mist/70"
                    style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1.05rem)' }}
                  >
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>

      {/* Education */}
      <div className="mx-auto mt-20 max-w-5xl">
        <FadeIn y={20} className="mb-8 flex items-center gap-3">
          <GraduationCap size={18} strokeWidth={1.5} className="text-mist/40" aria-hidden="true" />
          <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
            Education
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {EDUCATION.map((ed, i) => (
            <FadeIn
              key={ed.org}
              delay={i * 0.1}
              y={26}
              className="glass glass-hover rounded-3xl p-6 sm:p-8"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-mist/35">{ed.period}</p>
              <h4 className="mt-3 text-lg font-medium leading-tight text-mist sm:text-xl">
                {ed.org}
              </h4>
              <p className="mt-1.5 text-sm text-mist/65">{ed.title}</p>
              <p className="mt-4 text-sm font-light leading-relaxed text-mist/45">{ed.note}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
