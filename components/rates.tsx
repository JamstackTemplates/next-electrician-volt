import type { ReactNode } from 'react';
import { business } from '../content/business';
import { formatAud, hoursGroups } from '../lib/format';
import { CableEnds } from './art/motifs';
import { OpenBadge } from './open-badge';
import { SectionHeading } from './ui';

/** Rates and hours set like meter readouts, under a run of stripped cable. */
function RatesSection({ children, id = 'rates-heading' }: { children: ReactNode; id?: string }) {
  const { callOut, callOutCoversMinutes, hourly, incrementMinutes } = business.rates;
  const [first, ...rest] = hoursGroups(business.hours);
  const readouts = [
    { figure: formatAud(callOut), label: 'Call-out', note: `Covers the first ${callOutCoversMinutes} minutes on site` },
    { figure: `${formatAud(hourly)}/hr`, label: 'Hourly after that', note: `Billed in ${incrementMinutes}-minute increments` },
    { figure: first.span, label: `Phone hours, ${first.days}`, note: rest.map(g => `${g.days} ${g.span}`).join(', ') || 'Closed weekends' },
  ];
  return <section className="relative overflow-hidden bg-surface pb-[clamp(3.5rem,8vw,6rem)]" aria-labelledby={id}>
    <CableEnds bleed className="w-[min(100%,60rem)]" />
    <div className="wrap mt-8">
      {children}
      <dl className="mt-9 grid gap-4 md:grid-cols-3">
        {readouts.map(readout => <div key={readout.label} className="readout-lcd rounded-sm p-5">
          <dt className="lcd-dim mb-2 font-cond text-[1.1rem] font-semibold">{readout.label}</dt>
          <dd>
            <span className="stencil tabular block text-[clamp(2.2rem,4.4vw,3.2rem)] text-[#ffd60a]">{readout.figure}</span>
            <span className="lcd-dim mt-2 block">{readout.note}</span>
          </dd>
        </div>)}
      </dl>
      <p className="mt-5 text-muted"><OpenBadge hours={business.hours} /></p>
    </div>
  </section>;
}

function Heading({ children, id = 'rates-heading' }: { children: ReactNode; id?: string }) {
  return <SectionHeading id={id}>{children}</SectionHeading>;
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-(--measure) text-[1.08rem] text-muted">{children}</p>;
}

export const Rates = Object.assign(RatesSection, { Heading, Note });
