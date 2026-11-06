import { LOGOS } from '../data';
import { Logo } from './primitives';

/** MyDIGITAL × KrackedDevs logo lockup on a white chip (logos are made for light backgrounds). */
export function OrganiserChip({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const h = size === 'sm' ? 'h-5' : 'h-6 sm:h-7';
  return (
    <span
      className={`inline-flex items-center rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] ${
        size === 'sm' ? 'gap-2.5 px-3 py-2' : 'gap-3 px-4 py-2.5'
      }`}
    >
      <Logo logo={LOGOS.mydigital} className={h} />
      <span className="text-sm font-medium text-muted" aria-hidden>
        ×
      </span>
      <Logo logo={LOGOS.krackeddevs} className={h} />
    </span>
  );
}
