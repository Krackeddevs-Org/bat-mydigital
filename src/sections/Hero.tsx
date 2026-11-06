import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';
import WebThreads from '../components/backgrounds/WebThreads';
import DepthText from '../components/text/DepthText';
import { ButtonLink, Container } from '../ui/primitives';
import { REGISTER_URL, SEATS_PER_SESSION } from '../data';

const META = [
  { icon: CalendarDays, label: 'When', value: '17–19 Nov 2026', sub: 'Tuesday – Thursday' },
  { icon: MapPin, label: 'Where', value: 'MITEC', sub: 'Kuala Lumpur · Smart Nation' },
  { icon: Users, label: 'Seats', value: `${SEATS_PER_SESSION} per session`, sub: 'First come, first served' },
];

/** Shared Depth Text settings so both title lines tilt and orbit together. */
const DEPTH = {
  layers: 26,
  depth: 1.9,
  tilt: 8,
  perspective: 1100,
  orbitSpeed: 0.12,
  fontWeight: 900,
  className: 'font-display',
} as const;

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-night text-white">
      {/* Background: calm, low threads + one glow + faint grid */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <WebThreads
          colors={['#8C00FF', '#446EFF']}
          coreColor="#E9DDFF"
          threadCount={3}
          speed={0.1}
          spread={0.1}
          frequency={3}
          brightness={0.32}
          glow={0.015}
          opacity={0.75}
          position={0.16}
          grain={0}
          pulseOnClick={false}
          mouseStrength={0.25}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_42%_at_50%_40%,rgba(140,0,255,0.32),rgba(68,110,255,0.08)_55%,transparent_75%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_42%,black,transparent_80%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-night" aria-hidden />

      <Container className="flex min-h-[100svh] flex-col items-center justify-center pb-44 pt-28 text-center lg:pb-48">
        <h1 className="flex flex-col items-center gap-1 sm:gap-2" aria-label="Learn. Build. Ship">
          <DepthText
            {...DEPTH}
            text="Learn. Build."
            faceColor="#FFFFFF"
            depthColor="#8C00FF"
            fontSize="clamp(2.9rem, 14vw, 7.75rem)"
          />
          <DepthText
            {...DEPTH}
            text="Ship"
            faceColor="#D9C2FF"
            depthColor="#5B1FE0"
            fontSize="clamp(4.5rem, 25vw, 13rem)"
          />
        </h1>

        <p
          className="rise-in mt-8 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-10 sm:text-lg"
          style={{ animationDelay: '0.25s' }}
        >
          A hands-on hackathon with <strong className="font-semibold text-white">no winners</strong>, because
          everybody who ships, wins. Learn to build with AI, ship a tool that fixes your own daily problem, then show
          it off.
        </p>

        <div className="rise-in mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: '0.35s' }}>
          <ButtonLink href={REGISTER_URL}>
            Reserve your seat <ArrowRight size={16} />
          </ButtonLink>
          <ButtonLink href="#format" variant="ghost-dark">
            How it works
          </ButtonLink>
        </div>

        {/* Event facts: stacked rows on phones, three columns from sm up */}
        <dl
          className="rise-in glass mt-12 grid w-full max-w-3xl divide-y divide-white/10 rounded-[24px] text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:text-center"
          style={{ animationDelay: '0.45s' }}
        >
          {META.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="flex items-center gap-4 px-5 py-4 sm:flex-col sm:gap-3 sm:px-4 sm:py-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#d9c2ff] ring-1 ring-white/10">
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{label}</dt>
                <dd className="mt-1 font-display text-lg font-bold leading-tight text-white sm:text-xl">{value}</dd>
                <dd className="mt-0.5 text-[13px] text-white/60">{sub}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
