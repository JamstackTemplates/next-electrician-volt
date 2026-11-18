import type { ReactNode } from 'react';
import { Dymo } from './ui';

/**
 * Inner-page heading block: a Dymo kicker, a stencil title, a lede and optional artwork on the right.
 * - `charcoal`: steel band (Services)
 * - `graphite`: band with a circuit-grid texture (Safety)
 * - `hazard`: band framed by hazard tape (Contact)
 */
export function PageHead({ kicker, title, children, art, tone = 'charcoal', id }: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  art?: ReactNode;
  tone?: 'charcoal' | 'graphite' | 'hazard';
  id?: string;
}) {
  const grid = tone === 'graphite'
    ? { backgroundImage: 'var(--speckle), linear-gradient(rgb(255 214 10 / .06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 214 10 / .06) 1px, transparent 1px)', backgroundSize: 'auto, 32px 32px, 32px 32px' }
    : undefined;
  return <div className="band relative overflow-hidden" style={grid}>
    {tone === 'hazard' ? <div className="hazard h-4" aria-hidden="true" /> : null}
    <header className="wrap grid items-end gap-8 pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(2.5rem,6vw,4.5rem)] md:grid-cols-[1.25fr_1fr]">
      <div>
        <Dymo yellow={tone !== 'charcoal'}>{kicker}</Dymo>
        <h1 id={id} className="stencil mt-5 max-w-[14ch] text-[clamp(2.9rem,7.4vw,5.6rem)]">{title}</h1>
        {children ? <div className="band-muted mt-5 max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.25rem)]">{children}</div> : null}
      </div>
      {art ? <div className="relative flex justify-center md:justify-end">{art}</div> : null}
    </header>
    {tone === 'hazard' ? <div className="hazard h-4" aria-hidden="true" /> : null}
  </div>;
}
