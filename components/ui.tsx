import type { ReactNode } from 'react';
import { formatValidTo, type Licence } from '../content/licences';

type Children = { children: ReactNode; className?: string };

/** Embossed label tape. Black by default, yellow for emphasis. */
export function Dymo({ children, yellow = false, className = '' }: Children & { yellow?: boolean }) {
  return <span className={`dymo ${yellow ? 'dymo-yellow' : ''} ${className}`}>{children}</span>;
}

/** Section heading with a solder-pad node on the page's circuit rail. */
export function SectionHeading({ children, className = '', id, as = 'h2' }: Children & { id?: string; as?: 'h2' | 'h3' }) {
  const Tag = as;
  return <Tag id={id} className={`node text-[clamp(2.1rem,4.6vw,3.4rem)] ${className}`}>{children}</Tag>;
}

/** Supporting paragraph under a section heading. */
export function Lede({ children, className = '' }: Children) {
  return <p className={`mt-4 max-w-(--measure) text-[1.12rem] text-muted ${className}`}>{children}</p>;
}

/** Riveted brushed-steel plate for a licence or insurance policy. */
export function RatingPlate({ licence, detail = false, className = '' }: { licence: Licence; detail?: boolean; className?: string }) {
  return <div className={`plate steel ${className}`}>
    <p className="engraved font-cond text-[.95rem] font-semibold opacity-80">{licence.issuer}</p>
    <p className="engraved mt-1 font-cond text-[1.55rem] font-bold leading-none">{detail ? licence.title : licence.short}</p>
    <p className="engraved stencil tabular mt-3 text-[1.25rem]">{licence.number}</p>
    <p className="engraved mt-1 font-cond text-[.95rem] font-semibold opacity-80">Valid to {formatValidTo(licence.validTo)}</p>
  </div>;
}
