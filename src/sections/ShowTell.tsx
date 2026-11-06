import { Mic2 } from 'lucide-react';
import { Container, SectionTitle } from '../ui/primitives';
import { reveal } from '../ui/reveal';

export default function ShowTell() {
  return (
    <section id="show-and-tell" className="bg-lav py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionTitle
            eyebrow="Show & Tell"
            title={
              <>
                Every session ends <span className="text-gradient">on stage.</span>
              </>
            }
            lead="Participants share their projects: the problem, the tool, the bug that almost broke them and what they learned. Two minutes each, no slides needed, and the room cheers for everyone."
          />
          <ul {...reveal(1)} className="mt-8 space-y-3 text-[15px] text-ink">
            {['What problem did you pick?', 'Show it working, live', 'One thing you learned'].map((q, i) => (
              <li key={q} className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-lg bg-white font-mono text-xs font-bold text-brand shadow-soft">
                  {i + 1}
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        <div {...reveal(1)} className="relative sm:pb-12">
          <figure className="overflow-hidden rounded-[28px] border border-line bg-white shadow-lift">
            <img
              src="/illustrations/show-and-tell-stage.webp"
              alt="The participant from the Ship card on stage with a microphone, presenting her checklist app on a projector screen while the audience claps"
              loading="lazy"
              width={1200}
              height={896}
              className="block h-auto w-full"
            />
          </figure>

          {/* caption card overlapping the illustration */}
          <div className="relative mx-4 -mt-8 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur sm:absolute sm:bottom-0 sm:right-6 sm:mx-0 sm:mt-0 sm:w-[22rem] sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-2.5 py-0.5 text-[11px] font-bold text-white">
                <span className="size-1.5 animate-pulse rounded-full bg-white motion-reduce:animate-none" /> LIVE
              </span>
              <p className="text-xs text-muted">Now presenting</p>
              <Mic2 size={16} className="ml-auto text-brand" />
            </div>
            <p className="mt-2 font-display font-bold text-ink">Aisyah · CutiKu</p>
            <p className="mt-1.5 text-sm leading-relaxed text-body">
              &ldquo;Our unit lost three leave requests last month. Now they can&rsquo;t get lost, and I built it
              this afternoon.&rdquo;
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
