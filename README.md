# Abdul Manan — Portfolio

A 3D dark portfolio landing page: React 18 + TypeScript + Vite, Tailwind CSS,
Framer Motion, Lucide, and three.js via react-three-fiber.

## Run it

```bash
npm install
npm run dev      # http://localhost:5273
```

```bash
npm run build    # static output in dist/
npm run preview  # serve the built output
```

`dist/` is a plain static bundle — it will deploy as-is to Netlify, Vercel,
Cloudflare Pages or GitHub Pages with no server.

## Two photos still to add

Drop these two files into `public/media/gallery/` and they appear in the
Credentials section automatically. The page renders correctly without them —
each slot hides itself if the file is missing — so nothing breaks in the
meantime.

| Filename | Photo |
| --- | --- |
| `hackathon-trophy.jpg` | The Google Cloud × Unilever hackathon winner award |
| `hackathon-team.jpg` | The team photo from the hackathon |

Any JPEG works; ~1200px on the long edge is plenty.

## Where the content lives

Everything writable is in **`src/lib/data.ts`** — profile, stats, capabilities,
projects, experience, education, credentials, and the two marquee rows. Editing
that file changes the page; no component needs touching for a copy change.

| Section | File |
| --- | --- |
| Hero (nav, display heading, portrait, CTA) | `src/sections/Hero.tsx` |
| Scroll-driven capability marquee | `src/sections/Marquee.tsx` |
| About (per-character scroll reveal) | `src/sections/About.tsx` |
| Numbers | `src/sections/Stats.tsx` |
| Capabilities (light section) | `src/sections/Capabilities.tsx` |
| Projects (sticky card stack) | `src/sections/Projects.tsx` |
| Experience and education | `src/sections/Experience.tsx` |
| Credentials | `src/sections/Credentials.tsx` |
| Contact and footer | `src/sections/Contact.tsx` |

Shared behaviour is in `src/components/primitives.tsx` (`FadeIn`, `Magnet`,
`AnimatedText`, `Counter`, buttons, media-query hooks) and the WebGL scenes in
`src/components/three/Scenes.tsx`, loaded lazily through
`src/components/three/lazy.tsx`.

## Design system

| Token | Value |
| --- | --- |
| Background | `#0C0C0C` |
| Foreground | `#D7E2EA` |
| Display gradient | `linear-gradient(180deg, #646973, #BBCCD7)` |
| CTA gradient | `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)` |
| Type | Kanit 300–900 |
| Light section | `#FFFFFF` on `#0C0C0C` text |

Accent hues are carried through to the WebGL scenes so the 3D and the CSS share
one palette.

## Behaviour worth knowing

- **Reduced motion.** `prefers-reduced-motion: reduce` stops the WebGL render
  loop, disables the magnetic hover, freezes the counters at their final values
  and drops CSS transitions. The page stays fully readable.
- **Off-screen scenes idle.** Each canvas only renders frames while its section
  is near the viewport.
- **Sticky project stack is desktop-only.** Below 768px the cards fall back to
  an ordinary vertical list, because the copy does not survive a sticky stack on
  a phone.
- **Code splitting.** three.js is a separate chunk (~265 kB gzipped) that loads
  after the page has painted; the app itself is ~18 kB gzipped.

## Screenshot tooling

`scripts/shots.mjs` and `scripts/one.mjs` drive headless Chrome through
puppeteer-core to capture the page at a given viewport. Useful for checking
layout changes without opening a browser:

```bash
node scripts/shots.mjs /tmp/out http://localhost:5273 1440 900
```
