import type { Metadata } from 'next';
import { CallToAction } from '../../components/call-to-action';
import { CircuitSchedule, WaitlistNote } from '../../components/circuit-schedule';
import { JobSteps } from '../../components/job-steps';
import { PageHead } from '../../components/page-head';
import { Rates } from '../../components/rates';
import { SectorSelector } from '../../components/sector-selector';
import { SECTORS, services, servicesIn } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Services and prices',
  description: 'Residential, commercial and solar electrical services in Melbourne with indicative prices including GST: switchboards, smoke alarms, EV chargers, fit-outs, test and tag, solar and batteries.',
  alternates: { canonical: absoluteUrl('/services/') },
};

const LABELS = { residential: 'Residential', commercial: 'Commercial', solar: 'Solar' } as const;
const AMPS = { residential: 20, commercial: 40, solar: 32 } as const;

export default function ServicesPage() {
  return <div className="rail">
    <PageHead kicker="Circuit schedule" title="Services"
      art={<div className="w-full max-w-md">
        <SectorSelector label="Show services for" allLabel="All" total={services.length}
          options={SECTORS.map(id => ({ id, label: LABELS[id], count: servicesIn(id).length, amps: AMPS[id] }))} />
      </div>}>
      <p>Everything we do, wired up by sector. Fixed prices are what you pay; “from” prices are where a written quote starts.</p>
    </PageHead>

    <div id="schedule" className="wrap grid scroll-mt-6 gap-10 py-[clamp(2.5rem,6vw,4.5rem)]">
      <CircuitSchedule sector="residential" includesLabel="What’s included">Residential</CircuitSchedule>
      <CircuitSchedule sector="commercial" includesLabel="What’s included">Commercial</CircuitSchedule>
      <CircuitSchedule sector="solar" includesLabel="What’s included">Solar</CircuitSchedule>
      <WaitlistNote heading="Currently on a waitlist" />
    </div>

    <JobSteps heading="How a job runs">
      <JobSteps.Step title="Tell us about it">Send a request or call. A photo of your switchboard tells us more than you’d think.</JobSteps.Step>
      <JobSteps.Step title="We quote in writing">A fixed price, or a starting price with what could change it. Nothing starts until you’ve agreed.</JobSteps.Step>
      <JobSteps.Step title="We do the work">On time, with drop sheets down, and cleaned up before we leave.</JobSteps.Step>
      <JobSteps.Step title="You get the certificate">Every job is tested and comes with a Certificate of Electrical Safety.</JobSteps.Step>
    </JobSteps>

    <Rates id="services-rates-heading">
      <Rates.Heading id="services-rates-heading">Labour rates</Rates.Heading>
      <Rates.Note>Fixed prices include GST; “from” prices are a starting point, confirmed in a written quote.</Rates.Note>
    </Rates>

    <CallToAction>
      <CallToAction.Heading>Not sure which circuit you need?</CallToAction.Heading>
      <CallToAction.Text>Describe the job in a few lines and we’ll tell you what it involves and what it’s likely to cost.</CallToAction.Text>
      <CallToAction.Actions quote="Request a quote" />
    </CallToAction>
  </div>;
}
