import type { ReactNode } from 'react';
import { LOGOS } from '../data';

/** Opens absolute (external) URLs in a new tab; in-page anchors stay put. */
export function linkProps(href: string) {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

export function Logo({
  logo,
  className = '',
}: {
  logo: (typeof LOGOS)[keyof typeof LOGOS];
  className?: string;
}) {
  return <img src={logo.src} alt={logo.alt} className={`block w-auto select-none ${className}`} draggable={false} />;
}

/** Tag that shows the official ILMU logo for ILMUchat / ILMUcode, plain text otherwise. */
export function ToolTag({ name }: { name: string }) {
  if (name === 'ILMUchat' || name === 'ILMUcode') {
    return (
      <span className="inline-flex items-center rounded-full border border-line bg-white px-2.5 py-1.5">
        <Logo logo={name === 'ILMUchat' ? LOGOS.ilmuchat : LOGOS.ilmucode} className="h-3.5" />
      </span>
    );
  }
  return <Tag>{name}</Tag>;
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.14em] ${dark ? 'text-[#c9a8ff]' : 'text-brand'}`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div data-reveal="" className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-3 font-display text-3xl font-bold leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-slate'}`}>
          {lead}
        </p>
      )}
    </div>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'ghost-dark' | 'white';
  className?: string;
}) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-700 shadow-[0_10px_30px_rgba(140,0,255,0.35)]',
    white: 'bg-white text-ink hover:bg-lav',
    ghost: 'border border-line bg-white text-ink hover:border-brand/40 hover:text-brand',
    'ghost-dark': 'border border-white/20 bg-white/5 text-white hover:bg-white/10',
  }[variant];
  return (
    <a
      href={href}
      {...linkProps(href)}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function Tag({ children, tone = 'lav' }: { children: ReactNode; tone?: 'lav' | 'dark' | 'mono' }) {
  const styles = {
    lav: 'bg-lav text-ink',
    dark: 'bg-white/10 text-white/85',
    mono: 'bg-ink text-white font-mono',
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>{children}</span>;
}
