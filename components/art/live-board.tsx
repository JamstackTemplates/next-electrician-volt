import type { ReactNode } from 'react';

/**
 * Hero scene: an open switchboard on a brick-bond wall. Three live traces leave the board for a terrace
 * house, a shopfront and a solar roof. Current dots run along the traces (static under reduced motion).
 */
const BRICK_W = 56;
const BRICK_H = 22;

const TRACES = [
  { id: 'house', d: 'M430 120 H500 L530 90 H600', end: [600, 90] },
  { id: 'shop', d: 'M462 250 H560 L580 270 H620', end: [620, 270] },
  { id: 'solar', d: 'M430 380 H480 L520 420 H590', end: [590, 420] },
];

export function LiveBoard({ className = '' }: { className?: string }) {
  const bricks: { x: number; y: number }[] = [];
  for (let row = 0; row < 26; row++) {
    for (let col = -1; col < 14; col++) bricks.push({ x: col * BRICK_W + (row % 2 ? BRICK_W / 2 : 0), y: row * BRICK_H });
  }
  return <svg viewBox="0 0 720 560" className={className} role="img" aria-labelledby="live-board-title" focusable="false">
    <title id="live-board-title">An open switchboard on a brick wall, wired to a house, a shop and a solar roof</title>
    <defs>
      <pattern id="lb-dots" width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.3" className="fill-ink" opacity=".22" />
      </pattern>
      <clipPath id="lb-wall"><path d="M30 40 L690 10 L705 545 L20 530 Z" /></clipPath>
    </defs>

    {/* brick-bond wall */}
    <g clipPath="url(#lb-wall)">
      <rect width="720" height="560" className="fill-line" />
      {bricks.map(({ x, y }) => <rect key={`${x}-${y}`} x={x + 1.5} y={y + 1.5} width={BRICK_W - 3} height={BRICK_H - 3} rx="1"
        className="fill-surface" />)}
      {/* halftone shadow cast by the board */}
      <path d="M470 80 H500 V430 H220 V410 H470 Z" fill="url(#lb-dots)" />
    </g>

    {/* conduit up out of frame */}
    <path d="M300 70 V0 M340 70 V0" stroke="#8f969d" strokeWidth="14" />
    <path d="M300 70 V0 M340 70 V0" stroke="#c5c9cd" strokeWidth="5" />
    <rect x="288" y="28" width="24" height="10" fill="#6b7178" /><rect x="328" y="40" width="24" height="10" fill="#6b7178" />

    {/* live traces with solder pads and current */}
    <g fill="none" strokeLinecap="square">
      {TRACES.map(trace => <g key={trace.id}>
        <path d={trace.d} stroke="var(--trace)" strokeWidth="6" style={{ filter: 'var(--glow)' }} />
        <path d={trace.d} stroke="var(--raised)" strokeWidth="2.5" className="flow" />
      </g>)}
    </g>
    {TRACES.map(trace => <circle key={trace.id} cx={trace.end[0]} cy={trace.end[1]} r="8" className="fill-raised" stroke="var(--trace)" strokeWidth="4" />)}

    {/* hinged door, swung open to the left, with the circuit schedule card */}
    <path d="M200 70 L118 96 V420 L200 400 Z" fill="#33383e" stroke="#1b1e22" strokeWidth="3" />
    <path d="M132 120 L188 104 V250 L132 262 Z" fill="#fbf7e9" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <path key={i} d={`M137 ${132 + i * 15} L183 ${118 + i * 15}`} stroke="#8a8a80" strokeWidth="1.4" />)}
    <path d="M137 128 L160 121" stroke="#1b1e22" strokeWidth="3" />
    <rect x="186" y="150" width="8" height="24" fill="#8f969d" /><rect x="186" y="320" width="8" height="24" fill="#8f969d" />

    {/* enclosure */}
    <rect x="200" y="70" width="270" height="330" rx="6" fill="#2c3137" stroke="#1b1e22" strokeWidth="4" />
    <rect x="214" y="84" width="242" height="302" rx="3" fill="#23272c" />
    {[[212, 82], [458, 82], [212, 388], [458, 388]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill="#a3a9af" />)}

    {/* two DIN rails of breakers */}
    {[0, 1].map(row => {
      const y = 112 + row * 140;
      return <g key={row}>
        <rect x="224" y={y + 34} width="222" height="12" fill="#a3a9af" />
        {/* main switch on the top rail */}
        {row === 0 ? <g>
          <rect x="230" y={y} width="44" height="80" rx="3" fill="#dcdcd6" stroke="#7d848b" strokeWidth="2" />
          <rect x="240" y={y + 16} width="24" height="36" rx="2" fill="#1b1e22" />
          <rect x="242" y={y + 18} width="20" height="18" rx="2" fill="#c42b22" />
          <text x="252" y={y + 70} textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" fontSize="10" fill="#1b1e22">MAIN</text>
        </g> : null}
        {Array.from({ length: row === 0 ? 7 : 9 }, (_, i) => {
          const x = (row === 0 ? 280 : 230) + i * 24;
          const live = (row === 0 && i === 2) || (row === 1 && i === 5);
          return <g key={i}>
            <rect x={x} y={y + 4} width="21" height="72" rx="2" fill="#e7e7e1" stroke="#7d848b" strokeWidth="1.5" />
            <rect x={x + 5} y={y + 18} width="11" height="28" rx="1.5" fill="#1b1e22" />
            <rect x={x + 6} y={y + 19} width="9" height="13" rx="1" fill={live ? '#ffd60a' : '#9aa0a6'} />
            <rect x={x + 3} y={y + 58} width="15" height="8" fill="#1b1e22" />
          </g>;
        })}
      </g>;
    })}
    {/* meter-panel window and warning label */}
    <rect x="230" y="350" width="70" height="24" fill="#ffd60a" />
    <path d="M238 368 l8 -14 8 14z" fill="none" stroke="#1b1e22" strokeWidth="2" />
    <rect x="262" y="356" width="32" height="4" fill="#1b1e22" /><rect x="262" y="364" width="24" height="4" fill="#1b1e22" />

    {/* hi-vis vest on a hook */}
    <path d="M520 150 v-12 a6 6 0 0 1 12 0" fill="none" stroke="#6b7178" strokeWidth="4" />
    <g transform="translate(487 160)">
      <path d="M22 0 L46 0 L56 8 L68 30 V128 H0 V30 L12 8 Z" fill="#ffd60a" stroke="#1b1e22" strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 0 L34 44 L46 0" fill="var(--bg)" stroke="#1b1e22" strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 44 V128" stroke="#1b1e22" strokeWidth="2" />
      <rect x="2" y="74" width="64" height="10" fill="#c9ccd0" stroke="#1b1e22" strokeWidth="1.5" />
      <rect x="2" y="98" width="64" height="10" fill="#c9ccd0" stroke="#1b1e22" strokeWidth="1.5" />
    </g>

    {/* vignettes: terrace house, shopfront, solar roof */}
    <Vignette x={600} y={36} label="Homes">
      <path d="M16 54 V30 L42 10 L68 30 V54 Z" /><path d="M8 34 L42 6 L76 34" /><path d="M34 54 V38 H50 V54" /><path d="M22 34 h8 v8 h-8z M54 34 h8 v8 h-8z" />
    </Vignette>
    <Vignette x={620} y={216} label="Shops">
      <path d="M10 56 V26 H74 V56" /><path d="M6 26 L14 12 H70 L78 26" /><path d="M6 26 q8 10 18 0 q8 10 18 0 q8 10 18 0 q8 10 18 0" /><path d="M18 56 V36 H34 V56 M44 36 H66 V48 H44 Z" />
    </Vignette>
    <Vignette x={590} y={366} label="Solar">
      <path d="M8 40 L42 12 L76 40" /><path d="M16 34 V58 H68 V34" /><path d="M24 30 L48 12 L64 26 L40 44 Z" /><path d="M36 21 L52 35 M30 25 L46 39 M42 17 L58 31" /><circle cx="70" cy="8" r="5" />
    </Vignette>
  </svg>;
}

function Vignette({ x, y, label, children }: { x: number; y: number; label: string; children: ReactNode }) {
  return <g transform={`translate(${x - 4} ${y})`}>
    <rect x="0" y="0" width="92" height="96" rx="4" className="fill-raised" stroke="var(--ink)" strokeWidth="3" />
    <g transform="translate(4 8)" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="miter">{children}</g>
    <rect x="0" y="72" width="92" height="24" fill="#ffd60a" stroke="var(--ink)" strokeWidth="3" />
    <text x="46" y="89" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" fontSize="15" fill="#1b1e22" letterSpacing="1.5">{label.toUpperCase()}</text>
  </g>;
}
