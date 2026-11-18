// The 10-minute home safety check on /safety/. Every check is look-only: nothing is opened or removed.

export type SafetyArea = 'switchboard' | 'power' | 'alarms' | 'outdoors' | 'solar';

/** Areas in the order they're shown, with their headings. */
export const SAFETY_AREAS: readonly { id: SafetyArea; title: string }[] = [
  { id: 'switchboard', title: 'Switchboard' },
  { id: 'power', title: 'Power points and plugs' },
  { id: 'alarms', title: 'Smoke alarms' },
  { id: 'outdoors', title: 'Outdoors' },
  { id: 'solar', title: 'Solar' },
];

export interface SafetyCheck {
  /** Stable, URL-safe and unique. Also the remembered tick key in the visitor's browser. */
  id: string;
  area: SafetyArea;
  /** The instruction. */
  check: string;
  /** One sentence on why it matters. */
  why: string;
  /** True: if this check fails, stop and call an electrician. Listed in the stop-and-call panel. */
  stopAndCall: boolean;
}

export const safetyChecks: SafetyCheck[] = [
  { id: 'rcd-present', area: 'switchboard', stopAndCall: false,
    check: 'Look for RCD safety switches, with a “Test” button, on the board.',
    why: 'RCDs cut the power in a fraction of a second when current leaks to earth, which is what saves people from shocks.' },
  { id: 'rcd-test', area: 'switchboard', stopAndCall: false,
    check: 'Press each RCD’s Test button every six months; it should trip.',
    why: 'A switch that doesn’t trip on test won’t trip in a fault either.' },
  { id: 'board-scorch', area: 'switchboard', stopAndCall: true,
    check: 'Check for scorch marks, buzzing or a burning smell near the board.',
    why: 'Heat and arcing at the board are an early sign of a loose or overloaded connection.' },
  { id: 'warm-outlets', area: 'power', stopAndCall: true,
    check: 'Feel for power points or plugs that are warm or discoloured.',
    why: 'A warm outlet means resistance in a connection, and that heat can start a fire inside the wall.' },
  { id: 'cracked-plates', area: 'power', stopAndCall: false,
    check: 'Look for cracked or loose switch and power-point covers.',
    why: 'A cracked cover can expose live terminals to fingers and small hands.' },
  { id: 'double-adaptors', area: 'power', stopAndCall: false,
    check: 'Look for piggy-backed double adaptors and daisy-chained power boards.',
    why: 'Stacking adaptors overloads a single outlet that was never rated for it.' },
  { id: 'alarm-test', area: 'alarms', stopAndCall: false,
    check: 'Press each smoke alarm’s test button; all of them should sound.',
    why: 'Interconnected alarms should all sound together, so you’ll hear one from anywhere in the house.' },
  { id: 'alarm-age', area: 'alarms', stopAndCall: false,
    check: 'Check the date on the back; replace alarms older than 10 years.',
    why: 'Smoke sensors lose sensitivity with age even when the test button still works.' },
  { id: 'outdoor-covers', area: 'outdoors', stopAndCall: false,
    check: 'Make sure outdoor outlets have intact weatherproof covers.',
    why: 'Rain in an outdoor outlet will trip the circuit at best and make it live to touch at worst.' },
  { id: 'extension-leads', area: 'outdoors', stopAndCall: false,
    check: 'Check that extension leads aren’t run under doors or through water.',
    why: 'Crushed or wet leads are one of the most common causes of shocks at home.' },
  { id: 'inverter-errors', area: 'solar', stopAndCall: false,
    check: 'Check the inverter display for fault or error lights.',
    why: 'An inverter fault can mean your system has been making nothing for weeks without you noticing.' },
  { id: 'isolator-damage', area: 'solar', stopAndCall: true,
    check: 'Look for cracked, melted or water-stained rooftop or wall DC isolators.',
    why: 'Solar DC isolators carry power whenever the sun is up, and a damaged one is a known fire risk.' },
];

export function validateSafetyChecks(list: readonly SafetyCheck[]): void {
  const seen = new Set<string>();
  const areas = SAFETY_AREAS.map(area => area.id);
  for (const item of list) {
    const where = `safety: "${item.id}"`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) throw new Error(`${where} needs a lowercase URL-safe id`);
    if (seen.has(item.id)) throw new Error(`${where} is used twice; ids must be unique`);
    seen.add(item.id);
    if (!areas.includes(item.area)) throw new Error(`${where} has unknown area "${item.area}"`);
    if (!item.check.trim()) throw new Error(`${where} needs a check instruction`);
    if (!item.why.trim()) throw new Error(`${where} needs a "why" sentence`);
  }
  if (!list.some(item => item.stopAndCall)) throw new Error('safety: at least one check must be marked stopAndCall');
}

validateSafetyChecks(safetyChecks);
