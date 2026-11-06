import { LOGOS } from '../data';
import { Logo } from './primitives';

/**
 * MyDIGITAL and KrackedDevs logos side by side for dark backgrounds.
 * Uses MyDIGITAL's official white logo (cropped from the footer artwork on mydigital.gov.my,
 * without the Ministry crest). KrackedDevs is already bright and just gets a soft shadow.
 */
export function OrganiserLogos() {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
      <Logo logo={LOGOS.mydigitalWhite} className="h-7" />
      <Logo
        logo={LOGOS.krackeddevs}
        className="h-7 [filter:drop-shadow(0_4px_10px_rgba(0,0,0,0.6))_drop-shadow(0_0_12px_rgba(93,242,165,0.25))]"
      />
    </div>
  );
}
