'use client';

import { useCallback, useEffect, useState } from 'react';
import { BreakerArt } from './art/breaker';

export type SectorOption = { id: string; label: string; count: number; amps: number };

/**
 * Sector toggles for /services/. Without JavaScript they are plain links to #residential etc. and every
 * group stays visible. With JavaScript they become aria-pressed buttons that hide the other groups,
 * announce the result and keep the URL hash in sync, so /services/#solar opens filtered.
 */
export function SectorSelector({ options, label, allLabel, total }: { options: SectorOption[]; label: string; allLabel: string; total: number }) {
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState<string>('all');
  const [message, setMessage] = useState('');

  const apply = useCallback((id: string, announce: boolean) => {
    const valid = options.some(option => option.id === id) ? id : 'all';
    for (const option of options) {
      const group = document.getElementById(option.id);
      if (group) group.hidden = valid !== 'all' && option.id !== valid;
    }
    setActive(valid);
    if (announce) {
      const option = options.find(o => o.id === valid);
      setMessage(option ? `Showing ${option.count} ${option.label.toLowerCase()} ${option.count === 1 ? 'service' : 'services'}` : `Showing all ${total} services`);
    }
  }, [options, total]);

  useEffect(() => {
    setEnhanced(true);
    const fromHash = () => apply(decodeURIComponent(window.location.hash.slice(1)), false);
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [apply]);

  function choose(id: string) {
    apply(id, true);
    const url = `${window.location.pathname}${window.location.search}${id === 'all' ? '' : `#${id}`}`;
    window.history.replaceState(window.history.state, '', url);
  }

  const all: SectorOption = { id: 'all', label: allLabel, count: total, amps: 63 };
  const items = [all, ...options];

  return <div className="relative">
    <div role="group" aria-label={label} className="relative grid grid-cols-4 gap-2 sm:gap-4">
      <div aria-hidden="true" className="absolute inset-x-0 top-[38%] h-4 rounded-[2px]"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 22px, rgb(0 0 0 / .35) 22px 30px), linear-gradient(180deg, #d5d8db, #8f969d)' }} />
      {items.map(item => {
        const on = active === item.id;
        const pressed = active === item.id;
        const inner = <>
          <BreakerArt on={on} amps={item.amps} className={`mx-auto h-auto ${item.id === 'all' ? 'w-[4.4rem] sm:w-[5.4rem]' : 'w-[3.6rem] sm:w-[4.6rem]'}`} />
          <span className={`dymo mt-2 max-w-full !px-[.45em] text-[.72rem] !tracking-[.05em] sm:text-[.9rem] ${pressed ? 'dymo-yellow' : ''}`}>{item.label}</span>
          <span className="mt-1 block font-cond text-[.95rem] font-semibold text-band-muted tabular">{item.count} {item.count === 1 ? 'service' : 'services'}</span>
        </>;
        const className = 'relative flex flex-col items-center rounded-sm p-1 text-center no-underline';
        return enhanced
          ? <button key={item.id} type="button" aria-pressed={pressed} onClick={() => choose(item.id)} className={`breaker-tab ${className}`}>{inner}</button>
          : <a key={item.id} href={item.id === 'all' ? '#schedule' : `#${item.id}`} className={className}>{inner}</a>;
      })}
    </div>
    <p className="sr-only" role="status" aria-live="polite">{message}</p>
  </div>;
}
