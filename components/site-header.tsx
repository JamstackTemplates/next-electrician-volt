import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { Icon } from './art/icons';
import { MobileMenu } from './mobile-menu';
import { SiteLink } from './site-link';
import { Wordmark } from './wordmark';

const NAV = [
  { href: '/services/', label: 'Services' },
  { href: '/safety/', label: 'Safety check' },
  { href: '/contact/', label: 'Contact' },
];

const navLink = 'relative font-cond text-[1.15rem] font-semibold uppercase tracking-[.05em] no-underline hover:text-hivis aria-[current=page]:text-hivis after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[3px] after:bg-hivis after:opacity-0 aria-[current=page]:after:opacity-100';

export function SiteHeader() {
  return <header className="site-header band relative z-40">
    <div className="hazard-edge" aria-hidden="true" />
    {/* Small screens: phone and theme toggle on a slim utility strip */}
    <div className="border-b border-white/10 md:hidden">
      <div className="wrap flex min-h-11 items-center justify-between gap-3">
        <a href={`tel:${business.phoneHref}`} className="flex items-center gap-2 font-cond text-[1.1rem] font-semibold no-underline">
          <Icon name="phone" size={18} className="text-hivis" />Call {business.phone}
        </a>
        <DarkModeToggle />
      </div>
    </div>
    <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-3">
      <SiteLink href="/" className="min-w-0 no-underline"><Wordmark /></SiteLink>
      <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
        {NAV.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page" className={navLink}>{item.label}</SiteLink>)}
      </nav>
      <div className="flex items-center gap-3">
        <a href={`tel:${business.phoneHref}`} className="hidden items-center gap-2 font-cond text-[1.2rem] font-semibold no-underline hover:text-hivis lg:flex">
          <Icon name="phone" size={18} className="text-hivis" />{business.phone}
        </a>
        <SiteLink href="/contact/" className="btn btn-hivis !min-h-11 whitespace-nowrap !px-3 !text-[1rem] !shadow-none sm:!px-4 sm:!text-[1.05rem]">Request a quote</SiteLink>
        <span className="hidden md:block"><DarkModeToggle /></span>
        <MobileMenu>
          {NAV.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page"
            className="block border-b border-white/10 px-3 py-3 font-cond text-[1.25rem] font-semibold uppercase tracking-[.05em] no-underline last:border-0 aria-[current=page]:text-hivis">{item.label}</SiteLink>)}
        </MobileMenu>
      </div>
    </div>
  </header>;
}
