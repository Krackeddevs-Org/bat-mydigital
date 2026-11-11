export const REGISTER_URL =
  'https://builder-hub.rakyatdigital.gov.my/events/hub/mydigital-x-krackeddevs-ai-build-a-thon-at-smart-nation-bm91';

/** Official logos, served from /public/logos. */
export const LOGOS = {
  mydigital: { src: '/logos/mydigital.png', alt: 'MyDIGITAL Corporation' },
  mydigitalWhite: { src: '/logos/mydigital-white.png', alt: 'MyDIGITAL Corporation' },
  smartNationWhite: { src: '/logos/smart-nation-expo-white.png', alt: 'Smart Nation Expo' },
  mydigitalStacked: { src: '/logos/mydigital-stacked.png', alt: 'MyDIGITAL' },
  krackeddevs: { src: '/logos/krackeddevs.svg', alt: 'KrackedDevs' },
  ilmuMark: { src: '/logos/ilmu-mark.svg', alt: 'ILMU' },
  ilmuchat: { src: '/logos/ilmuchat.svg', alt: 'ILMUchat' },
  ilmucode: { src: '/logos/ilmucode.png', alt: 'ILMUcode' },
  ilmucodeWhite: { src: '/logos/ilmucode-white.png', alt: 'ILMUcode' },
} as const;

export const NAV = [
  { label: 'Format', href: '#format' },
  { label: 'Syllabus', href: '#syllabus' },
  { label: 'Sessions', href: '#sessions' },
  { label: 'Certificate', href: '#certificate' },
  { label: 'FAQ', href: '#faq' },
];

export type Session = {
  id: string;
  day: string;
  date: string;
  slot: 'Morning' | 'Evening';
  time: string;
  /** No seats left: card shows Fully booked and no Register link. */
  full?: boolean;
};

export const SESSIONS: Session[] = [
  { id: '01', day: 'Tue', date: '17 Nov', slot: 'Morning', time: '10:30 AM – 1:00 PM', full: true },
  { id: '02', day: 'Tue', date: '17 Nov', slot: 'Evening', time: '2:30 PM – 5:00 PM' },
  { id: '03', day: 'Wed', date: '18 Nov', slot: 'Morning', time: '10:30 AM – 1:00 PM' },
  { id: '04', day: 'Wed', date: '18 Nov', slot: 'Evening', time: '2:30 PM – 5:00 PM' },
  { id: '05', day: 'Thu', date: '19 Nov', slot: 'Morning', time: '10:30 AM – 1:00 PM' },
  { id: '06', day: 'Thu', date: '19 Nov', slot: 'Evening', time: '2:30 PM – 5:00 PM' },
];

export const SEATS_PER_SESSION = 100;

export const MODULES = [
  {
    n: '01',
    title: 'Prompting basics & the GCCOV method',
    body: 'Write prompts that land the first time: Goal, Context, Constraint, Output, Verify.',
    tags: ['Prompting', 'GCCOV'],
  },
  {
    n: '02',
    title: 'Responsible vibe coding',
    body: 'Move fast without shipping risk: handling data, PDPA basics, secrets and security hygiene.',
    tags: ['Data', 'PDPA', 'Security'],
  },
  {
    n: '03',
    title: 'Build your own internal tool',
    body: 'Turn the annoying, repetitive part of your workday into a small tool that actually fixes it.',
    tags: ['Problem framing', 'Scoping'],
  },
  {
    n: '04',
    title: 'Create a web app with AI tools',
    body: 'Go from idea to a working web app (screens, logic, data) with AI as your pair programmer.',
    tags: ['Web app', 'Deploy'],
  },
  {
    n: '05',
    title: 'Hands-on with ILMUchat & ILMUcode',
    body: 'Think it through in ILMUchat, then build it in ILMUcode. Malaysian-made AI, start to finish.',
    tags: ['ILMUchat', 'ILMUcode'],
  },
];

export const FAQS = [
  {
    q: 'Do I need to know how to code?',
    a: 'No. The MyDigital Build-a-thon is designed for civil servants, professionals and builders of any level. You will learn to describe what you want clearly (GCCOV) and let AI tools do the heavy lifting, with mentors beside you.',
  },
  {
    q: 'If there are no winners, why join?',
    a: 'Because everybody wins. There is no judging and no podium. You leave with a working tool that solves a real problem of yours, new skills, and a Certificate of Shipping once your project is submitted.',
  },
  {
    q: 'What should I bring?',
    a: 'Your laptop and its charger. A real problem from your daily work helps too, something repetitive, manual or messy you wish a simple app could handle.',
  },
  {
    q: 'How do I get the certificate?',
    a: 'The Certificate of Shipping is only issued after you successfully ship your project and submit it to the KD (Kracked Devs) platform. Attending alone is not enough. Shipping is the point.',
  },
  {
    q: 'What is Show & Tell?',
    a: 'At the end of the session, participants share what they built: the problem, the tool and what they learned. It is friendly, short and the best part of the day.',
  },
  {
    q: 'Can I use real work data?',
    a: 'Please do not. Part of the syllabus is responsible vibe coding: use dummy or masked data, keep personal data out of prompts, and follow PDPA principles.',
  },
];
