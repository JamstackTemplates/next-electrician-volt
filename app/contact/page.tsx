import type { Metadata } from 'next';
import { Contact } from '../../components/contact-parts';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Request a quote',
  description: `Send ${business.name} a quote request or question. ${business.enquiries.introduction}`,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  return <>
    <PageHead tone="hazard" kicker="Job request" title={business.enquiries.title}>
      <p>{business.enquiries.introduction}</p>
    </PageHead>
    <Contact>
      <Contact.Docket
        heading="Tell us about the job"
        fallback={<>Our online form isn’t switched on yet. Email us the details below and we’ll reply within one working day.</>}
        safety={<>Smoke, fire, shocks or a burning smell? Don’t wait for a reply: call {business.emergency.number} or {business.emergency.outages}.</>}>
        <Contact.Include heading="What to put in your message" />
      </Contact.Docket>
      <Contact.Rail />
    </Contact>
  </>;
}
