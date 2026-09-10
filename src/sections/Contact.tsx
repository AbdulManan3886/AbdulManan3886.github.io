import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { FadeIn, GhostButton, Magnet } from '../components/primitives'
import { ContactScene } from '../components/three/lazy'
import { CV_URL, PROFILE } from '../lib/data'

const LINKS = [
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, Icon: Mail },
  { label: 'LinkedIn', value: '/in/abdul-manan', href: PROFILE.linkedin, Icon: Linkedin },
  { label: 'GitHub', value: 'AbdulManan3886', href: PROFILE.github, Icon: Github },
  { label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}`, Icon: Phone },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-ink px-5 pb-12 pt-24 sm:px-8 md:px-10 md:pt-32"
    >
      <ContactScene className="pointer-events-none absolute inset-0 z-0 opacity-70" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/3"
        style={{
          background:
            'radial-gradient(60% 80% at 50% 100%, rgba(118,33,176,0.22) 0%, rgba(190,76,0,0.10) 45%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <FadeIn y={20}>
            <span className="text-[0.68rem] uppercase tracking-[0.38em] text-mist/40">
              Looking for a 2027 graduate scheme
            </span>
          </FadeIn>

          <FadeIn as="h2" y={40} delay={0.05}>
            <span
              className="hero-heading mt-6 block font-black uppercase leading-[0.86] tracking-tight"
              style={{ fontSize: 'clamp(2.75rem, 13vw, 190px)' }}
            >
              Let&apos;s talk
            </span>
          </FadeIn>

          <FadeIn y={22} delay={0.15}>
            <p
              className="mx-auto mt-8 max-w-xl font-light leading-relaxed text-mist/65"
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)' }}
            >
              I am after a 2027 graduate scheme in cyber and GRC, cloud and data, technology
              consulting, audit and risk, or quantitative risk. If the work involves explaining
              something technical to people who will not read the technical version, that is the
              part I enjoy most. Happy to hear about internships and placements too.
            </p>
          </FadeIn>

          <FadeIn
            y={22}
            delay={0.25}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Magnet padding={110} strength={4} className="inline-block">
              <a
                href={`mailto:${PROFILE.email}`}
                className="btn-gradient inline-flex max-w-full cursor-pointer items-center gap-2.5 rounded-full px-6 py-3.5 text-[0.7rem] font-medium uppercase tracking-widest sm:gap-3 sm:px-12 sm:py-5 sm:text-base"
              >
                {PROFILE.email}
                <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
              </a>
            </Magnet>

            {CV_URL ? (
              <GhostButton
                label="Download CV"
                href={CV_URL}
                icon={<Download size={15} strokeWidth={2} aria-hidden="true" />}
              />
            ) : null}
          </FadeIn>
        </div>

        {/* Link grid */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[rgba(215,226,234,0.14)] bg-[rgba(215,226,234,0.14)] sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((l, i) => (
            <FadeIn key={l.label} delay={i * 0.07} y={22}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                className="group flex h-full min-h-[112px] flex-col justify-between bg-ink p-6 transition-colors duration-300 hover:bg-[#111113]"
              >
                <div className="flex items-center justify-between">
                  <l.Icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-mist/40 transition-colors duration-300 group-hover:text-[#E8A276]"
                    aria-hidden="true"
                  />
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                    className="text-mist/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mist/60"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-[0.64rem] uppercase tracking-[0.26em] text-mist/35">
                    {l.label}
                  </p>
                  <p className="mt-1 break-all text-sm text-mist/80">{l.value}</p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-[rgba(215,226,234,0.12)] pt-8 sm:flex-row">
          <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-mist/35">
            <MapPin size={13} strokeWidth={1.6} aria-hidden="true" />
            {PROFILE.location} · Willing to relocate
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-mist/25">
            © {new Date().getFullYear()} {PROFILE.fullName}
          </p>
          <a
            href="#top"
            className="text-[0.7rem] uppercase tracking-[0.24em] text-mist/35 transition-colors duration-200 hover:text-mist/70"
          >
            Back to top
          </a>
        </footer>
      </div>
    </section>
  )
}
