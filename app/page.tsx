import type { Metadata } from 'next';
import { BoardShowcase } from '../components/board-section';
import { CallToAction } from '../components/call-to-action';
import { Hero } from '../components/hero';
import { JobSheets } from '../components/job-sheets';
import { LicencePlates } from '../components/licence-plates';
import { Rates } from '../components/rates';
import { SafetyTeaser } from '../components/safety-teaser';
import { SectorStrip } from '../components/sector-strip';
import { ServiceArea } from '../components/service-area';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

export default function HomePage() {
  return <div className="rail">
    <Hero>
      <Hero.Heading>Licensed electricians for homes, shops and solar</Hero.Heading>
      <Hero.Introduction>
        Across Melbourne’s inner north and east. Switchboards, smoke alarms, EV chargers, fit-outs and batteries:
        tested, certified and tidied up after.
      </Hero.Introduction>
      <Hero.Actions quote="Request a quote" call="Call" />
      <Hero.Status />
    </Hero>

    <SectorStrip label="Services by type of property">
      <SectorStrip.Link sector="residential" detail="Boards, alarms, lights, EV">Residential</SectorStrip.Link>
      <SectorStrip.Link sector="commercial" detail="Fit-outs, test and tag, exit lights">Commercial</SectorStrip.Link>
      <SectorStrip.Link sector="solar" detail="Panels, batteries, health checks">Solar</SectorStrip.Link>
    </SectorStrip>

    <BoardShowcase>
      <BoardShowcase.Heading>Flip a breaker to see the job</BoardShowcase.Heading>
      <BoardShowcase.Introduction>
        Six of the jobs we do most, each on its own circuit. Every one ends with testing and a compliance
        certificate you can file with your house papers.
      </BoardShowcase.Introduction>
      <BoardShowcase.Board label="Featured services" details="All services in this group" />
    </BoardShowcase>

    <LicencePlates>
      <LicencePlates.Heading>Licensed, registered and insured</LicencePlates.Heading>
      <LicencePlates.Introduction>
        Ask for these numbers on any quote. We print them on ours, and the full details are on the safety check page.
      </LicencePlates.Introduction>
    </LicencePlates>

    <JobSheets>
      <JobSheets.Heading>Off the job board this month</JobSheets.Heading>
      <JobSheets.Introduction>
        Three recent dockets, copied straight from the van. Different suburbs, different jobs, same sign-off.
      </JobSheets.Introduction>
    </JobSheets>

    <SafetyTeaser sample={['rcd-test', 'warm-outlets', 'alarm-test', 'isolator-damage']}>
      <SafetyTeaser.Heading>Checks you can do in ten minutes</SafetyTeaser.Heading>
      <SafetyTeaser.Introduction>
        Look-don’t-touch checks for your board, power points, smoke alarms and solar. Tick them off on screen or print the sheet.
      </SafetyTeaser.Introduction>
      <SafetyTeaser.Action>Do the 10-minute check</SafetyTeaser.Action>
    </SafetyTeaser>

    <ServiceArea>
      <ServiceArea.Heading>Wired out from Abbotsford</ServiceArea.Heading>
      <ServiceArea.Introduction>
        Our vans leave the workshop near Victoria Park every morning. If your suburb is on the board, we’re usually there within the week.
      </ServiceArea.Introduction>
    </ServiceArea>

    <Rates>
      <Rates.Heading>What a visit costs</Rates.Heading>
      <Rates.Note>
        Prices include GST. Fixed-price jobs cost what the services list says; everything else gets a written quote before we start.
      </Rates.Note>
    </Rates>

    <CallToAction tone="hazard">
      <CallToAction.Heading>Got a job? Tell us what’s tripping.</CallToAction.Heading>
      <CallToAction.Text>Send a few lines about the job and your suburb. We’ll reply within one working day.</CallToAction.Text>
      <CallToAction.Actions quote="Request a quote" />
    </CallToAction>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </div>;
}
