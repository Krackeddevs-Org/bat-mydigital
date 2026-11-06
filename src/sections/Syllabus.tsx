import Topography from '../components/backgrounds/Topography';
import { Container, SectionTitle, ToolTag } from '../ui/primitives';
import { MODULES } from '../data';

export default function Syllabus() {
  return (
    <section id="syllabus" className="relative isolate overflow-hidden bg-mist py-24 lg:py-32">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[1000px]"
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-80 bg-gradient-to-b from-transparent to-mist" />
        <Topography
          lightMode
          color="#8C00FF"
          lineCount={20}
          lineWidth={1}
          speed={0.15}
          glow={0.3}
          fog={0.5}
          opacity={0.85}
          markers="plus"
          hoverEffect="lift"
          dpr={1}
        />
      </div>

      <Container>
        <SectionTitle
          eyebrow="Syllabus"
          title={
            <>
              Five things you&rsquo;ll learn <span className="text-gradient">by building them.</span>
            </>
          }
          lead="No lectures-then-homework. Every module happens on your own project, with a mentor beside you."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <article key={m.n} className="card flex flex-col bg-white/90 p-7 backdrop-blur transition-transform hover:-translate-y-1">
              <span className="font-display text-5xl font-black text-lav-2 [-webkit-text-stroke:1.5px_#c9a8ff]">{m.n}</span>
              <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink">{m.title}</h3>
              <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slate">{m.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <ToolTag key={t} name={t} />
                ))}
              </div>
            </article>
          ))}
          <article className="flex flex-col justify-between rounded-[28px] bg-brand-gradient p-7 text-white shadow-[0_30px_60px_rgba(71,118,230,0.3)]">
            <p className="font-display text-2xl font-bold leading-snug">
              Bring a problem.
              <br />
              Leave with a shipped tool.
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-white/85">
              Dedicated, experienced mentors guide every table, so nobody gets stuck alone.
            </p>
          </article>
        </div>

      </Container>
    </section>
  );
}
