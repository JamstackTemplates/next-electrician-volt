import { business } from '../content/business.ts';
import { DAYS } from './hours.ts';
import { absoluteUrl } from './paths.ts';

/** Electrician JSON-LD derived from content/business.ts. Emitted once, on Home. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = DAYS.flatMap(day => {
    const entry = business.hours.find(value => value.day === day);
    return entry?.opens && entry.closes
      ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens: entry.opens, closes: entry.closes }]
      : [];
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phoneHref } : {}),
    // absoluteUrl('/') already includes any Pages base path and ends with a slash.
    ...(url ? { url, image: `${url}og.png` } : {}),
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: business.base.suburb, addressRegion: 'VIC', addressCountry: 'AU' },
    areaServed: business.suburbs.map(suburb => ({ '@type': 'Place', name: `${suburb.name} VIC` })),
    openingHoursSpecification,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
