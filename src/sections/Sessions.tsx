import { ArrowUpRight, Ban, Clock, Sun, Sunset, Users } from 'lucide-react';
import SlicedWaves from '../components/backgrounds/SlicedWaves';
import { Container, SectionTitle, linkProps } from '../ui/primitives';
import { REGISTER_URL, SEATS_PER_SESSION, SESSIONS } from '../data';
import { reveal } from '../ui/reveal';

export default function Sessions() {
  const days = Array.from(new Set(SESSIONS.map((s) => s.date)));

  return (
    <section id="sessions" className="relative isolate overflow-hidden bg-night py-24 text-white lg:py-32">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <SlicedWaves
          color1="#EFE7FF"
          color2="#8C00FF"
          color3="#446EFF"
          ribbons={3}
          spacing={26}
          position={0.82}
          brightness={1.05}
          opacity={0.85}
          speed={0.7}
          grain={0.05}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/70 to-night/20" aria-hidden />

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            dark
            eyebrow="Sessions · Limited seats"
            title={
              <>
                {SESSIONS.length} sessions. <span className="text-[#c9a8ff]">{SEATS_PER_SESSION} seats each.</span>
              </>
            }
            lead="Each 2.5-hour session is a complete learn-build-ship cycle, ending with Show & Tell. Pick the one that fits your schedule. Seats are first come, first served."
          />
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {days.map((date, di) => {
            const list = SESSIONS.filter((s) => s.date === date);
            return (
              <div key={date} {...reveal(di, 110)} className="flex flex-col gap-3">
                <p className="flex items-baseline gap-2 px-1">
                  <span className="font-display text-2xl font-bold">{date}</span>
                  <span className="text-sm text-white/55">2026 · {list[0].day}</span>
                </p>
                {list.map((s) => {
                  const SlotIcon = s.slot === 'Morning' ? Sun : Sunset;
                  return (
                    <article
                      key={s.id}
                      className={`glass group rounded-[22px] p-6 transition-colors ${
                        s.full ? 'border-dashed !bg-white/[0.02]' : 'hover:bg-white/[0.1]'
                      }`}
                    >
                      <div className={`flex items-center justify-between ${s.full ? 'opacity-50' : ''}`}>
                        <span className="font-mono text-xs text-white/50">Session {s.id}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/85">
                          <SlotIcon size={13} /> {s.slot}
                        </span>
                      </div>
                      <p
                        className={`mt-4 flex items-center gap-2 font-display text-xl font-bold ${
                          s.full ? 'text-white/45 line-through decoration-white/40' : ''
                        }`}
                      >
                        <Clock size={18} className="text-[#c9a8ff]" /> {s.time}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span className={`inline-flex items-center gap-1.5 text-sm ${s.full ? 'text-white/45' : 'text-white/70'}`}>
                          <Users size={15} /> {s.full ? `0 of ${SEATS_PER_SESSION} left` : `${SEATS_PER_SESSION} seats`}
                        </span>
                        {s.full ? (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose px-3.5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(224,36,94,0.35)]">
                            <Ban size={15} /> Fully booked
                          </span>
                        ) : (
                          <a
                            href={REGISTER_URL}
                            {...linkProps(REGISTER_URL)}
                            className="inline-flex items-center gap-1 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-lav"
                          >
                            Register <ArrowUpRight size={15} />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
