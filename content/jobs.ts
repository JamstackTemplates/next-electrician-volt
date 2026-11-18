// Recent job sheets shown on Home as carbon-copy dockets. Swap these for real recent work.
import { business } from './business.ts';
import { services, type Service } from './services.ts';

export interface Job {
  /** Stable, URL-safe and unique, e.g. "j-2291". */
  id: string;
  /** Docket number printed on the sheet. Unique. */
  docket: number;
  /** Must match a service id in content/services.ts. */
  serviceId: string;
  /** Must match a suburb name in content/business.ts. */
  suburb: string;
  title: string;
  /** One sentence. */
  scope: string;
  /** Days on site, a whole number from 1 to 30. */
  days: number;
}

export const jobs: Job[] = [
  {
    id: 'j-2291', docket: 2291, serviceId: 'switchboard-upgrade', suburb: 'Northcote',
    title: '1950s fuse board to RCBO board',
    scope: 'Rewired fuses replaced with a 12-way board, RCBO on every circuit and the meter panel re-sheeted.', days: 1,
  },
  {
    id: 'j-2304', docket: 2304, serviceId: 'shop-fit-out', suburb: 'Collingwood',
    title: 'Café fit-out: pendants, three-phase coffee machine circuit, exit lights',
    scope: 'New tenancy board, a dedicated three-phase circuit for the espresso machine and exit signs signed off.', days: 6,
  },
  {
    id: 'j-2317', docket: 2317, serviceId: 'solar-pv', suburb: 'Camberwell',
    title: '6.6 kW array on a slate-look tile roof',
    scope: 'Eighteen panels split across two roof faces to dodge a chimney shadow, with a 5 kW inverter in the garage.', days: 2,
  },
];

export function validateJobs(list: readonly Job[], known: readonly Service[] = services, suburbs = business.suburbs.map(s => s.name)): void {
  const ids = new Set<string>();
  const dockets = new Set<number>();
  for (const job of list) {
    const where = `jobs: "${job.id}"`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(job.id)) throw new Error(`${where} needs a lowercase URL-safe id`);
    if (ids.has(job.id)) throw new Error(`${where} is used twice; ids must be unique`);
    ids.add(job.id);
    if (dockets.has(job.docket)) throw new Error(`${where} reuses docket ${job.docket}`);
    dockets.add(job.docket);
    if (!known.some(service => service.id === job.serviceId)) throw new Error(`${where} refers to unknown service "${job.serviceId}"`);
    if (!suburbs.includes(job.suburb)) throw new Error(`${where} suburb "${job.suburb}" is not in the service area (content/business.ts)`);
    if (!job.title.trim() || !job.scope.trim()) throw new Error(`${where} needs a title and scope`);
    if (!Number.isInteger(job.days) || job.days < 1 || job.days > 30) throw new Error(`${where} days must be a whole number from 1 to 30`);
  }
}

validateJobs(jobs);
