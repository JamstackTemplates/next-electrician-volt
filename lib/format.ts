import { DAYS, openingLabel, validateHours, type OpeningHours } from './hours.ts';
import type { Price } from '../content/services.ts';

/** AUD amount: whole dollars without cents, otherwise two decimals. 1650 → "$1,650", 6.5 → "$6.50". */
export function formatAud(amount: number): string {
  const whole = Number.isInteger(amount);
  return `$${amount.toLocaleString('en-AU', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 })}`;
}

/** Price parts for display: a lead word ("From", "Fixed", "Quote"), the figure and an optional unit. */
export function priceParts(price: Price): { lead: string; figure: string; unit: string } {
  if (price.type === 'quote') return { lead: 'Quoted', figure: 'By quote', unit: price.note ?? '' };
  return { lead: price.type === 'from' ? 'From' : 'Fixed', figure: formatAud(price.amount), unit: price.unit ?? '' };
}

/** One-line plain price, e.g. "From $1,650", "$149 per alarm", "By quote". */
export function formatPrice(price: Price): string {
  if (price.type === 'quote') return price.note ? `By quote (${price.note.toLowerCase()})` : 'By quote';
  const unit = price.unit ? ` ${price.unit}` : '';
  return `${price.type === 'from' ? 'From ' : ''}${formatAud(price.amount)}${unit}`;
}

const SHORT: Record<string, string> = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

/** "07:00" → "7am", "12:30" → "12:30pm". */
export function clock12(value: string): string {
  const hour = Number(value.slice(0, 2));
  const minute = value.slice(3);
  const suffix = hour < 12 ? 'am' : 'pm';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}${minute === '00' ? '' : `:${minute}`}${suffix}`;
}

/** Consecutive days with the same hours, e.g. [{ days: "Mon–Fri", span: "7am–5pm" }, { days: "Sat", span: "8am–12pm" }]. Closed days are left out. */
export function hoursGroups(hours: readonly OpeningHours[]): { days: string; span: string }[] {
  validateHours(hours);
  const groups: { from: string; to: string; span: string }[] = [];
  for (const day of DAYS) {
    const entry = hours.find(value => value.day === day)!;
    if (!entry.opens || !entry.closes) continue;
    const span = `${clock12(entry.opens)}–${clock12(entry.closes)}`;
    const last = groups.at(-1);
    if (last && last.span === span && last.to === DAYS[DAYS.indexOf(day) - 1]) last.to = day;
    else groups.push({ from: day, to: day, span });
  }
  return groups.map(g => ({ days: `${SHORT[g.from]}${g.from === g.to ? '' : `–${SHORT[g.to]}`}`, span: g.span }));
}

/** Neutral static summary that never depends on the current time, e.g. "Mon–Fri 7am–5pm, Sat 8am–12pm". */
export function hoursSummary(hours: readonly OpeningHours[]): string {
  return hoursGroups(hours).map(group => `${group.days} ${group.span}`).join(', ');
}

/**
 * Browser-only phone status built on the shared openingLabel, e.g.
 * "Phones open now, until 5pm" or "Phones closed, back Monday at 7am".
 */
export function phonesLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const label = openingLabel(hours, timeZone, now);
  const open = /^Open now · until (\d\d:\d\d)$/.exec(label);
  if (open) return `Phones open now, until ${clock12(open[1])}`;
  const closed = /^Closed · opens (today|\w+day) at (\d\d:\d\d)$/.exec(label);
  if (closed) return `Phones closed, back ${closed[1]} at ${clock12(closed[2])}`;
  return `Phone hours: ${hoursSummary(hours)}`;
}
