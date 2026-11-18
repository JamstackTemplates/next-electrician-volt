import type { ReactNode } from 'react';
import { safetyChecks } from '../content/safety';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

/** Home: an oversized stencil count beside four sample checks. */
function SafetyTeaserSection({ children, sample }: { children: ReactNode; sample: string[] }) {
  const items = sample.map(id => {
    const item = safetyChecks.find(check => check.id === id);
    if (!item) throw new Error(`SafetyTeaser: unknown check "${id}" (see content/safety.ts)`);
    return item;
  });
  return <section className="py-[clamp(3.5rem,8vw,6.5rem)]" aria-labelledby="safety-teaser-heading">
    <div className="wrap node grid items-center gap-8 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)] md:gap-14">
      <p aria-hidden="true" className="stencil tabular text-[clamp(10rem,28vw,20rem)] leading-[.8] text-trace" style={{ filter: 'var(--glow)' }}>
        {safetyChecks.length}
      </p>
      <div>
        {children}
        <ul className="mt-6 grid gap-3">
          {items.map(item => <li key={item.id} className="flex items-start gap-3 border-b-2 border-line pb-3 text-[1.08rem]">
            <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-[3px] border-2 border-ink bg-hivis text-[#1b1e22]"><Icon name="tick" size={18} /></span>
            {item.check}
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 id="safety-teaser-heading" className="text-[clamp(2.1rem,4.6vw,3.4rem)]">{children}</h2>;
}

function Introduction({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-(--measure) text-[1.12rem] text-muted">{children}</p>;
}

function Action({ children }: { children: ReactNode }) {
  return <SiteLink href="/safety/" className="btn btn-primary mt-7">{children}</SiteLink>;
}

export const SafetyTeaser = Object.assign(SafetyTeaserSection, { Heading, Introduction, Action });
