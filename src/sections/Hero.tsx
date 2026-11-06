import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';
import WebThreads from '../components/backgrounds/WebThreads';
import DepthText from '../components/text/DepthText';
import { ButtonLink, Container } from '../ui/primitives';
import { REGISTER_URL, SEATS_PER_SESSION } from '../data';

const META = [
  { icon: CalendarDays, text: '17–19 November 2026' },
  { icon: MapPin, text: 'MITEC, Kuala Lumpur' },
  { icon: Users, text: `${SEATS_PER_SESSION} seats per session` },
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
          <ButtonLink href="#samples" variant="ghost-dark">
            See what you&rsquo;ll build
          </ButtonLink>
        </div>

        <ul
          className="rise-in mt-10 flex flex-wrap justify-center gap-2.5"
          style={{ animationDelay: '0.45s' }}
        >
          {META.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium text-white/85"
            >
              <Icon size={15} className="text-[#c9a8ff]" />
              {text}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
