import type { ReactNode } from 'react';
import { jobs } from '../content/jobs';
import { serviceById } from '../content/services';
import { Icon } from './art/icons';
import { ClipboardClip } from './art/motifs';
import { SectionHeading, Lede } from './ui';

/** Recent work as carbon-copy dockets pinned to a clipboard board. The only rotated layout on Home. */
function JobSheetsSection({ children }: { children: ReactNode }) {
  const tilt = ['-rotate-2', 'rotate-1', '-rotate-1'];
  return <section className="bg-surface py-[clamp(3.5rem,8vw,6rem)]" aria-labelledby="jobs-heading">
    <div className="wrap grid gap-10 lg:grid-cols-[1fr_2.4fr] lg:items-start">
      <div>{children}</div>
      <div className="relative rounded-md border-[3px] border-[#5b4a2e] bg-[#8b6f47] p-4 pt-12 shadow-[inset_0_2px_0_rgb(255_255_255/.15)] sm:p-7 sm:pt-14 dark:border-[#3d3221] dark:bg-[#5e4b30]"
        style={{ backgroundImage: 'repeating-linear-gradient(95deg, rgb(0 0 0 / .05) 0 2px, transparent 2px 9px)' }}>
        <ClipboardClip className="absolute left-1/2 top-0 w-40 -translate-x-1/2 -translate-y-1/3" />
        <ol className="grid gap-6 md:grid-cols-3 md:gap-4">
          {jobs.map((job, index) => {
            const service = serviceById(job.serviceId)!;
            return <li key={job.id} className={`docket ${tilt[index % 3]} px-4 pb-5 pt-6`}>
              <p className="flex items-center justify-between border-b-2 border-dashed border-current/30 pb-2 font-cond font-semibold">
                <span>Docket <span className="stencil tabular text-[1.35rem]">{job.docket}</span></span>
                <Icon name={service.icon} size={26} title={service.name} />
              </p>
              <p className="mt-3 font-cond text-[1.05rem] font-semibold">{job.suburb}</p>
              <h3 className="mt-1 text-[1.45rem] leading-tight">{job.title}</h3>
              <p className="mt-2 text-[1rem]">{job.scope}</p>
              <p className="mt-3 font-cond text-[1.05rem] font-semibold">{job.days} {job.days === 1 ? 'day' : 'days'} on site</p>
            </li>;
          })}
        </ol>
      </div>
    </div>
  </section>;
}

function Heading({ children }: { children: ReactNode }) {
  return <SectionHeading id="jobs-heading">{children}</SectionHeading>;
}

function Introduction({ children }: { children: ReactNode }) {
  return <Lede>{children}</Lede>;
}

export const JobSheets = Object.assign(JobSheetsSection, { Heading, Introduction });
