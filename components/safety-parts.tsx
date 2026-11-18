import type { ReactNode } from 'react';
import { business } from '../content/business';
import { safetyChecks } from '../content/safety';
import { serviceById } from '../content/services';
import { formatPrice } from '../lib/format';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';
import { SectionHeading } from './ui';

type Children = { children: ReactNode };

/** Red-bordered stop-and-call panel listing every check marked stopAndCall in content/safety.ts. */
function StopPanel({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const stops = safetyChecks.filter(item => item.stopAndCall);
  return <section aria-labelledby="stop-heading" className="node relative rounded-sm border-[3px] border-danger bg-raised p-6 sm:p-8">
    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
      <Icon name="warning" size={64} className="text-danger" />
      <div>
        <h2 id="stop-heading" className="text-[clamp(1.9rem,4vw,2.8rem)]">{heading}</h2>
        <ul className="mt-4 grid gap-2">
          {stops.map(item => <li key={item.id} className="flex items-start gap-3 text-[1.1rem]">
            <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none bg-danger" />{item.check}
          </li>)}
        </ul>
        <div className="mt-5 rounded-sm bg-danger-fill px-4 py-3 text-[1.1rem] font-semibold text-white">{children}</div>
      </div>
    </div>
  </section>;
}

/** Visual-only rule, set as a stencilled notice. */
function Rule({ children }: Children) {
  return <p className="safety-rule flex items-start gap-3 border-l-[6px] border-hivis bg-surface px-5 py-4 text-[1.1rem] font-semibold">
    <Icon name="warning" size={24} className="mt-0.5 flex-none" />{children}
  </p>;
}

/** What a paid inspection adds: links to the safety-inspection service with its live price. */
function Inspection({ heading, children, action }: { heading: ReactNode; children: ReactNode; action: ReactNode }) {
  const service = serviceById('safety-inspection');
  if (!service) throw new Error('Safety page: service "safety-inspection" is missing from content/services.ts');
  return <section aria-labelledby="inspection-heading" className="band py-[clamp(3rem,7vw,5rem)]">
    <div className="wrap grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div>
        <SectionHeading id="inspection-heading">{heading}</SectionHeading>
        <p className="band-muted mt-4 max-w-(--measure) text-[1.12rem]">{children}</p>
      </div>
      <div className="readout-lcd rounded-sm p-6">
        <p className="lcd-dim font-cond text-[1.05rem] font-semibold">{service.name}</p>
        <p className="stencil tabular mt-1 text-[3rem] text-[#ffd60a]">{formatPrice(service.price)}</p>
        <ul className="mt-3 grid gap-1.5">
          {service.includes.map(line => <li key={line} className="flex items-start gap-2"><Icon name="tick" size={18} className="mt-1 flex-none text-[#ffd60a]" />{line}</li>)}
        </ul>
        <SiteLink href="/contact/" className="btn btn-hivis mt-5">{action}</SiteLink>
      </div>
    </div>
  </section>;
}

/** Header printed at the top of the checklist sheet. */
function PrintHeader() {
  return <p className="font-cond text-[1.1rem] font-semibold">{business.name} · {business.phone} · {business.email}</p>;
}

export const Safety = { StopPanel, Rule, Inspection, PrintHeader };
