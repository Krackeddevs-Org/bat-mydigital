import { BatteryCharging, GraduationCap, Laptop, Ticket } from 'lucide-react';
import { Container, SectionTitle } from '../ui/primitives';
import { reveal } from '../ui/reveal';
import { CertificateMock } from '../ui/CertificateMock';
import { SEATS_PER_SESSION } from '../data';

const ESSENTIALS = [
  {
    icon: Laptop,
    icon2: BatteryCharging,
    title: 'Bring your laptop + charger',
    body: 'You build on your own machine, so you keep everything you make. Three hours of building drains batteries: bring the charger.',
  },
  {
    icon: GraduationCap,
    title: 'Dedicated, experienced mentors',
    body: 'Experienced builders walk the floor through the whole workshop. Stuck on a prompt or a bug? Raise a hand.',
  },
  {
    icon: Ticket,
    title: 'Limited seats',
    body: `Only ${SEATS_PER_SESSION} seats per session, so every table gets real mentor time. Register early to lock in your slot.`,
  },
];

const STEPS = [
  { n: '1', t: 'Build', d: 'Build your tool during the session.' },
  { n: '2', t: 'Ship', d: 'Put it live so it actually works for someone.' },
  { n: '3', t: 'Submit', d: 'Submit your shipped project to the KD platform.' },
  { n: '4', t: 'Certified', d: 'Your Certificate of Shipping is issued.' },
];

export default function Certificate() {
  return (
    <section id="certificate" className="py-24 lg:py-32">
      <Container>
        <SectionTitle
          eyebrow="Before you come"
          title={
            <>
              What to bring, and <span className="text-gradient">who&rsquo;s got your back.</span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ESSENTIALS.map(({ icon: Icon, icon2: Icon2, title, body }, i) => (
            <article key={title} {...reveal(i)} className="card p-7">
              <div className="flex gap-2">
                <span className="grid size-12 place-items-center rounded-2xl bg-lav text-brand">
                  <Icon size={22} />
                </span>
                {Icon2 && (
                  <span className="grid size-12 place-items-center rounded-2xl bg-lav text-brand">
                    <Icon2 size={22} />
                  </span>
                )}
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle
              eyebrow="Certificate of Shipping"
              title="No ship, no cert."
              lead={
                <>
                  This isn&rsquo;t an attendance certificate. It is{' '}
                  <strong className="text-ink">only issued after you successfully ship your project and submit it to
                  the KD platform</strong>. It is proof you built something real.
                </>
              }
            />
            <ol className="mt-9 grid gap-3 sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  {...reveal(i, 80)}
                  className={`flex gap-4 rounded-2xl border p-4 ${
                    i === STEPS.length - 1 ? 'border-transparent bg-ink text-white' : 'border-line bg-white'
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl font-display font-bold ${
                      i === STEPS.length - 1 ? 'bg-brand-gradient text-white' : 'bg-lav text-brand'
                    }`}
                  >
                    {s.n}
                  </span>
                  <div>
                    <p className={`font-semibold ${i === STEPS.length - 1 ? 'text-white' : 'text-ink'}`}>{s.t}</p>
                    <p className={`mt-0.5 text-sm ${i === STEPS.length - 1 ? 'text-white/70' : 'text-slate'}`}>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div {...reveal(1)} className="lg:pl-6">
            <CertificateMock />
          </div>
        </div>
      </Container>
    </section>
  );
}
