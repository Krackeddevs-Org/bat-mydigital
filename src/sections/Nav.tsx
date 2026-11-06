import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV, REGISTER_URL } from '../data';
import { linkProps } from '../ui/primitives';
import { BuildathonLogo } from '../ui/BuildathonLogo';
import StaggeredMenu from '../components/menu/StaggeredMenu';

export function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <a href="#top" className="flex items-center" aria-label="MyDigital Build-a-thon home">
      <BuildathonLogo className={large ? 'h-16 sm:h-20' : 'h-10 sm:h-11'} />
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // Section to scroll to once the mobile menu has closed and page scroll is unlocked.
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link for the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector<HTMLElement>(n.href)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((el) => io.observe(el));
    const clearAtTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener('scroll', clearAtTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', clearAtTop);
    };
  }, []);

  // Mobile menu: lock page scroll while open, close on Escape or when widening to desktop.
  useEffect(() => {
    if (!open) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      if (target) {
        requestAnimationFrame(() => {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', target);
        });
      }
      return undefined;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const lg = window.matchMedia('(min-width: 1024px)');
    const onLg = () => lg.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    lg.addEventListener('change', onLg);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      lg.removeEventListener('change', onLg);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`relative z-50 mx-auto max-w-7xl rounded-2xl transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          solid
            ? 'bg-night/80 shadow-[0_12px_40px_rgba(18,8,48,0.45),0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        {/* violet → blue hairline along the bottom edge once the bar is solid */}
        <span
          className={`pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(90deg,transparent,#8c00ff,#446eff,transparent)] transition-opacity duration-300 ${
            solid ? 'opacity-80' : 'opacity-0'
          }`}
          aria-hidden
        />

        <div className="flex h-14 items-center justify-between gap-4 px-3 sm:h-16 sm:px-4">
          <Wordmark />

          <nav
            className="hidden items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10 lg:flex"
            aria-label="Main"
          >
            {NAV.map((n) => {
              const isActive = active === n.href;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/[0.12] text-white shadow-[inset_0_0_0_1px_rgba(201,168,255,0.35)]'
                      : 'text-white/70 hover:bg-white/[0.07] hover:text-white'
                  }`}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={REGISTER_URL}
              {...linkProps(REGISTER_URL)}
              className="hidden items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(140,0,255,0.45)] transition-[background-color,box-shadow] hover:bg-brand-700 hover:shadow-[0_10px_30px_rgba(140,0,255,0.6)] sm:inline-flex"
            >
              Reserve a seat <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/10 transition-colors hover:bg-white/15 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile menu (React Bits Staggered Menu), driven by the toggle above */}
      <div className="lg:hidden">
        <StaggeredMenu
          className="bat-menu"
          isFixed
          showHeader={false}
          closeOnClickAway={false}
          open={open}
          onOpenChange={setOpen}
          activeLink={active}
          onItemClick={(link, e) => {
            e.preventDefault();
            pendingScroll.current = link;
          }}
          position="right"
          colors={['#2A1467', '#5B1FE0', '#446EFF']}
          accentColor="#C9A8FF"
          displaySocials={false}
          displayItemNumbering
          items={NAV.map((n) => ({ label: n.label, ariaLabel: `Go to ${n.label}`, link: n.href }))}
          footer={
            <>
              <a
                href={REGISTER_URL}
                {...linkProps(REGISTER_URL)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(140,0,255,0.45)]"
              >
                Reserve a seat <ArrowUpRight size={18} />
              </a>
              <p className="text-center text-sm text-white/55">17–19 Nov 2026 · MITEC, Kuala Lumpur</p>
            </>
          }
        />
      </div>
    </header>
  );
}
