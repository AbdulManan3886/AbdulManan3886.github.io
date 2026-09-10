import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ContactButton, FadeIn, Magnet } from '../components/primitives'
import { HeroScene } from '../components/three/lazy'
import { NAV, PROFILE } from '../lib/data'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[620px] flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* WebGL backdrop */}
      <HeroScene className="pointer-events-none absolute inset-0 z-0" />

      {/* Warm floor glow, tying the page to the ring behind the portrait */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/2"
        style={{
          background:
            'radial-gradient(58% 78% at 50% 108%, rgba(190,76,0,0.30) 0%, rgba(182,0,168,0.12) 42%, transparent 74%)',
        }}
      />

      {/* Navbar */}
      <FadeIn as="nav" delay={0} y={-20} className="relative z-30">
        <div className="flex items-center justify-between gap-4 px-5 pt-6 sm:px-6 md:px-10 md:pt-8">
          <a
            href="#top"
            className="hidden text-sm font-semibold uppercase tracking-[0.28em] text-mist transition-opacity duration-200 hover:opacity-70 sm:inline md:text-base"
          >
            A<span className="text-mist/45">.</span>M
          </a>
          <ul className="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:gap-9 md:gap-12 lg:gap-16">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[0.78rem] font-medium uppercase tracking-wider text-mist transition-opacity duration-200 hover:opacity-70 sm:text-sm md:text-lg lg:text-[1.4rem]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* Display heading */}
      <motion.div style={{ y: headingY }} className="relative z-20 overflow-hidden px-3">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 15.5vw, 17.5vw)' }}
          >
            Hi, i&apos;m abdul
          </h1>
        </FadeIn>
      </motion.div>

      {/* Portrait */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[clamp(280px,min(62vw,52vh),620px)] -translate-x-1/2 -translate-y-[46%] [@media(min-aspect-ratio:1/1)]:bottom-0 [@media(min-aspect-ratio:1/1)]:top-auto [@media(min-aspect-ratio:1/1)]:translate-y-0">
        <motion.div style={{ y: portraitY, opacity: portraitOpacity }}>
          <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} innerClassName="relative">
            {/* Neon ring bloom behind the cut-out */}
            <div
              className="pointer-events-none absolute left-1/2 top-[38%] -z-10 aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(190,76,0,0.55) 0%, rgba(182,0,168,0.22) 45%, transparent 70%)',
              }}
            />
            <div className="portrait-frame relative">
              <img
                src="/media/abdul-portrait.jpg"
                alt="Abdul Manan"
                width={1024}
                height={1024}
                className="w-full select-none"
                draggable={false}
              />
            </div>
          </Magnet>
          </FadeIn>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[170px] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[230px] md:max-w-[290px]"
            style={{ fontSize: 'clamp(0.72rem, 1.4vw, 1.4rem)' }}
          >
            {PROFILE.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="shrink-0">
          <ContactButton />
        </FadeIn>
      </div>

    </section>
  )
}
