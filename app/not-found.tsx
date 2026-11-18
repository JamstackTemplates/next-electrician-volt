import { BreakerArt } from '../components/art/breaker';
import { Multimeter, UnpluggedLead } from '../components/art/motifs';
import { SiteLink } from '../components/site-link';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services' },
  { href: '/contact/', label: 'Request a quote' },
];

export default function NotFound() {
  return <section className="concrete py-[clamp(3rem,8vw,6rem)]" aria-labelledby="not-found-heading">
    <div className="wrap">
      <div className="relative mx-auto max-w-4xl rounded-md border-2 border-black/60 bg-[#2c3137] px-6 py-10 text-[#f1efe8] sm:px-12 dark:bg-[#1c2025]">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="flex items-end justify-center gap-4">
            <BreakerArt on={false} tripped amps={16} className="h-auto w-24 sm:w-28" />
            <Multimeter reading="OL" className="h-auto w-28 sm:w-32" />
          </div>
          <div>
            <p className="dymo dymo-yellow">Error 404</p>
            <h1 id="not-found-heading" className="stencil mt-4 text-[clamp(3rem,8vw,5.4rem)]">Circuit open</h1>
            <p className="mt-4 max-w-[36ch] text-[1.15rem] text-[#b4b9bf]">This page has tripped. Reset to a working circuit:</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {LINKS.map(link => <li key={link.href}>
                <SiteLink href={link.href} className={`btn ${link.href === '/contact/' ? 'btn-hivis' : 'btn-line'}`}>{link.label}</SiteLink>
              </li>)}
            </ul>
          </div>
        </div>
        <UnpluggedLead className="mt-6 h-auto w-48 opacity-90" />
      </div>
    </div>
  </section>;
}
