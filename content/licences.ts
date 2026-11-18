// Licences and insurance shown as rating plates on Home, Safety and in the footer.
// The numbers below are SAMPLE values for the template demo. A real business replaces every one.

export interface Licence {
  /** Stable, URL-safe and unique. */
  id: string;
  /** Full title shown on the Safety page. */
  title: string;
  /** Two-word plate label, e.g. "Electrical contractor". */
  short: string;
  /** Issuing body or insurer. */
  issuer: string;
  /** Licence, registration or policy number as printed. */
  number: string;
  /** ISO date (YYYY-MM-DD), shown as "Valid to Jun 2027". No automatic "expired" logic. */
  validTo: string;
}

export const licences: Licence[] = [
  { id: 'rec', title: 'Registered Electrical Contractor', short: 'Electrical contractor', issuer: 'Energy Safe Victoria', number: 'REC 23417 (sample)', validTo: '2027-06-30' },
  { id: 'a-grade', title: 'A-grade electrician licence', short: 'A-grade licence', issuer: 'Energy Safe Victoria', number: 'A 58820 (sample)', validTo: '2028-02-28' },
  { id: 'solar', title: 'Accredited solar designer and installer', short: 'Solar accredited', issuer: 'Solar Accreditation Australia', number: 'S 9041273 (sample)', validTo: '2027-09-30' },
  { id: 'insurance', title: 'Public liability insurance, $20 million', short: '$20M insured', issuer: 'Sample insurer', number: 'PL-204-118 (sample)', validTo: '2027-03-31' },
];

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function validateLicences(list: readonly Licence[], { requireSample = false } = {}): void {
  const seen = new Set<string>();
  for (const licence of list) {
    const where = `licences: "${licence.id}"`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(licence.id)) throw new Error(`${where} needs a lowercase URL-safe id`);
    if (seen.has(licence.id)) throw new Error(`${where} is used twice; ids must be unique`);
    seen.add(licence.id);
    for (const key of ['title', 'short', 'issuer', 'number'] as const) {
      if (!licence[key].trim()) throw new Error(`${where} needs a ${key}`);
    }
    const date = new Date(`${licence.validTo}T00:00:00Z`);
    if (!ISO.test(licence.validTo) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== licence.validTo) {
      throw new Error(`${where} validTo must be a real date written YYYY-MM-DD`);
    }
    if (requireSample && !licence.number.includes('(sample)')) {
      throw new Error(`${where} number must be marked "(sample)" while this is the sample business`);
    }
  }
}

validateLicences(licences);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2027-06-30" → "Jun 2027". Pure string formatting, so it never depends on the visitor's clock. */
export function formatValidTo(iso: string): string {
  return `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
}
