import { Children, type ReactNode } from 'react';
import { SectionHeading } from './ui';

/** "How a job runs": numbered solder pads along one trace, horizontal on wide screens, vertical on small. */
function JobStepsSection({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const steps = Children.toArray(children);
  return <section className="py-[clamp(3.5rem,8vw,6rem)]" aria-labelledby="steps-heading">
    <div className="wrap">
      <SectionHeading id="steps-heading">{heading}</SectionHeading>
      <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
        <span aria-hidden="true" className="absolute left-[1.45rem] top-2 bottom-2 w-[4px] bg-trace md:inset-x-0 md:top-[1.45rem] md:bottom-auto md:h-[4px] md:w-auto" style={{ filter: 'var(--glow)' }} />
        {steps.map((step, index) => <li key={index} className="relative flex gap-5 md:block">
          <span className="relative z-10 grid h-12 w-12 flex-none place-items-center rounded-full border-[4px] border-trace bg-bg stencil text-[1.4rem]">{index + 1}</span>
          <div className="md:mt-5">{step}</div>
        </li>)}
      </ol>
    </div>
  </section>;
}

function Step({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <>
    <h3 className="text-[1.6rem]">{title}</h3>
    <p className="mt-2 max-w-[30ch] text-muted">{children}</p>
  </>;
}

export const JobSteps = Object.assign(JobStepsSection, { Step });
