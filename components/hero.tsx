import type { ReactNode } from 'react';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { Icon } from './art/icons';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

const HERO_ALT =
  'Open matte-charcoal electrical switchboard with high-vis yellow DIN-rail circuit breakers, copper and Australian-standard wiring, and glowing circuit traces feeding a solar home.';

/** Home hero: stencil headline and actions on the left, themed switchboard hero artwork on the right. */
function HeroSection({ children }: Children) {
  const imgClass =
    'hero-media h-full w-full object-cover object-center md:h-auto';
  return <section className="concrete relative overflow-hidden" aria-labelledby="hero-heading">
    <div className="wrap grid items-center gap-6 pb-6 pt-7 sm:pb-8 sm:pt-10 md:grid-cols-12 md:gap-6 md:pb-12 md:pt-14">
      <div className="relative z-10 md:col-span-6 lg:col-span-5">{children}</div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-md border-2 border-ink/15 shadow-[0_24px_48px_-22px_rgb(0_0_0/.55)] dark:border-white/15 md:col-span-6 md:aspect-[1200/896] lg:col-span-7">
        <img
          src={asset('/hero-light.jpg')}
          alt={HERO_ALT}
          width={1200}
          height={896}
          fetchPriority="high"
          decoding="async"
          className={`${imgClass} hero-media--light`}
        />
        <img
          src={asset('/hero-dark.jpg')}
          alt={HERO_ALT}
          width={1200}
          height={896}
          fetchPriority="high"
          decoding="async"
          className={`${imgClass} hero-media--dark`}
        />
      </div>
    </div>
  </section>;
}

function Heading({ children }: Children) {
  return <h1 id="hero-heading" className="node stencil text-[clamp(2.5rem,6.2vw,5.4rem)]">{children}</h1>;
}

function Introduction({ children }: Children) {
  return <p className="mt-4 max-w-[34ch] text-[1.1rem] text-muted sm:mt-5 sm:text-[1.25rem]">{children}</p>;
}

function Actions({ quote, call }: { quote: ReactNode; call: ReactNode }) {
  return <div className="mt-5 flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:mt-7">
    <SiteLink href="/contact/" className="btn btn-hivis text-[1.25rem]">{quote}</SiteLink>
    <a href={`tel:${business.phoneHref}`} className="btn btn-primary text-[1.2rem]">
      <Icon name="phone" size={20} />{call} {business.phone}
    </a>
  </div>;
}

function Status() {
  return <p className="mt-4 text-muted"><OpenBadge hours={business.hours} /></p>;
}

export const Hero = Object.assign(HeroSection, { Heading, Introduction, Actions, Status });
