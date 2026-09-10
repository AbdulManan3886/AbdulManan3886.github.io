export const PROFILE = {
  firstName: 'abdul',
  fullName: 'Abdul Manan',
  role: 'Cyber Security & Digital Forensics student',
  tagline:
    'final-year cyber security student · a year at unilever behind me · looking for a 2027 graduate scheme',
  location: 'Watford, UK',
  email: 'abdulmanan532454@gmail.com',
  phone: '+44 7498 487 982',
  linkedin: 'https://www.linkedin.com/in/abdul-manan-534053221/',
  github: 'https://github.com/AbdulManan3886',
  about:
    'I am a final-year BSc Cyber Security and Digital Forensics student at Middlesex University London, graduating in 2027 with First-Class Honours in both completed years. I have just finished a 13-month placement at Unilever, where I worked on cloud security governance and led a team to first place in the Google Cloud x Unilever AI Hackathon. Most of what I can build, I taught myself outside the syllabus. I am looking for a 2027 graduate scheme where I can keep doing that.',
}

/* Drop a PDF at public/media/Abdul-Manan-CV.pdf and set this to
   '/media/Abdul-Manan-CV.pdf' — the download button then appears on the
   contact section. Left null so the page never ships a dead link. */
export const CV_URL: string | null = null

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/* ---------------------------------------------------------------- */

export type Stat = {
  value: number
  prefix?: string
  suffix?: string
  label: string
  note: string
}

export const STATS: Stat[] = [
  {
    value: 2610,
    suffix: '+',
    label: 'Policy rules enforced',
    note: 'Azure Policy and NSG rules governing a global cloud estate',
  },
  {
    value: 700,
    prefix: '£',
    suffix: 'k',
    label: 'Savings identified',
    note: 'Cloud cost and usage analysis, presented to senior management',
  },
  {
    value: 90,
    suffix: '+',
    label: 'Azure subscriptions',
    note: 'Security governance across four regions: UK, India, China, Brazil',
  },
  {
    value: 26087,
    label: 'Files triaged',
    note: 'ClamAV sweep on the M57.biz breach, surfacing 10 detections',
  },
]

/* ---------------------------------------------------------------- */

export type Capability = {
  no: string
  name: string
  copy: string
  tags: string[]
}

export const CAPABILITIES: Capability[] = [
  {
    no: '01',
    name: 'Cloud Security Governance',
    copy: 'What I spent my placement year doing: policy-as-code across a 90+ subscription Azure estate, network security group configuration, and the compliance reporting that shows a control was actually enforced rather than merely written down.',
    tags: ['Azure Policy', 'NSG', 'Logic Apps', 'Compliance reporting'],
  },
  {
    no: '02',
    name: 'Digital Forensics',
    copy: 'The core of my degree, and the part I enjoy most. Hash-verified acquisition under documented chain of custody, timeline reconstruction, header and registry analysis, and writing it up so the confidence levels and limitations are stated rather than hidden.',
    tags: ['FTK Imager', 'Autopsy', 'ClamAV', 'ISO/IEC 27037–27043', 'ACPO'],
  },
  {
    no: '03',
    name: 'Applied & Multi-Agent AI',
    copy: 'Taught myself this one, outside the syllabus. Systems where one agent gathers and another checks, built on foundation model APIs and on-device models, with the reasoning kept visible so a human can disagree with it before acting on it.',
    tags: ['Vertex AI', 'Gemini Enterprise', 'Firebase', 'Local models'],
  },
  {
    no: '04',
    name: 'Data & Decision Reporting',
    copy: 'I built the Power BI dashboards that stakeholders in four regions worked from, then did the harder half: standing in front of senior management and explaining what the numbers actually meant.',
    tags: ['Power BI', 'Power Automate', 'Cost analysis'],
  },
  {
    no: '05',
    name: 'Secure Engineering',
    copy: 'Python and Flask, REST integrations and Arduino ESP32 firmware — mostly projects I set myself, written so the security, privacy and governance rules that have to hold around them are designed in rather than bolted on afterwards.',
    tags: ['Python', 'Flask', 'REST', 'Arduino ESP32', 'GDPR'],
  },
]

/* ---------------------------------------------------------------- */

export type Project = {
  no: string
  name: string
  category: string
  year: string
  summary: string
  bullets: string[]
  stack: string[]
  href?: string
  hrefLabel?: string
  badge?: string
  images?: { a: string; b: string; c: string }
  accent: string
}

export const PROJECTS: Project[] = [
  {
    no: '01',
    name: 'Otoscribe',
    category: 'Clinical AI · In development',
    year: '2026',
    summary:
      'A multi-agent clinical documentation tool for consultations that switch language mid-sentence. One agent takes history in the patient’s own language; a second triages in the background, flags red flags and routes to a GP or specialist.',
    bullets: [
      'English, Urdu, Punjabi and Hindi in the first release, running on local models so nothing leaves the machine.',
      'Clinical content drawn from NICE guidelines and the BNF, with doctor sign-off against a registration number.',
      'Reasoning is ordered by confidence band, never by fabricated probability — the model’s stated likelihood does not track whether it is right.',
    ],
    stack: ['Multi-agent', 'Local models', 'Gemini', 'Clinical safety'],
    badge: 'In development',
    images: { a: '/media/oto-2.jpg', b: '/media/oto-4.jpg', c: '/media/oto-1.jpg' },
    accent: '#3DE0AE',
  },
  {
    no: '02',
    name: 'PhishScope',
    category: 'Security tooling · Open source',
    year: '2025',
    summary:
      'A rule-based phishing analyser that turns known indicators into detection logic and then shows its working — urgency language, credential and SSO requests, shortened URLs, spoofed brand domains, sender and Reply-To mismatch.',
    bullets: [
      'Returns a risk score, a Safe / Suspicious / Phishing verdict, and the specific red flags found.',
      'Every verdict ships with a plain-English explanation, so the reasoning behind an alert stays visible rather than hidden.',
      'Built deliberately without a model in the loop: the rules are auditable and the false positives are explainable.',
    ],
    stack: ['Python', 'Flask', 'BeautifulSoup', 'tldextract'],
    href: 'https://github.com/AbdulManan3886/Phishscope',
    hrefLabel: 'View repository',
    accent: '#B600A8',
  },
  {
    no: '03',
    name: 'M57.biz Breach',
    category: 'Digital forensics · Case study',
    year: '2025',
    summary:
      'Lead investigator at the incident-scene stage of a corporate data breach investigation: hash-verified acquisition with a hardware write blocker, full chain of custody, and a timeline that survived cross-examination.',
    bullets: [
      'Broke the case on email headers — an internal-looking sender whose Return-Path and Reply-To redirected externally, pointing to impersonation over the malware and USB theories also under test.',
      'Triaged 10 malware detections across 26,087 files scanned with ClamAV.',
      'Published against ISO/IEC 27037–27043 and ACPO guidelines, stating confidence levels and limitations rather than asserting certainty.',
    ],
    stack: ['FTK Imager', 'Autopsy', 'ClamAV', 'Windows Registry'],
    href: 'https://github.com/AbdulManan3886/m57-digital-forensics-investigation',
    hrefLabel: 'Read the case study',
    accent: '#BE4C00',
  },
  {
    no: '04',
    name: 'Water Quality IoT',
    category: 'Embedded systems · Middlesex',
    year: '2025',
    summary:
      'A real-time environmental monitoring system integrating six sensor types with cloud data transmission — embedded firmware, networking and cloud connectivity end to end on constrained hardware.',
    bullets: [
      'Six sensor types read, calibrated and streamed continuously from an ESP32.',
      'Live dashboards over Blynk with thresholds and alerting on out-of-range readings.',
      'Designed around what the hardware could actually sustain, not what the datasheet claimed.',
    ],
    stack: ['Arduino ESP32', 'Blynk', 'Sensor fusion'],
    accent: '#7621B0',
  },
]

/* ---------------------------------------------------------------- */

export type Role = {
  org: string
  title: string
  place: string
  period: string
  points: string[]
}

export const EXPERIENCE: Role[] = [
  {
    org: 'Unilever',
    title: 'Industrial Placement — Cloud Platform Services',
    place: 'Port Sunlight, UK',
    period: 'Jun 2025 — Jul 2026',
    points: [
      'Managed security governance across 90+ Azure subscriptions, with 2,610+ policy rules enforced through Azure Policy and network security group configuration.',
      'Investigated cloud cost and usage data to identify more than £700,000 in savings opportunities, then presented the findings and recommendations to senior management.',
      'Built Power BI dashboards with automated refresh that became the single source of truth on security posture, compliance gaps and risk for stakeholders across the UK, India, China and Brazil.',
      'Won the Google Cloud x Unilever AI Hackathon, leading a team through a 36-hour international challenge on Gemini Enterprise, Vertex AI, Firebase and AI Studio.',
      'Chaired end-of-year reviews, ran knowledge-sharing sessions, mentored placement students and built onboarding material used across the team.',
    ],
  },
  {
    org: 'NHS — Hazeldene Medical Centre',
    title: 'IT and Referral Coordinator',
    place: 'London, UK',
    period: '2023 — 2025',
    points: [
      'Coordinated patient referrals between the practice and external services in a live clinical environment.',
      'Handled sensitive patient data under GDPR, maintaining IT security protocols and full audit trails.',
      'Resolved hardware, software and network faults under time pressure, supporting clinical staff with no technical background.',
    ],
  },
]

export const EDUCATION = [
  {
    org: 'Middlesex University London',
    title: 'BSc (Hons) Cyber Security and Digital Forensics',
    period: '2023 — 2027',
    note: 'First-Class Honours in Year 1 and Year 2. Digital Incident Scene Investigation, Secure Web Technologies, Computer Networks, IoT, Systems Architecture.',
  },
  {
    org: 'Lahore Garrison University',
    title: 'BSc Computer Science — Year 1, transferred to the UK',
    period: '2021 — 2022',
    note: 'CGPA 3.25 / 4.00. Programming Fundamentals, OOP, Digital Logic Design, Calculus and Analytical Geometry.',
  },
]

/* ---------------------------------------------------------------- */

export type Credential = {
  issuer: string
  title: string
  date: string
  detail: string
  kind: 'award' | 'simulation' | 'course'
}

export const CREDENTIALS: Credential[] = [
  {
    issuer: 'Google Cloud × Unilever',
    title: 'Sustainable Innovation Hackathon — Winner',
    date: '2025',
    detail:
      'Led the winning team through a 36-hour international challenge built on Gemini Enterprise, Vertex AI, Firebase and AI Studio.',
    kind: 'award',
  },
  {
    issuer: 'Mastercard',
    title: 'Cybersecurity Job Simulation',
    date: 'July 2026',
    detail: 'Designed a phishing email simulation and interpreted the results across the target population.',
    kind: 'simulation',
  },
  {
    issuer: 'Deloitte',
    title: 'Cyber Job Simulation',
    date: 'July 2026',
    detail: 'Practical cyber security tasks in a consulting engagement context.',
    kind: 'simulation',
  },
  {
    issuer: 'Cisco Networking Academy',
    title: 'Introduction to Cybersecurity',
    date: 'June 2026',
    detail: 'Threats, attacks and vulnerabilities; protecting organisational operations; career pathways.',
    kind: 'course',
  },
  {
    issuer: 'EC-Council CodeRed',
    title: 'Dark Web, Anonymity and Cryptocurrency',
    date: 'June 2026',
    detail: 'Anonymity networks, dark web infrastructure and the cryptocurrency rails behind them.',
    kind: 'course',
  },
]

/* ---------------------------------------------------------------- */

export const MARQUEE_ROW_A = [
  'Azure Policy',
  'Microsoft Sentinel',
  'Vertex AI',
  'Gemini Enterprise',
  'Power BI',
  'Network Security Groups',
  'Firebase',
  'Logic Apps',
  'Python',
  'Flask',
  'Cloud Governance',
]

export const MARQUEE_ROW_B = [
  'FTK Imager',
  'Autopsy',
  'ClamAV',
  'Chain of Custody',
  'ISO/IEC 27037',
  'ACPO Guidelines',
  'Windows Registry',
  'GDPR',
  'Threat Modelling',
  'Arduino ESP32',
]
