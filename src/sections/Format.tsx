import { Hammer, Lightbulb, Mic2, Rocket, Trophy } from 'lucide-react';
import { Container, Logo, SectionTitle } from '../ui/primitives';
import { LOGOS, SEATS_PER_SESSION, SESSIONS } from '../data';
import { reveal } from '../ui/reveal';

const STATS = [
  { value: String(SESSIONS.length), label: 'sessions over 3 days' },
  { value: String(SEATS_PER_SESSION), label: 'seats per session' },
  { value: '3 hrs', label: 'of hands-on building' },
  { value: '0', label: 'winners. Everybody wins' },
];

const STEPS = [
  {
    icon: Lightbulb,
    k: 'Learn',
    img: '/illustrations/learn.webp',
    alt: "Over-the-shoulder view of a participant at a laptop while a mentor's hand points at the screen",
    body: 'Mentors teach prompting, GCCOV and responsible AI while you build, exactly when you need it.',
  },
  {
    icon: Hammer,
    k: 'Build',
    img: '/illustrations/build.webp',
    alt: "Top-down view of hands typing on a laptop beside a sketched app wireframe, sticky notes and a coffee cup",
    body: 'Start from a real problem on your desk, not a toy exercise. You build from minute one.',
  },
  {
    icon: Rocket,
    k: 'Ship',
    img: '/illustrations/ship.webp',
    alt: "A participant leaping with joy, holding a laptop up high as a paper rocket takes off",
    body: 'Put your tool live and submit it to the KD platform. Shipped beats perfect.',
  },
  {
    icon: Mic2,
    k: 'Show & Tell',
    img: '/illustrations/show-and-tell.webp',
    alt: "Bird's-eye view of the participant from the Ship card smiling up from a round stage, microphone in hand, as the audience claps around her",
    body: 'Share what you built, what broke and what you learned. Applause guaranteed.',
  },
];

export function StatsStrip() {
  return (
    <Container className="relative z-10 -mt-24 lg:-mt-28">
      <div {...reveal()} className="shadow-lift grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-line lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white px-5 py-6 sm:px-7 sm:py-8">
            <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {s.value === '0' ? <span className="text-gradient">0</span> : s.value}
            </p>
            <p className="mt-1.5 text-sm text-slate">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Phones/small tablets: each label on its own centred row with its logos below. md+: one row. */}
      <div {...reveal(1)} className="mt-10 flex flex-col items-center justify-center gap-x-12 gap-y-8 text-center md:flex-row md:flex-wrap">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Organised by</span>
          <div className="flex items-center justify-center gap-5">
            <Logo logo={LOGOS.mydigital} className="h-8 md:h-9" />
            <Logo logo={LOGOS.krackeddevs} className="h-8 md:h-9" />
          </div>
        </div>
        <span className="hidden h-8 w-px bg-line md:block" aria-hidden />
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Build with</span>
          <div className="flex items-center justify-center gap-5">
            <Logo logo={LOGOS.ilmuchat} className="h-6 md:h-7" />
            <Logo logo={LOGOS.ilmucode} className="h-6 md:h-7" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function Format() {
  return (
    <section id="format" className="py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionTitle
            eyebrow="The format"
            title={
              <>
                A hackathon with no winners. <span className="text-gradient">Everybody who ships, wins.</span>
              </>
            }
          />
          <div {...reveal(1)} className="space-y-5 text-base leading-relaxed text-slate sm:text-lg lg:pt-9">
            <p>
              No judges, no podium, no pitching for prizes. The MyDigital Build-a-thon is a <em>learn-build-ship</em> workshop:
              you bring a problem from your daily work and leave with a working tool that solves it.
            </p>
            <p>
              Dedicated, experienced mentors guide you through every step, from your first prompt to your first
              deploy. Then everyone takes the stage for <strong className="text-ink">Show &amp; Tell</strong>.
            </p>
          </div>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, k, img, alt, body }, i) => (
            <li key={k} {...reveal(i)} className="card group relative flex flex-col p-2.5 transition-transform hover:-translate-y-1">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-[20px] bg-lav">
                  <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    width={960}
                    height={717}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2 py-0.5 font-mono text-[11px] font-medium text-ink backdrop-blur">
                  0{i + 1}
                </span>
                <span className="absolute bottom-0 left-3 grid size-12 translate-y-1/2 place-items-center rounded-2xl border-4 border-white bg-lav text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon size={20} />
                </span>
              </div>
              <div className="px-4 pb-4 pt-8">
                <h3 className="font-display text-xl font-bold text-ink">{k}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div {...reveal()} className="mt-6 flex flex-col items-start gap-4 rounded-[24px] bg-ink px-7 py-6 text-white sm:flex-row sm:items-center">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <Trophy size={20} className="text-[#c9a8ff]" />
          </span>
          <p className="text-[15px] leading-relaxed text-white/80">
            <strong className="text-white">The only prize is the thing you ship.</strong> Everyone who ships and
            submits their project gets a Certificate of Shipping.
          </p>
        </div>
      </Container>
    </section>
  );
}
