import { useId, useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import GradientASCII from '../components/backgrounds/GradientASCII';
import { ButtonLink, Container, SectionTitle } from '../ui/primitives';
import { OrganiserLogos } from '../ui/Organisers';
import { FAQS, NAV, REGISTER_URL, SEATS_PER_SESSION, SESSIONS } from '../data';
import { Wordmark } from './Nav';

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div
      className={`card rounded-2xl p-0 transition-[box-shadow,border-color] duration-300 ${
        open ? 'border-brand/25 shadow-[0_18px_60px_rgba(140,0,255,0.12)]' : ''
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-display text-base font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-lg"
        >
          {q}
          <span
            className={`grid size-8 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300 ease-out ${
              open ? 'rotate-45 bg-brand text-white' : 'bg-lav text-brand'
            }`}
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>
      {/* grid-rows 0fr → 1fr animates to the content's natural height */}
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        inert={!open}
      >
        <div className="overflow-hidden">
          <p
            className={`px-6 pb-6 text-[15px] leading-relaxed text-slate transition-transform duration-300 ease-out motion-reduce:transition-none ${
              open ? 'translate-y-0' : '-translate-y-2'
            }`}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-mist py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow="FAQ" title="Questions, answered." lead="Anything else? Ask a mentor on the day." />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-night py-28 text-white lg:py-40">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <GradientASCII
          colors={['#2907CA', '#F0EBFF', '#8C00FF', '#446EFF']}
          shape="rise"
          cellSize={16}
          glyphOpacity={0.7}
          gradientOpacity={0.75}
          speed={0.8}
          fontFamily='"JetBrains Mono", ui-monospace, Menlo, monospace'
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(18,8,48,0.85),rgba(18,8,48,0.35)_60%,transparent)]" aria-hidden />
      <Container className="text-center">
        <SectionTitle
          dark
          center
          eyebrow="17–19 November 2026 · MITEC"
          title={
            <span className="text-4xl sm:text-5xl lg:text-6xl">
              Bring a problem.
              <br />
              <span className="text-[#c9a8ff]">Leave with a shipped tool.</span>
            </span>
          }
          lead={`${SESSIONS.length} sessions, ${SEATS_PER_SESSION} seats each, zero winners and everybody wins. See you at the MyDigital Build-a-thon.`}
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={REGISTER_URL} variant="white">
            Reserve your seat <ArrowRight size={16} />
          </ButtonLink>
          <ButtonLink href="#syllabus" variant="ghost-dark">
            Review the syllabus
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-night pb-10 text-white">
      <Container>
        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Wordmark large />
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">Organised by</span>
              <OrganiserLogos />
            </div>
            <p className="text-sm text-white/60 sm:self-end sm:pb-2">In conjunction with Smart Nation</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-white/60 hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-xs text-white/40">© 2026 MyDigital Build-a-thon. MITEC, Kuala Lumpur · 17–19 November 2026.</p>
      </Container>
    </footer>
  );
}
