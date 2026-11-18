import type { ReactNode } from 'react';
import { business } from '../content/business';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

/**
 * Closing call to action.
 * - `hazard`: a hazard-tape frame around a stencil line (Home).
 * - `panel`: a charcoal steel panel with a yellow edge (Services, Safety).
 */
function CallToActionSection({ children, tone = 'panel' }: { children: ReactNode; tone?: 'hazard' | 'panel' }) {
  return <section className="py-[clamp(3rem,7vw,5.5rem)]" aria-label="Request a quote">
    <div className="wrap">
      <div className={tone === 'hazard' ? 'hazard rounded-sm p-3 sm:p-5' : 'border-l-[10px] border-hivis'}>
        <div className="band grid gap-6 px-6 py-9 sm:px-10 md:grid-cols-[1fr_auto] md:items-center">{children}</div>
      </div>
    </div>
  </section>;
}

function Heading({ children }: { children: ReactNode }) {
  return <div>
    <h2 className="stencil max-w-[18ch] text-[clamp(2.2rem,5vw,3.8rem)]">{children}</h2>
  </div>;
}

function Text({ children }: { children: ReactNode }) {
  return <p className="band-muted -mt-3 max-w-(--measure) text-[1.1rem] md:col-start-1">{children}</p>;
}

function Actions({ quote }: { quote: ReactNode }) {
  return <div className="flex flex-col gap-3 md:col-start-2 md:row-span-2 md:row-start-1 md:items-end">
    <SiteLink href="/contact/" className="btn btn-hivis text-[1.25rem]">{quote}</SiteLink>
    <a href={`tel:${business.phoneHref}`} className="flex items-center gap-2 font-cond text-[1.2rem] font-semibold no-underline hover:text-hivis">
      <Icon name="phone" size={18} className="text-hivis" />{business.phone}
    </a>
  </div>;
}

export const CallToAction = Object.assign(CallToActionSection, { Heading, Text, Actions });
