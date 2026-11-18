// Bright Spark Electrical: a fictitious sample business for the Jamstacks gallery.
// Replace every value here with the owner's real details before publishing a real website.
import { validateHours, type OpeningHours } from '../lib/hours.ts';

/** Grouping used by the service-area circuit map. */
export type SuburbGroup = 'north' | 'inner' | 'east';

export interface Suburb {
  /** Stable URL-safe ID, e.g. "carlton-north". */
  id: string;
  /** Display name, also referenced by recent jobs (content/jobs.ts). */
  name: string;
  /** Which branch of the service-area map the suburb hangs from. */
  group: SuburbGroup;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short line used in metadata titles and the footer. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. Always visible on Contact. */
  email: string;
  /** Public number exactly as it should be displayed. Blank hides it. */
  phone: string;
  /** The same number in international form for tel: links, e.g. +61355504127. */
  phoneHref: string;
  /** Where the business is based. There is no walk-in counter, so no street address is published. */
  base: {
    /** Short public label, e.g. "Abbotsford". */
    suburb: string;
    /** Longer line shown in the footer and on Contact. */
    label: string;
    /** Honest note about the base (template placeholder, no walk-ins). */
    note: string;
  };
  /** Suburbs served. Order is the order shown in lists; IDs must be unique. */
  suburbs: Suburb[];
  /** Labour rates in AUD, including GST. */
  rates: {
    /** Call-out fee in dollars. */
    callOut: number;
    /** Minutes on site the call-out fee covers. */
    callOutCoversMinutes: number;
    /** Hourly rate in dollars after the call-out period. */
    hourly: number;
    /** Billing increment in minutes after the call-out period. */
    incrementMinutes: number;
  };
  /** Phone and office hours: seven same-day intervals in site.config.json's time zone. */
  hours: OpeningHours[];
  /** Emergency guidance shown on Safety and Contact. No after-hours service is offered. */
  emergency: {
    /** Australian emergency number. */
    number: string;
    /** Who to call for outages and fallen wires. */
    outages: string;
  };
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Bright Spark Electrical',
  tagline: 'Licensed electricians for homes, shops and solar',
  introduction:
    'Licensed Melbourne electricians for homes, businesses and solar: switchboard upgrades, smoke alarms, EV chargers, fit-outs and solar batteries. Request a quote.',
  email: 'hello@brightspark.example',
  phone: '(03) 5550 4127',
  phoneHref: '+61355504127',
  base: {
    suburb: 'Abbotsford',
    label: 'Workshop near Victoria Park, Abbotsford VIC 3067',
    note: 'Template placeholder near a public landmark. Our vans come to you; there is no walk-in counter.',
  },
  suburbs: [
    { id: 'northcote', name: 'Northcote', group: 'north' },
    { id: 'brunswick', name: 'Brunswick', group: 'north' },
    { id: 'carlton-north', name: 'Carlton North', group: 'north' },
    { id: 'fitzroy', name: 'Fitzroy', group: 'inner' },
    { id: 'collingwood', name: 'Collingwood', group: 'inner' },
    { id: 'abbotsford', name: 'Abbotsford', group: 'inner' },
    { id: 'richmond', name: 'Richmond', group: 'inner' },
    { id: 'kew', name: 'Kew', group: 'east' },
    { id: 'hawthorn', name: 'Hawthorn', group: 'east' },
    { id: 'camberwell', name: 'Camberwell', group: 'east' },
    { id: 'box-hill', name: 'Box Hill', group: 'east' },
    { id: 'doncaster', name: 'Doncaster', group: 'east' },
  ],
  rates: { callOut: 99, callOutCoversMinutes: 30, hourly: 118, incrementMinutes: 15 },
  hours: [
    { day: 'Monday', opens: '07:00', closes: '17:00' },
    { day: 'Tuesday', opens: '07:00', closes: '17:00' },
    { day: 'Wednesday', opens: '07:00', closes: '17:00' },
    { day: 'Thursday', opens: '07:00', closes: '17:00' },
    { day: 'Friday', opens: '07:00', closes: '17:00' },
    { day: 'Saturday', opens: '08:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  emergency: { number: '000', outages: 'your electricity distributor’s faults line' },
  enquiries: {
    title: 'Request a quote',
    introduction:
      'We reply within one working day. Times and prices are only confirmed in a written quote after we’ve talked.',
    usefulToInclude: [
      'Your suburb, and whether it’s a home or a business',
      'The job, for example “switchboard upgrade” or “a power point keeps tripping”',
      'Roughly how old the property or switchboard is',
      'That you have photos; we’ll reply with an address to send them to',
      'Times that suit for a callback',
    ],
  },
};

validateHours(business.hours);
