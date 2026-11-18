import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { phonesLabel } from '../lib/format.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('Melbourne business phone hours boundaries and 2027 DST transitions', () => {
  const mel = (iso: string) => phonesLabel(business.hours, 'Australia/Melbourne', new Date(iso));

  // Friday 2 April 2027 (AEDT, UTC+11): closes at 17:00 AEDT = 06:00 UTC.
  assert.equal(mel('2027-04-02T05:59:00Z'), 'Phones open now, until 5pm');
  assert.equal(mel('2027-04-02T06:00:00Z'), 'Phones closed, back Saturday at 8am');

  // Saturday 3 April 2027 (AEDT, UTC+11): closes at 12:00 AEDT = 01:00 UTC; Sunday closed.
  assert.equal(mel('2027-04-03T00:59:00Z'), 'Phones open now, until 12pm');
  assert.equal(mel('2027-04-03T01:00:00Z'), 'Phones closed, back Monday at 7am');

  // Sunday 4 April 2027: clocks fall back from AEDT (UTC+11) to AEST (UTC+10) at 03:00 AEDT (2027-04-03T16:00:00Z).
  assert.equal(mel('2027-04-04T02:00:00Z'), 'Phones closed, back Monday at 7am');

  // Monday 5 April 2027 (now AEST, UTC+10): opens at 07:00 AEST = 2027-04-04T21:00:00Z.
  assert.equal(mel('2027-04-04T20:59:00Z'), 'Phones closed, back today at 7am');
  assert.equal(mel('2027-04-04T21:00:00Z'), 'Phones open now, until 5pm');
  assert.equal(mel('2027-04-05T06:59:00Z'), 'Phones open now, until 5pm');
  assert.equal(mel('2027-04-05T07:00:00Z'), 'Phones closed, back Tuesday at 7am');

  // Saturday 2 October 2027 (AEST, UTC+10): closes at 12:00 AEST = 02:00 UTC.
  assert.equal(mel('2027-10-02T01:59:00Z'), 'Phones open now, until 12pm');
  assert.equal(mel('2027-10-02T02:00:00Z'), 'Phones closed, back Monday at 7am');

  // Sunday 3 October 2027: clocks spring forward from AEST (UTC+10) to AEDT (UTC+11) at 02:00 AEST (2027-10-02T16:00:00Z).
  assert.equal(mel('2027-10-03T02:00:00Z'), 'Phones closed, back Monday at 7am');

  // Monday 4 October 2027 (now AEDT, UTC+11): opens at 07:00 AEDT = 2027-10-03T20:00:00Z.
  assert.equal(mel('2027-10-03T19:59:00Z'), 'Phones closed, back today at 7am');
  assert.equal(mel('2027-10-03T20:00:00Z'), 'Phones open now, until 5pm');
  assert.equal(mel('2027-10-04T05:59:00Z'), 'Phones open now, until 5pm');
  assert.equal(mel('2027-10-04T06:00:00Z'), 'Phones closed, back Tuesday at 7am');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});
