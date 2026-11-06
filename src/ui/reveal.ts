import { useEffect, type CSSProperties } from 'react';

/**
 * Props for an element that fades + rises in the first time it enters the viewport.
 * `index` staggers siblings (e.g. cards in a row) by `step` ms each.
 */
export function reveal(index = 0, step = 90) {
  return {
    'data-reveal': '',
    style: { '--reveal-delay': `${index * step}ms` } as CSSProperties,
  };
}

/** Watches every `[data-reveal]` element and marks it revealed once it scrolls into view. */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-revealed'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
