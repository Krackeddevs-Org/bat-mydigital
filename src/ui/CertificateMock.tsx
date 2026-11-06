import { CalendarCheck } from 'lucide-react';
import { LOGOS } from '../data';
import { Logo } from './primitives';

/** Sample Certificate of Shipping shown in the Certificate section. */
export function CertificateMock() {
  return (
    <div className="relative rounded-[24px] bg-brand-gradient p-[2px] shadow-lift">
      <div className="relative overflow-hidden rounded-[22px] bg-white px-6 py-8 text-center sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(45deg,#8c00ff_0_1px,transparent_1px_14px)]"
          aria-hidden
        />
        <span className="absolute right-4 top-4 rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">
          Sample
        </span>
        <div className="mb-5 flex items-center justify-center gap-3">
          <Logo logo={LOGOS.mydigital} className="h-6" />
          <span className="text-xs text-muted" aria-hidden>
            ×
          </span>
          <Logo logo={LOGOS.krackeddevs} className="h-6" />
        </div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">MyDigital Build-a-thon 2026</p>
        <p className="mt-3 font-display text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">
          Certificate of Shipping
        </p>
        <p className="mt-5 text-xs text-muted">This certifies that</p>
        <p className="mt-1 font-display text-xl font-bold text-ink">Nur Aisyah binti Rahman</p>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate">
          built, shipped and submitted <strong className="text-ink">CutiKu</strong>, a leave-request tracker for a
          25-person unit.
        </p>
        <div className="mt-7 flex items-center justify-between border-t border-line pt-4 text-[10px] text-muted">
          <span className="text-left">
            MITEC, Kuala Lumpur
            <br />
            17–19 Nov 2026
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#dcf7ea] px-2 py-1 font-semibold text-[#0f7a55]">
            <CalendarCheck size={11} /> Verified on KD platform
          </span>
        </div>
      </div>
    </div>
  );
}
