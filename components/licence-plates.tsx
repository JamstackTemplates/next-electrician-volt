import type { ReactNode } from 'react';
import { licences } from '../content/licences';
import { RatingPlate, SectionHeading, Lede } from './ui';

/**
 * Licences as riveted rating plates.
 * - `stagger` (Home): offset, slightly overlapping row crossed by a circuit trace; 2×2 on small screens.
 * - `full` (Safety): one row of full plates with the complete title.
 */
function LicencePlatesSection({ children, variant = 'stagger', id = 'licences-heading' }: { children: ReactNode; variant?: 'stagger' | 'full'; id?: string }) {
  const offsets = ['lg:translate-y-0', 'lg:translate-y-8 lg:-ml-4', 'lg:-translate-y-3 lg:-ml-4', 'lg:translate-y-6 lg:-ml-4'];
  return <section className="relative py-[clamp(3.5rem,8vw,6rem)]" aria-labelledby={id}>
    <div className="wrap">
      {children}
      <div className="relative mt-10">
        {variant === 'stagger'
          ? <div aria-hidden="true" className="absolute inset-x-0 top-1/2 hidden h-[4px] bg-trace lg:block" style={{ filter: 'var(--glow)' }} />
          : null}
        <ul className={`relative grid gap-4 ${variant === 'stagger' ? 'grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:pb-8' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
          {licences.map((licence, index) => <li key={licence.id}
            className={variant === 'stagger' ? `${offsets[index % 4]} relative` : ''}
            style={variant === 'stagger' ? { zIndex: 4 - index } : undefined}>
            <RatingPlate licence={licence} detail={variant === 'full'} className="h-full" />
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}

function Heading({ children, id = 'licences-heading' }: { children: ReactNode; id?: string }) {
  return <SectionHeading id={id}>{children}</SectionHeading>;
}

function Introduction({ children }: { children: ReactNode }) {
  return <Lede>{children}</Lede>;
}

export const LicencePlates = Object.assign(LicencePlatesSection, { Heading, Introduction });
