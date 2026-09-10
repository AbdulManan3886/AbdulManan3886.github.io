import { lazy, Suspense } from 'react'

/* The WebGL bundle is by far the heaviest dependency, so it loads after the
   page itself has painted. Each scene degrades to nothing while it arrives. */
const HeroSceneLazy = lazy(() =>
  import('./Scenes').then((m) => ({ default: m.HeroScene })),
)
const AboutSceneLazy = lazy(() =>
  import('./Scenes').then((m) => ({ default: m.AboutScene })),
)
const ContactSceneLazy = lazy(() =>
  import('./Scenes').then((m) => ({ default: m.ContactScene })),
)

export function HeroScene(props: { className?: string }) {
  return (
    <Suspense fallback={null}>
      <HeroSceneLazy {...props} />
    </Suspense>
  )
}

export function AboutScene(props: { className?: string }) {
  return (
    <Suspense fallback={null}>
      <AboutSceneLazy {...props} />
    </Suspense>
  )
}

export function ContactScene(props: { className?: string }) {
  return (
    <Suspense fallback={null}>
      <ContactSceneLazy {...props} />
    </Suspense>
  )
}
