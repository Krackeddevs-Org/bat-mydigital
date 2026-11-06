import { useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import Topography from '../components/backgrounds/Topography';
import { Container, SectionTitle, Tag, ToolTag } from '../ui/primitives';
import { GCCOV, MODULES } from '../data';

function GccovExplainer() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const item = GCCOV[active];

  const fullPrompt = GCCOV.map((g) => `${g.word}: ${g.strong}`).join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable, ignore */
    }
  };

  return (
    <div className="card shadow-lift mt-14 overflow-hidden p-0">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="p-7 sm:p-10">
          <Tag>Module 01 · Deep dive</Tag>
          <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">The GCCOV method</h3>
          <p className="mt-3 text-slate">
            Five parts that turn &ldquo;make me an app&rdquo; into a prompt AI can actually build from. Tap each
            letter.
          </p>

          <div className="mt-7 flex gap-2 sm:gap-3" role="tablist" aria-label="GCCOV steps">
            {GCCOV.map((g, i) => (
              <button
                key={g.word}
                role="tab"
                aria-selected={active === i}
                aria-controls="gccov-panel"
                onClick={() => setActive(i)}
                className={`group flex flex-1 flex-col items-center gap-1 rounded-2xl border px-1 py-3 transition-all sm:py-4 ${
                  active === i
                    ? 'border-transparent bg-brand-gradient text-white shadow-[0_14px_30px_rgba(140,0,255,0.3)]'
                    : 'border-line bg-mist text-ink hover:border-brand/30'
                }`}
              >
                <span className="font-display text-2xl font-black sm:text-3xl">{g.letter}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider sm:text-[11px] ${active === i ? 'text-white/85' : 'text-muted'}`}>
                  {g.word}
                </span>
              </button>
            ))}
          </div>

          <div id="gccov-panel" role="tabpanel" className="mt-7" key={active}>
            <p className="rise-in font-display text-lg font-bold text-ink">{item.question}</p>
            <p className="rise-in mt-1.5 text-[15px] text-slate" style={{ animationDelay: '0.05s' }}>
              {item.tip}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rise-in rounded-2xl border border-rose/15 bg-rose/[0.04] p-4" style={{ animationDelay: '0.1s' }}>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose">
                  <X size={14} /> Weak
                </p>
                <p className="mt-2 text-sm text-body">{item.weak}</p>
              </div>
              <div className="rise-in rounded-2xl border border-[#16a37a]/20 bg-[#16a37a]/[0.05] p-4" style={{ animationDelay: '0.15s' }}>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#118a67]">
                  <Check size={14} /> Strong
                </p>
                <p className="mt-2 text-sm text-body">{item.strong}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-night p-7 text-white sm:p-10">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-white/50">full-prompt.txt</p>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white/85 hover:bg-white/15"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy prompt'}
            </button>
          </div>
          <ol className="mt-6 space-y-4 font-mono text-[13px] leading-relaxed">
            {GCCOV.map((g, i) => (
              <li
                key={g.word}
                onClick={() => setActive(i)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                  active === i
                    ? 'border-[#a46bff]/60 bg-[#8c00ff]/15 text-white'
                    : 'border-transparent text-white/45 hover:text-white/75'
                }`}
              >
                <span className={active === i ? 'text-[#c9a8ff]' : ''}>{g.word}:</span> {g.strong}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

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

        <GccovExplainer />
      </Container>
    </section>
  );
}
