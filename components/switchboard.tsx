'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { BreakerArt, DinRail } from './art/breaker';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

/** Serializable service fields the Switchboard shows (prepared on the server from content/services.ts). */
export type BoardItem = {
  id: string; name: string; summary: string; includes: string[]; breakerLabel: string; amps: number;
  icon: string; sector: string; priceLead: string; priceFigure: string; priceUnit: string;
  available: boolean; availabilityNote?: string;
};

const COL = 100;

/**
 * The signature element: services as DIN-rail breakers. Flipping one on lights its trace and swaps the readout.
 * Without JavaScript the breakers are decorative and every readout is listed underneath.
 */
export function Switchboard({ items, label, detailsLabel }: { items: BoardItem[]; label: string; detailsLabel: string }) {
  const [enhanced, setEnhanced] = useState(false);
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setEnhanced(true), []);

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = items.length - 1;
    const next = event.key === 'ArrowRight' ? (selected === last ? 0 : selected + 1)
      : event.key === 'ArrowLeft' ? (selected === 0 ? last : selected - 1)
      : event.key === 'Home' ? 0 : event.key === 'End' ? last : -1;
    if (next < 0) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
    tabs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  const width = items.length * COL;
  const centre = width / 2;

  return <div className="enclosure relative rounded-md border-2 border-black/60 bg-[#2c3137] p-3 text-band-ink shadow-[inset_0_2px_0_rgb(255_255_255/.08),0_24px_40px_-24px_rgb(0_0_0/.7)] sm:p-6 dark:bg-[#1c2025]">
    <Screws />
    <div className="rail-scroll -mx-1 overflow-x-auto px-1 pb-2">
      <div style={{ minWidth: `${items.length * 5.4}rem` }}>
        <div className="relative pt-3">
          <DinRail className="absolute inset-x-0 top-[43%]" />
          <div {...(enhanced ? { role: 'tablist', 'aria-label': label } : { 'aria-hidden': true })}
            className="relative grid gap-2" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
            {items.map((item, index) => {
              const on = enhanced ? index === selected : index === 0;
              const body = <>
                <BreakerArt on={on} amps={item.amps} className="mx-auto block h-auto w-[3.6rem] sm:w-[4.2rem]" />
                <span className={`dymo mt-2 max-w-full truncate text-[.8rem] sm:text-[.9rem] ${on ? 'dymo-yellow' : ''}`}>{item.breakerLabel}</span>
              </>;
              return enhanced
                ? <button key={item.id} type="button" role="tab" id={`board-tab-${item.id}`} aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    ref={element => { tabs.current[index] = element; }}
                    onClick={() => setSelected(index)} onKeyDown={onKey}
                    className="breaker-tab flex flex-col items-center rounded-sm p-1">
                    {body}
                    <span className="sr-only">{item.name}</span>
                  </button>
                : <div key={item.id} className="flex flex-col items-center p-1">{body}</div>;
            })}
          </div>
        </div>
        {/* Circuit traces from each breaker to the readout bus */}
        <svg viewBox={`0 0 ${width} 56`} preserveAspectRatio="none" className="block h-12 w-full" aria-hidden="true">
          {items.map((item, index) => {
            const x = index * COL + COL / 2;
            const on = enhanced ? index === selected : index === 0;
            const d = `M${x} 0 V22 L${x + (centre - x) * .15} 30 H${centre} V56`;
            return <g key={item.id}>
              <path d={d} fill="none" stroke={on ? '#ffd60a' : '#4a5058'} strokeWidth={on ? 3 : 2} vectorEffect="non-scaling-stroke"
                style={on ? { filter: 'drop-shadow(0 0 4px rgb(255 214 10 / .6))' } : undefined} />
              {on ? <path d={d} fill="none" stroke="#2c3137" strokeWidth={2} vectorEffect="non-scaling-stroke" className="flow" /> : null}
            </g>;
          })}
        </svg>
      </div>
    </div>

    {enhanced
      ? items.map((item, index) => <div key={item.id} role="tabpanel" id={`board-panel-${item.id}`}
          aria-labelledby={`board-tab-${item.id}`} hidden={index !== selected} tabIndex={0}>
          <Readout item={item} detailsLabel={detailsLabel} />
        </div>)
      : <ul className="grid gap-4">{items.map(item => <li key={item.id}><Readout item={item} detailsLabel={detailsLabel} /></li>)}</ul>}
  </div>;
}

function Readout({ item, detailsLabel }: { item: BoardItem; detailsLabel: string }) {
  return <article className="readout-lcd grid gap-5 rounded-sm p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-end">
    <div>
      <p className="lcd-dim flex items-center gap-2 font-cond text-[1rem] font-semibold capitalize">
        <Icon name={item.icon} size={20} /> {item.sector} circuit, {item.amps} A
      </p>
      <h3 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)]">{item.name}</h3>
      <p className="mt-2 max-w-[48ch] text-[1.05rem]">{item.summary}</p>
      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {item.includes.map(line => <li key={line} className="flex items-start gap-2"><Icon name="tick" size={18} className="mt-1 flex-none text-[#ffd60a]" />{line}</li>)}
      </ul>
      {!item.available && item.availabilityNote ? <p className="mt-4"><span className="stamp !border-[#ff8a80] !text-[#ff8a80]">Waitlist</span> <span className="ml-2">{item.availabilityNote}</span></p> : null}
    </div>
    <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
      <p>
        <span className="lcd-dim block font-cond text-[1rem] font-semibold">{item.priceLead}</span>
        <span className="stencil tabular block text-[2.6rem] text-[#ffd60a]">{item.priceFigure}</span>
        {item.priceUnit ? <span className="lcd-dim block">{item.priceUnit}</span> : null}
      </p>
      <SiteLink href={`/services/#${item.sector}`} className="btn btn-line !min-h-11 text-[1.05rem]">
        {detailsLabel}<span className="sr-only">: {item.name}</span>
      </SiteLink>
    </div>
  </article>;
}

function Screws() {
  const screw = 'absolute h-3 w-3 rounded-full bg-[radial-gradient(circle_at_40%_35%,#c9cdd1,#6b7178)] shadow-[0_1px_0_rgb(0_0_0/.5)] after:absolute after:inset-x-[2px] after:top-[5px] after:h-[2px] after:bg-[#33383e] after:content-[""]';
  return <span aria-hidden="true">
    <span className={`${screw} left-2 top-2`} /><span className={`${screw} right-2 top-2`} />
    <span className={`${screw} bottom-2 left-2`} /><span className={`${screw} bottom-2 right-2`} />
  </span>;
}
