import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV, REGISTER_URL } from '../data';
import { linkProps } from '../ui/primitives';

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="MyDigital Build-a-thon home">
      <span className="grid size-9 place-items-center rounded-[10px] bg-brand-gradient font-mono text-sm font-bold text-white">
        {'</>'}
      </span>
      <span className="flex flex-col whitespace-nowrap font-display uppercase leading-none">
        <span
          className={`text-[10px] font-bold tracking-[0.22em] ${dark ? 'text-white/70' : 'text-slate'}`}
        >
          MyDigital
        </span>
        <span
          className={`mt-1 text-[17px] font-black tracking-tight ${dark ? 'text-white' : 'text-ink'}`}
        >
          Build<span className={dark ? 'text-[#c9a8ff]' : 'text-brand'}>-a-thon</span>
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-line bg-white/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark dark={!solid} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors ${
                solid ? 'text-body hover:text-brand' : 'text-white/80 hover:text-white'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={REGISTER_URL}
            {...linkProps(REGISTER_URL)}
            className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            Reserve a seat
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`grid size-10 place-items-center rounded-[10px] lg:hidden ${
              solid ? 'bg-mist text-ink' : 'bg-white/10 text-white'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-lav"
            >
              {n.label}
            </a>
          ))}
          <a
            href={REGISTER_URL}
            {...linkProps(REGISTER_URL)}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-brand px-3 py-3 text-center font-semibold text-white"
          >
            Reserve a seat
          </a>
        </nav>
      )}
    </header>
  );
}
