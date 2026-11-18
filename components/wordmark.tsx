import { business } from '../content/business';
import { Bolt } from './art/icons';

/**
 * Stencil wordmark from business.name: the first "i" becomes a lightning bolt.
 * Words after the second sit underneath in condensed caps ("Electrical").
 */
export function Wordmark({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  const words = business.name.split(' ');
  const main = words.slice(0, 2).join(' ');
  const sub = words.slice(2).join(' ');
  const at = main.indexOf('i');
  const big = size === 'lg';
  return <span className={`inline-flex flex-col leading-none ${className}`}>
    <span className="sr-only">{business.name}</span>
    <span aria-hidden="true" className={`stencil whitespace-nowrap ${big ? 'text-[2.6rem]' : 'text-[1.45rem] sm:text-[1.7rem]'}`}>
      {at < 0 ? main : <>{main.slice(0, at)}<Bolt className="mx-[.02em] inline-block h-[.95em] w-auto -translate-y-[.04em] align-baseline text-hivis" />{main.slice(at + 1)}</>}
    </span>
    {sub ? <span aria-hidden="true" className={`mt-1 font-cond font-semibold tracking-[.32em] text-hivis ${big ? 'text-[1.05rem]' : 'text-[.72rem] sm:text-[.8rem]'}`}>{sub.toUpperCase()}</span> : null}
  </span>;
}
