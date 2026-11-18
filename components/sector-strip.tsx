import type { ReactNode } from 'react';
import type { Sector } from '../content/services';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

const ICON: Record<Sector, string> = { residential: 'house', commercial: 'shop', solar: 'solar' };
const CABLE: Record<Sector, string> = { residential: 'after:bg-[#8a4b22]', commercial: 'after:bg-[#1f5fa8]', solar: 'after:bg-[#ffd60a]' };

/** Full-bleed hazard-tape band with three jump links into Services. */
function SectorStripSection({ label, children }: { label: string; children: ReactNode }) {
  return <nav aria-label={label} className="hazard py-4 sm:py-5">
    <ul className="wrap grid gap-3 sm:grid-cols-3">{children}</ul>
  </nav>;
}

function Link({ sector, children, detail }: { sector: Sector; children: ReactNode; detail: ReactNode }) {
  return <li>
    <SiteLink href={`/services/#${sector}`}
      className={`group relative flex items-center gap-4 rounded-sm border-2 border-[#1b1e22] bg-[#1b1e22] px-4 py-3 text-[#f1efe8] no-underline after:absolute after:inset-x-4 after:bottom-1.5 after:h-[4px] ${CABLE[sector]} hover:bg-[#2c3137]`}>
      <Icon name={ICON[sector]} size={34} className="flex-none text-[#ffd60a]" />
      <span>
        <span className="block font-cond text-[1.6rem] font-bold leading-none">{children}</span>
        <span className="block pb-1 text-[.98rem] text-[#b4b9bf]">{detail}</span>
      </span>
    </SiteLink>
  </li>;
}

export const SectorStrip = Object.assign(SectorStripSection, { Link });
