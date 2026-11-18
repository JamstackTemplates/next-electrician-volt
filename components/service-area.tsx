import type { ReactNode } from 'react';
import { business } from '../content/business';
import { ServiceAreaMap } from './art/motifs';
import { SectionHeading } from './ui';

/** Full-bleed charcoal band: schematic circuit map beside a terminal-strip legend of suburbs. */
function ServiceAreaSection({ children }: { children: ReactNode }) {
  return <section className="band py-[clamp(3.5rem,8vw,6rem)]" aria-labelledby="area-heading">
    <div className="wrap">
      <div className="max-w-3xl">{children}</div>
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="-mx-2 overflow-x-auto"><ServiceAreaMap suburbs={business.suburbs} base={business.base.suburb} className="h-auto w-full min-w-[34rem]" /></div>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border-2 border-[#4a5058] bg-[#4a5058]">
          {business.suburbs.map((suburb, index) => <li key={suburb.id} className="flex items-center gap-3 bg-[#2c3137] px-3 py-2.5 dark:bg-[#16191d]">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-[2px] bg-[#a3a9af] font-cond text-[.85rem] font-bold text-[#1b1e22] tabular">{index + 1}</span>
            <span className="font-cond text-[1.15rem] font-semibold">{suburb.name}</span>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}

function Heading({ children }: { children: ReactNode }) {
  return <SectionHeading id="area-heading">{children}</SectionHeading>;
}

function Introduction({ children }: { children: ReactNode }) {
  return <p className="band-muted mt-4 max-w-(--measure) text-[1.12rem]">{children}</p>;
}

export const ServiceArea = Object.assign(ServiceAreaSection, { Heading, Introduction });
