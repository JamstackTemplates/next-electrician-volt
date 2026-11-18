import type { Metadata } from 'next';
import { Multimeter } from '../../components/art/motifs';
import { CallToAction } from '../../components/call-to-action';
import { LicencePlates } from '../../components/licence-plates';
import { PageHead } from '../../components/page-head';
import { SafetyChecklist } from '../../components/safety-checklist';
import { Safety } from '../../components/safety-parts';
import { business } from '../../content/business';
import { SAFETY_AREAS, safetyChecks } from '../../content/safety';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Home safety check',
  description: 'A 10-minute, look-don’t-touch electrical safety checklist for your switchboard, power points, smoke alarms and solar, plus our licence and insurance details.',
  alternates: { canonical: absoluteUrl('/safety/') },
};

export default function SafetyPage() {
  return <div className="rail">
    <div className="no-print">
      <PageHead tone="graphite" kicker="10-minute check" title="Home safety check"
        art={<Multimeter reading="240 V" className="h-auto w-44 sm:w-56 md:w-64" />}>
        <p>Twelve things to look at around the house. No tools, no covers off, and it takes about as long as a cuppa.</p>
      </PageHead>
    </div>

    <div className="wrap grid gap-8 py-[clamp(2.5rem,6vw,4.5rem)]">
      <div className="no-print">
        <Safety.StopPanel heading="Stop and call if you find any of these">
          Smoke, fire or someone injured: call {business.emergency.number} first. For outages or fallen wires, call {business.emergency.outages}.
        </Safety.StopPanel>
      </div>

      <Safety.Rule>
        These checks are visual only. Never remove the switchboard cover or open power points; electrical work in
        Victoria must be done by a licensed electrician.
      </Safety.Rule>

      <SafetyChecklist heading="The checklist" stopLabel="Stop and call"
        areas={[...SAFETY_AREAS]} items={safetyChecks} printHeader={<Safety.PrintHeader />} />
    </div>

    <div className="no-print">
      <Safety.Inspection heading="What a paid safety inspection adds" action="Request an inspection">
        We test what you can’t see: how fast each RCD trips, whether the earthing is sound, and the condition of
        the cabling behind the board. You get a written report with photos.
      </Safety.Inspection>

      <LicencePlates variant="full" id="safety-licences-heading">
        <LicencePlates.Heading id="safety-licences-heading">Licences and insurance</LicencePlates.Heading>
        <LicencePlates.Introduction>
          Every number below is a sample value for this template demo. A real contractor’s numbers can be checked with the issuing body.
        </LicencePlates.Introduction>
      </LicencePlates>

      <CallToAction>
        <CallToAction.Heading>Something didn’t pass?</CallToAction.Heading>
        <CallToAction.Text>Tell us which check and what you saw. We’ll tell you how urgent it is.</CallToAction.Text>
        <CallToAction.Actions quote="Request a quote" />
      </CallToAction>
    </div>
  </div>;
}
