import { business } from '../content/business';
import { licences } from '../content/licences';
import { hoursSummary } from '../lib/format';
import { CircuitDivider } from './art/motifs';
import { SiteLink } from './site-link';
import { Wordmark } from './wordmark';

export function SiteFooter() {
  return <footer className="site-footer band mt-0">
    <CircuitDivider />
    <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
      <div>
        <SiteLink href="/" className="no-underline"><Wordmark size="lg" /></SiteLink>
        <p className="band-muted mt-4 max-w-[28ch]">{business.tagline} across Melbourne’s inner north and east.</p>
      </div>
      <div>
        <h2 className="font-cond text-[1.3rem] text-hivis">Phones and office</h2>
        <p className="mt-3">{hoursSummary(business.hours)}</p>
        <p className="band-muted">Closed Sundays and public holidays. No after-hours call-outs.</p>
        <p className="mt-3"><a className="text-link" href={`tel:${business.phoneHref}`}>{business.phone}</a></p>
        <p><a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></p>
      </div>
      <div>
        <h2 className="font-cond text-[1.3rem] text-hivis">Where we work</h2>
        <p className="mt-3">{business.suburbs.map(s => s.name).join(', ')}.</p>
        <p className="band-muted mt-2">{business.base.label}</p>
      </div>
      <div>
        <h2 className="font-cond text-[1.3rem] text-hivis">Licences</h2>
        <ul className="mt-3 grid gap-2">
          {licences.map(licence => <li key={licence.id} className="flex flex-wrap items-baseline gap-x-2">
            <span className="rounded-[3px] bg-[#3a4048] px-2 py-0.5 font-cond text-[.95rem] font-semibold tabular">{licence.number}</span>
            <span className="band-muted text-[.95rem]">{licence.short}</span>
          </li>)}
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="wrap band-muted flex flex-wrap justify-between gap-4 py-5 text-[.95rem]">
        <p>{business.name} is a sample business for the Jamstacks template gallery. Names, numbers and licences are made up.</p>
        <p><a className="no-underline hover:text-hivis hover:underline" href="https://jamstacks.net">Made with jamstacks.net</a></p>
      </div>
    </div>
  </footer>;
}
