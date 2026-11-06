/**
 * The "builda thon" pixel wordmark with a slow colour sweep across the letter faces.
 *
 * The logo is raster art (off-white striped letters + black extrusion), so the colour is an
 * animated gradient layer masked to the letter faces only (`buildathon-face.png`) and
 * multiplied over the original. The stripe texture and black shadow stay untouched.
 */
export function BuildathonLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`bat-logo relative inline-block aspect-[720/440] isolate ${className}`}>
      <img
        src="/logos/buildathon.webp"
        alt="Build-a-thon"
        width={720}
        height={440}
        className="block size-full select-none"
        draggable={false}
      />
      <span className="bat-logo__tint pointer-events-none absolute inset-0" aria-hidden />
    </span>
  );
}
