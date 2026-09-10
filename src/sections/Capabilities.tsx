import { FadeIn } from '../components/primitives'
import { CAPABILITIES } from '../lib/data'

export default function Capabilities() {
  return (
    <section
      id="skills"
      className="relative z-[2] scroll-mt-24 rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn y={20} className="mx-auto max-w-5xl">
        <span className="text-[0.68rem] uppercase tracking-[0.38em] text-ink/40">
          What I can do
        </span>
      </FadeIn>

      <FadeIn as="h2" y={40}>
        <span
          className="mb-14 block text-center font-black uppercase leading-none tracking-tight text-ink sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(2.75rem, 12vw, 160px)' }}
        >
          Skills
        </span>
      </FadeIn>

      <ul className="mx-auto max-w-5xl">
        {CAPABILITIES.map((item, i) => (
          <FadeIn
            as="li"
            key={item.no}
            delay={i * 0.1}
            y={30}
            className="group flex flex-col gap-4 border-t py-8 last:border-b sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="shrink-0 font-black leading-[0.82] text-ink/85 transition-colors duration-300 group-hover:text-ink"
              style={{ fontSize: 'clamp(2.6rem, 10vw, 140px)' }}
            >
              {item.no}
            </span>

            <div className="flex flex-col gap-3 pt-1 md:pt-3">
              <h3
                className="font-medium uppercase leading-tight text-ink"
                style={{ fontSize: 'clamp(1.05rem, 2.2vw, 2.1rem)' }}
              >
                {item.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-ink/60"
                style={{ fontSize: 'clamp(0.88rem, 1.6vw, 1.25rem)' }}
              >
                {item.copy}
              </p>
              <ul className="mt-1 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-ink/15 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-wider text-ink/55"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  )
}
