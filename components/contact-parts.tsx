import type { ReactNode } from 'react';
import { business } from '../content/business';
import { hoursSummary } from '../lib/format';
import { Icon } from './art/icons';
import { CableEnds } from './art/motifs';
import { CopyEmail } from './copy-email';
import { JamstacksSupportForm } from './jamstacks-support-form';
import { OpenBadge } from './open-badge';
import { site } from '../lib/site';
import { Dymo } from './ui';

type Children = { children: ReactNode };

/** Contact layout: the job docket (form) on the left, the contact rail on the right. */
function ContactLayout({ children }: Children) {
  return <div className="wrap grid gap-10 py-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-12 lg:gap-12">{children}</div>;
}

/**
 * The job docket: hosts the Jamstacks form when a site ID is configured, otherwise an email fallback.
 * The hosted runtime owns the name, email and message fields and the submission.
 */
function Docket({ heading, fallback, safety, children }: { heading: ReactNode; fallback: ReactNode; safety: ReactNode; children?: ReactNode }) {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <section aria-labelledby="docket-heading" className="lg:col-span-7">
    <div className="rounded-sm border-2 border-ink/80 bg-raised shadow-[8px_8px_0_var(--line)]">
      <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-line bg-hivis px-5 py-3 text-[#1b1e22]">
        <h2 id="docket-heading" className="font-cond text-[1.6rem]">{heading}</h2>
        <Icon name="switchboard" size={28} />
      </div>
      <div className="p-5 sm:p-7">
        {hosted
          ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
          : <div className="grid gap-4">
              {fallback}
              <p><a className="btn btn-primary" href={`mailto:${business.email}`}><Icon name="email" size={20} />Email {business.email}</a></p>
            </div>}
      </div>
    </div>
    <p className="mt-6 flex items-start gap-3 rounded-sm border-2 border-danger px-4 py-3 text-[1.05rem]">
      <Icon name="warning" size={24} className="mt-0.5 flex-none text-danger" />
      <span>{safety}</span>
    </p>
    {children ? <div className="mt-9">{children}</div> : null}
  </section>;
}

/** Fallback copy shown when the hosted form isn't configured. */
function Fallback({ children }: Children) {
  return <p className="text-[1.08rem] text-muted">{children}</p>;
}

/** The contact rail: phone, email, hours, suburbs and a run of cable. Always visible. */
function Rail() {
  return <aside aria-label="Contact details" className="grid content-start gap-7 lg:col-span-5">
    <div>
      <h2 className="font-cond text-[1.3rem] text-muted">Phone</h2>
      <a href={`tel:${business.phoneHref}`} className="stencil tabular mt-1 block text-[clamp(2.3rem,5vw,3.1rem)] no-underline hover:text-trace">{business.phone}</a>
      <p className="mt-2 text-muted"><OpenBadge hours={business.hours} /></p>
      <p className="mt-1 text-muted">{hoursSummary(business.hours)}. Melbourne time.</p>
    </div>
    <div>
      <h2 className="font-cond text-[1.3rem] text-muted">Email</h2>
      <a className="text-link mt-1 block font-cond text-[1.5rem] font-semibold wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>
      <div className="mt-3 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
    </div>
    <div>
      <h2 className="font-cond text-[1.3rem] text-muted">Where we work</h2>
      <p className="mt-1">{business.suburbs.map(s => s.name).join(', ')}.</p>
      <p className="mt-2 text-muted">{business.base.label}. {business.base.note}</p>
    </div>
    <CableEnds />
  </aside>;
}

/** "What to put in your message": suggestions, not form fields. */
function Include({ heading }: { heading: string }) {
  return <div>
    <Dymo>{heading}</Dymo>
    <ul className="mt-4 grid gap-2.5">
      {business.enquiries.usefulToInclude.map(tip => <li key={tip} className="flex items-start gap-3">
        <Icon name="tick" size={20} className="mt-0.5 flex-none text-trace" />{tip}
      </li>)}
    </ul>
  </div>;
}

export const Contact = Object.assign(ContactLayout, { Docket, Fallback, Rail, Include });
