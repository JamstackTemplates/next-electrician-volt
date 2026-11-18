"use client";
import { useEffect, useState } from 'react';
import { hoursSummary, phonesLabel } from '../lib/format';
import type { OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Phone-hours status. Static/no-JS output is the neutral weekly summary from the hours data;
 * the browser replaces it with "Phones open now…" in the business time zone and refreshes every minute.
 */
export function OpenBadge({ hours, className = '' }: { hours: readonly OpeningHours[]; className?: string }) {
  const neutral = `Phone hours: ${hoursSummary(hours)}`;
  const [label, setLabel] = useState(neutral);
  const [state, setState] = useState<'neutral' | 'open' | 'closed'>('neutral');
  useEffect(() => {
    const update = () => {
      const next = phonesLabel(hours, site.timeZone);
      setLabel(next);
      setState(next.startsWith('Phones open') ? 'open' : next.startsWith('Phones closed') ? 'closed' : 'neutral');
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);
  return <span className={`status-lamp ${className}`} data-state={state}>
    <span className="status-lamp__led" aria-hidden="true" />
    <span>{label}</span>
  </span>;
}
