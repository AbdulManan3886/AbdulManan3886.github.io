import { AnimatedText, ContactButton, FadeIn, SectionHeading } from '../components/primitives'
import { AboutScene } from '../components/three/lazy'
import { PROFILE } from '../lib/data'

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[86svh] scroll-mt-24 items-center justify-center px-5 py-20 sm:px-8 md:min-h-screen md:px-10"
      style={{ overflowX: 'clip' }}
    >
      <AboutScene className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 flex w-full flex-col items-center gap-10 sm:gap-12 md:gap-14">
        <div className="flex flex-col items-center gap-8 text-center sm:gap-10 md:gap-12">
          <SectionHeading>About me</SectionHeading>

          <FadeIn delay={0.1} y={24}>
            <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
              {PROFILE.location} · Graduating 2027
            </span>
          </FadeIn>

          <AnimatedText
            text={PROFILE.about}
            className="max-w-[620px] text-center font-medium leading-relaxed text-mist"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.15} y={20}>
          <ContactButton label="Get in touch" />
        </FadeIn>
      </div>
    </section>
  )
}
