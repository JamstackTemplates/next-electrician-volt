import type { ReactNode } from 'react';
import { services, type Sector } from '../content/services';
import { priceParts } from '../lib/format';
import { Icon } from './art/icons';
import { Dymo } from './ui';

const STRIPE: Record<Sector, string> = { residential: 'bg-residential', commercial: 'bg-commercial', solar: 'bg-solar' };

/**
 * One sector as the printed circuit schedule card from inside a switchboard door:
 * circuit number, Dymo label, rating, service and price. Rows stack on small screens.
 * Circuit numbers run continuously across sectors in content order.
 */
export function CircuitSchedule({ sector, children, includesLabel }: { sector: Sector; children: ReactNode; includesLabel: string }) {
  const rows = services.map((service, index) => ({ service, circuit: index + 1 })).filter(row => row.service.sector === sector);
  return <section id={sector} aria-labelledby={`${sector}-heading`} className="node scroll-mt-6">
    <div className="relative overflow-hidden rounded-sm border-2 border-ink/70 bg-card pl-3 shadow-[0_18px_30px_-22px_rgb(0_0_0/.7)]">
      <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-3 ${STRIPE[sector]}`} />
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-double border-ink/60 px-5 pb-3 pt-5 sm:px-7">
        <h2 id={`${sector}-heading`} className="stencil text-[clamp(2.2rem,4.6vw,3.2rem)]">{children}</h2>
        <p className="font-cond text-[1.05rem] font-semibold text-muted">Circuit schedule, {rows.length} circuits</p>
      </div>
      <table className="w-full border-collapse text-left">
        <thead className="max-md:hidden">
          <tr className="border-b-2 border-line font-cond text-[1rem] text-muted">
            <th scope="col" className="w-20 px-5 py-2 font-semibold sm:px-7">Circuit</th>
            <th scope="col" className="w-36 py-2 font-semibold">Label</th>
            <th scope="col" className="w-20 py-2 font-semibold">Rating</th>
            <th scope="col" className="py-2 font-semibold">Service</th>
            <th scope="col" className="w-48 py-2 pr-7 text-right font-semibold">Price, inc. GST</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ service, circuit }) => {
            const price = priceParts(service.price);
            return <tr key={service.id} id={`svc-${service.id}`} className="border-b border-line last:border-0 max-md:grid max-md:grid-cols-[auto_1fr_auto] max-md:items-center max-md:gap-x-3 max-md:px-5 max-md:py-4">
              <td className="stencil tabular px-5 py-4 align-top text-[1.6rem] text-muted max-md:p-0 sm:px-7">{String(circuit).padStart(2, '0')}</td>
              <td className="py-4 align-top max-md:p-0"><Dymo className="!text-[.85rem]">{service.breakerLabel}</Dymo></td>
              <td className="py-4 align-top font-cond text-[1.15rem] font-semibold tabular max-md:p-0 max-md:text-right">C{service.amps}</td>
              <td className="py-4 pr-4 align-top max-md:col-span-3 max-md:p-0 max-md:pt-3">
                <h3 className="flex items-center gap-2 text-[1.55rem] leading-tight"><Icon name={service.icon} size={22} className="flex-none text-muted" />{service.name}</h3>
                <p className="mt-1 max-w-[56ch] text-[1.04rem]">{service.summary}</p>
                {!service.available && service.availabilityNote
                  ? <p className="mt-3 flex flex-wrap items-center gap-3"><span className="stamp">Waitlist</span><span className="text-muted">{service.availabilityNote}</span></p>
                  : null}
                <details className="group mt-2">
                  <summary className="inline-flex cursor-pointer items-center gap-1 font-cond text-[1.05rem] font-semibold underline decoration-trace decoration-2 underline-offset-4">{includesLabel}</summary>
                  <ul className="mt-2 grid gap-1">
                    {service.includes.map(line => <li key={line} className="flex items-start gap-2"><Icon name="tick" size={18} className="mt-1 flex-none text-trace" />{line}</li>)}
                  </ul>
                </details>
              </td>
              <td className="py-4 pr-7 text-right align-top max-md:col-span-3 max-md:p-0 max-md:pt-3 max-md:text-left">
                <span className="block font-cond text-[.98rem] font-semibold text-muted">{price.lead}</span>
                <span className="stencil tabular block text-[1.9rem]">{price.figure}</span>
                {price.unit ? <span className="block text-muted">{price.unit}</span> : null}
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  </section>;
}

/** Callout listing any services that are currently unavailable. Renders nothing when all are available. */
export function WaitlistNote({ heading }: { heading: ReactNode }) {
  const waitlisted = services.filter(service => !service.available);
  if (!waitlisted.length) return null;
  return <aside aria-label="Waitlist" className="flex flex-col gap-4 rounded-sm border-2 border-dashed border-danger bg-raised p-5 sm:flex-row sm:items-center sm:p-6">
    <span className="stamp self-start sm:self-center">Waitlist</span>
    <div>
      <h2 className="font-cond text-[1.5rem]">{heading}</h2>
      <ul className="mt-1">{waitlisted.map(service => <li key={service.id}><strong>{service.name}:</strong> {service.availabilityNote}</li>)}</ul>
    </div>
  </aside>;
}
