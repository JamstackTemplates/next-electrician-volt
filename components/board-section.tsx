import type { ReactNode } from 'react';
import { featuredServices } from '../content/services';
import { priceParts } from '../lib/format';
import { SectionHeading, Lede } from './ui';
import { Switchboard, type BoardItem } from './switchboard';

/** Home: the signature Switchboard of featured services, on a raised concrete panel. */
function BoardSection({ children }: { children: ReactNode }) {
  return <section className="py-[clamp(3.5rem,8vw,6.5rem)]" aria-labelledby="board-heading">
    <div className="wrap">{children}</div>
  </section>;
}

function Heading({ children }: { children: ReactNode }) {
  return <SectionHeading id="board-heading">{children}</SectionHeading>;
}

function Introduction({ children }: { children: ReactNode }) {
  return <Lede>{children}</Lede>;
}

/** The board itself. `label` names the breaker row for assistive tech; `details` is the readout link text. */
function Board({ label, details }: { label: string; details: string }) {
  const items: BoardItem[] = featuredServices.map(service => {
    const price = priceParts(service.price);
    return {
      id: service.id, name: service.name, summary: service.summary, includes: service.includes,
      breakerLabel: service.breakerLabel, amps: service.amps, icon: service.icon, sector: service.sector,
      priceLead: price.lead, priceFigure: price.figure, priceUnit: price.unit,
      available: service.available, availabilityNote: service.availabilityNote,
    };
  });
  return <div className="mt-9"><Switchboard items={items} label={label} detailsLabel={details} /></div>;
}

export const BoardShowcase = Object.assign(BoardSection, { Heading, Introduction, Board });
