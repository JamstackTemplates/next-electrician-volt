// Services, shown on Home (featured six, as the Switchboard) and Services (every item, by sector).
// Most frequent owner edits: `price`, `available` and `availabilityNote`. Run `npm test` afterwards.

export type Sector = 'residential' | 'commercial' | 'solar';
export const SECTORS: readonly Sector[] = ['residential', 'commercial', 'solar'];

/** Decorative breaker ratings printed on each breaker. */
export const AMP_RATINGS = [10, 16, 20, 32, 40, 63] as const;
export type Amps = typeof AMP_RATINGS[number];

/**
 * Price in AUD including GST.
 * - `fixed`: the price for the stated unit (or the whole job when no unit).
 * - `from`: a starting point, confirmed in a written quote.
 * - `quote`: no published price; quoted after a chat or site visit.
 */
export type Price =
  | { type: 'fixed' | 'from'; amount: number; unit?: string }
  | { type: 'quote'; note?: string };

export interface Service {
  /** Stable, URL-safe and unique, e.g. "smoke-alarms". Also used in links and job references. */
  id: string;
  sector: Sector;
  name: string;
  /** One sentence. */
  summary: string;
  /** Two to four short lines of what's included. */
  includes: string[];
  price: Price;
  /** Printed on the breaker in Dymo tape: 12 characters or fewer. */
  breakerLabel: string;
  /** Decorative breaker rating. */
  amps: Amps;
  /** Exactly six services are featured on the Home Switchboard. */
  featured: boolean;
  /** False shows a Waitlist stamp. */
  available: boolean;
  /** Required when `available` is false. */
  availabilityNote?: string;
  /** Icon drawn for this service (components/art/icons.tsx). */
  icon: string;
}

export const services: Service[] = [
  {
    id: 'switchboard-upgrade', sector: 'residential', name: 'Switchboard upgrade',
    summary: 'Swap an old ceramic-fuse board for a modern board with RCD protection on every circuit.',
    includes: ['RCBOs on every circuit', 'Labelled circuit schedule', 'Certificate of Electrical Safety'],
    price: { type: 'from', amount: 1650 }, breakerLabel: 'SWBD', amps: 63, featured: true, available: true, icon: 'switchboard',
  },
  {
    id: 'smoke-alarms', sector: 'residential', name: 'Smoke alarms, 240 V interconnected',
    summary: 'Mains-powered photoelectric alarms with battery backup, linked so one sounds them all.',
    includes: ['Photoelectric alarms with 10-year backup', 'Interconnected throughout', 'Old alarms taken away'],
    price: { type: 'fixed', amount: 149, unit: 'per alarm' }, breakerLabel: 'SMOKE', amps: 10, featured: true, available: true, icon: 'smoke',
  },
  {
    id: 'lighting-power', sector: 'residential', name: 'Lighting and power points',
    summary: 'Extra power points, LED downlights, outdoor lighting and USB outlets where you need them.',
    includes: ['Layout walk-through', 'Patching around new fittings', 'Old fittings recycled'],
    price: { type: 'quote' }, breakerLabel: 'LIGHTS', amps: 10, featured: false, available: true, icon: 'bulb',
  },
  {
    id: 'ev-charger', sector: 'residential', name: 'EV charger install',
    summary: 'A 7 kW wall charger on its own circuit, sized to your switchboard and supply.',
    includes: ['Load check on your supply', 'Dedicated circuit and RCD', 'Solar-aware charger setup'],
    price: { type: 'from', amount: 1290 }, breakerLabel: 'EV', amps: 32, featured: true, available: true, icon: 'ev',
  },
  {
    id: 'safety-inspection', sector: 'residential', name: 'Electrical safety inspection',
    summary: 'A full room-by-room check with RCD trip-time testing and a written report you can keep.',
    includes: ['RCD trip-time testing', 'Switchboard and earthing check', 'Written report with photos'],
    price: { type: 'fixed', amount: 249 }, breakerLabel: 'INSPECT', amps: 16, featured: true, available: true, icon: 'inspect',
  },
  {
    id: 'fault-finding', sector: 'residential', name: 'Fault finding and tripping RCDs',
    summary: 'Tracing the circuit that keeps tripping, flickering lights or a dead power point.',
    includes: ['Insulation-resistance testing', 'Repair on the spot where we can', 'Plain-English explanation'],
    price: { type: 'quote', note: 'Call-out plus hourly' }, breakerLabel: 'FAULT', amps: 20, featured: false, available: true, icon: 'fault',
  },
  {
    id: 'shop-fit-out', sector: 'commercial', name: 'Shop and office fit-outs',
    summary: 'Lighting, power, three-phase equipment circuits and signage for new and refreshed spaces.',
    includes: ['Drawings and load calculations', 'Out-of-hours work on request', 'Compliance certificate on handover'],
    price: { type: 'quote' }, breakerLabel: 'FITOUT', amps: 40, featured: true, available: true, icon: 'shop',
  },
  {
    id: 'test-and-tag', sector: 'commercial', name: 'Test and tag',
    summary: 'Portable appliance testing and tagging to AS/NZS 3760, with a register you can show an auditor.',
    includes: ['Visual and electrical test', 'Dated tag on every item', 'Digital register'],
    price: { type: 'from', amount: 6.5, unit: 'per item' }, breakerLabel: 'TAG', amps: 10, featured: false, available: true, icon: 'tag',
  },
  {
    id: 'emergency-lighting', sector: 'commercial', name: 'Emergency and exit lighting',
    summary: 'Six-monthly discharge testing of exit signs and emergency lights, with repairs logged.',
    includes: ['90-minute discharge test', 'Logbook updated on site', 'Failed fittings quoted'],
    price: { type: 'from', amount: 480, unit: 'per six-monthly test' }, breakerLabel: 'EXIT', amps: 10, featured: false, available: true, icon: 'exit',
  },
  {
    id: 'data-cabling', sector: 'commercial', name: 'Data and network points',
    summary: 'Cat6 data points run back to a tidy, labelled patch panel.',
    includes: ['Cat6 cable and wall plates', 'Patch panel termination', 'Every point tested and labelled'],
    price: { type: 'from', amount: 185, unit: 'per point' }, breakerLabel: 'DATA', amps: 16, featured: false, available: true, icon: 'data',
  },
  {
    id: 'solar-pv', sector: 'solar', name: 'Solar PV, 6.6 kW system',
    summary: 'A 6.6 kW array with a 5 kW inverter, designed around your roof, shading and power bills.',
    includes: ['Shading and roof assessment', 'Tier 1 panels and inverter', 'Grid connection paperwork'],
    price: { type: 'from', amount: 5900 }, breakerLabel: 'SOLAR', amps: 32, featured: true, available: true, icon: 'solar',
  },
  {
    id: 'solar-battery', sector: 'solar', name: 'Home battery',
    summary: 'A home battery sized to your evening use, added to a new or existing solar system.',
    includes: ['Usage review from your bills', 'Backup circuit option', 'App setup on handover'],
    price: { type: 'from', amount: 11400 }, breakerLabel: 'BATT', amps: 40, featured: false,
    available: false, availabilityNote: 'Booked out for new installs until March; enquire to join the list.', icon: 'battery',
  },
  {
    id: 'solar-health-check', sector: 'solar', name: 'Solar health check',
    summary: 'Panel, isolator and inverter checks for systems that seem to be making less than they should.',
    includes: ['Isolator and cabling inspection', 'Inverter fault log review', 'Output compared with design'],
    price: { type: 'fixed', amount: 279 }, breakerLabel: 'PV-CHK', amps: 16, featured: false, available: true, icon: 'pulse',
  },
];

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Throws with the service ID to fix. Used by tests and at build time by the pages. */
export function validateServices(list: readonly Service[]): void {
  const seen = new Set<string>();
  for (const service of list) {
    const where = `services: "${service.id}"`;
    if (!ID.test(service.id)) throw new Error(`${where} needs a lowercase URL-safe id such as "smoke-alarms"`);
    if (seen.has(service.id)) throw new Error(`${where} is used twice; ids must be unique`);
    seen.add(service.id);
    if (!SECTORS.includes(service.sector)) throw new Error(`${where} has unknown sector "${service.sector}"`);
    if (!service.name.trim() || !service.summary.trim()) throw new Error(`${where} needs a name and a summary`);
    if (service.includes.length < 2 || service.includes.length > 4 || service.includes.some(line => !line.trim())) {
      throw new Error(`${where} needs two to four non-empty "includes" lines`);
    }
    if (service.price.type === 'quote') {
      if ('amount' in service.price) throw new Error(`${where} is priced by quote, so remove its amount`);
    } else {
      const { amount } = service.price;
      if (!Number.isFinite(amount) || amount < 1 || amount > 50_000) {
        throw new Error(`${where} price must be between $1 and $50,000 (AUD including GST)`);
      }
    }
    if (!service.breakerLabel.trim() || service.breakerLabel.length > 12) {
      throw new Error(`${where} breakerLabel must be 1–12 characters`);
    }
    if (!(AMP_RATINGS as readonly number[]).includes(service.amps)) {
      throw new Error(`${where} amps must be one of ${AMP_RATINGS.join(', ')}`);
    }
    if (!service.available && !service.availabilityNote?.trim()) {
      throw new Error(`${where} is unavailable, so it needs an availabilityNote`);
    }
  }
  const featured = list.filter(service => service.featured).length;
  if (featured !== 6) throw new Error(`services: exactly six must be featured on the Home Switchboard (found ${featured})`);
}

validateServices(services);

export const featuredServices = services.filter(service => service.featured);
export const servicesIn = (sector: Sector) => services.filter(service => service.sector === sector);
export const serviceById = (id: string) => services.find(service => service.id === id);
