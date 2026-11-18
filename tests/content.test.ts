import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { jobs, validateJobs } from '../content/jobs.ts';
import { licences, validateLicences } from '../content/licences.ts';
import { safetyChecks, validateSafetyChecks } from '../content/safety.ts';
import { services, validateServices } from '../content/services.ts';
import { formatAud, formatPrice, phonesLabel, priceParts } from '../lib/format.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'phoneHref'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.suburbs.length >= 1, 'business.suburbs: at least one suburb required');
  const suburbIds = new Set(business.suburbs.map(s => s.id));
  assert.equal(suburbIds.size, business.suburbs.length, 'business.suburbs: ids must be unique');
  assert.ok(business.rates.callOut > 0 && business.rates.hourly > 0);
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
});

test('services meet validation rules and failures name the service id', () => {
  assert.doesNotThrow(() => validateServices(services));
  assert.equal(services.filter(s => s.featured).length, 6);
  for (const service of services) {
    assert.ok(service.breakerLabel.length <= 12, `${service.id}: breakerLabel too long`);
    assert.ok([10, 16, 20, 32, 40, 63].includes(service.amps), `${service.id}: invalid amps`);
    if (service.price.type === 'quote') {
      assert.equal('amount' in service.price, false, `${service.id}: quote must not have amount`);
    } else {
      assert.ok(service.price.amount >= 1 && service.price.amount <= 50_000, `${service.id}: amount out of range`);
    }
    if (!service.available) assert.ok(service.availabilityNote?.trim(), `${service.id}: missing availabilityNote`);
  }

  assert.throws(() => validateServices([
    ...services.slice(0, -1),
    { ...services.at(-1)!, id: 'Bad ID!' },
  ]), /Bad ID!/);
  assert.throws(() => validateServices([
    ...services.slice(0, -1),
    { ...services.at(-1)!, price: { type: 'fixed', amount: 60_000 } },
  ]), new RegExp(services.at(-1)!.id));
  assert.throws(() => validateServices([
    ...services.slice(0, -1),
    { ...services.at(-1)!, breakerLabel: 'OVER_TWELVE_CHARS' },
  ]), new RegExp(services.at(-1)!.id));
  assert.throws(() => validateServices([
    ...services.slice(0, -1),
    { ...services.at(-1)!, available: false, availabilityNote: '' },
  ]), new RegExp(services.at(-1)!.id));
  assert.throws(() => validateServices(services.map(s => ({ ...s, featured: false }))), /six/);
});

test('jobs reference known services, valid suburbs and unique dockets', () => {
  assert.doesNotThrow(() => validateJobs(jobs));
  assert.throws(() => validateJobs([{ ...jobs[0], serviceId: 'missing-service' }]), /j-2291/);
  assert.throws(() => validateJobs([{ ...jobs[0], suburb: 'St Kilda' }]), /j-2291/);
  assert.throws(() => validateJobs([jobs[0], { ...jobs[1], docket: jobs[0].docket }]), /j-2304/);
});

test('licences have unique ids, valid ISO dates and sample marker for sample business', () => {
  assert.doesNotThrow(() => validateLicences(licences, {
    requireSample: business.name === 'Bright Spark Electrical',
  }));
  assert.throws(() => validateLicences([{ ...licences[0], validTo: '2027-02-30' }]), /rec/);
  assert.throws(() => validateLicences([{ ...licences[0], number: 'REC 23417' }], { requireSample: true }), /rec/);
});

test('safety checks have 12 unique ids, valid areas, stopAndCall and why sentences', () => {
  assert.doesNotThrow(() => validateSafetyChecks(safetyChecks));
  assert.equal(safetyChecks.length, 12);
  assert.ok(safetyChecks.some(c => c.stopAndCall));
  for (const item of safetyChecks) assert.ok(item.why.trim(), `${item.id}: missing why`);
  assert.throws(() => validateSafetyChecks(safetyChecks.map(c => ({ ...c, stopAndCall: false }))), /stopAndCall/);
  assert.throws(() => validateSafetyChecks([{ ...safetyChecks[0], why: ' ' }, ...safetyChecks.slice(1)]), /rcd-present/);
});

test('price formatting handles fixed, from, cents and quote items', () => {
  assert.equal(formatAud(1650), '$1,650');
  assert.equal(formatAud(6.5), '$6.50');
  assert.equal(formatPrice({ type: 'fixed', amount: 149, unit: 'per alarm' }), '$149 per alarm');
  assert.equal(formatPrice({ type: 'from', amount: 1650 }), 'From $1,650');
  assert.deepEqual(priceParts({ type: 'quote', note: 'Call-out plus hourly' }), {
    lead: 'Quoted', figure: 'By quote', unit: 'Call-out plus hourly',
  });
});

test('Electrician JSON-LD derives from content and escapes inline JSON', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'Electrician');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phoneHref);
  assert.equal(schema.priceRange, '$$');
  assert.equal(schema.areaServed.length, business.suburbs.length);
  assert.deepEqual(
    schema.areaServed.map(s => s.name),
    business.suburbs.map(s => `${s.name} VIC`),
  );
  // Mon-Fri + Sat = 6 open days; Sunday is closed and omitted.
  assert.equal(schema.openingHoursSpecification.length, 6);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('enquiries, safety and emergency wording rules hold in page sources', () => {
  const contactSource = [
    readFileSync(new URL('../app/contact/page.tsx', import.meta.url), 'utf8'),
    readFileSync(new URL('../components/contact-parts.tsx', import.meta.url), 'utf8'),
    business.enquiries.introduction,
  ].join('\n');
  for (const forbidden of [/\bbooked\b/i, /booking confirmed/i, /place an order/i, /pay now/i]) {
    assert.doesNotMatch(contactSource, forbidden, `Contact must not match ${forbidden}`);
  }
  assert.match(contactSource, /call \{business\.emergency\.number\}/);

  const servicesSource = [
    readFileSync(new URL('../app/services/page.tsx', import.meta.url), 'utf8'),
    readFileSync(new URL('../components/circuit-schedule.tsx', import.meta.url), 'utf8'),
    ...services.map(s => `${s.name} ${s.summary} ${s.availabilityNote ?? ''}`),
  ].join('\n');
  for (const forbidden of [/booking confirmed/i, /place an order/i, /pay now/i, /\bbooked in\b/i]) {
    assert.doesNotMatch(servicesSource, forbidden, `Services must not match ${forbidden}`);
  }

  const safetySource = readFileSync(new URL('../app/safety/page.tsx', import.meta.url), 'utf8');
  assert.match(safetySource, /These checks are visual only\. Never remove the switchboard cover or open power points; electrical work in\s+Victoria must be done by a licensed electrician\./);
  assert.match(safetySource, /call \{business\.emergency\.number\} first/);
  assert.equal(business.emergency.number, '000');

  // Verify Melbourne phonesLabel helper integrates cleanly with business hours.
  assert.equal(phonesLabel(business.hours, 'Australia/Melbourne', new Date('2027-04-02T05:59:00Z')), 'Phones open now, until 5pm');
});
