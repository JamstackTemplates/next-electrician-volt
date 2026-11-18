/**
 * A DIN-rail circuit breaker. Toggle up and yellow when on; down and grey when off.
 * `tripped` adds the red trip flag used on the 404 page. Flat fills, 2px strokes.
 */
export function BreakerArt({ on, amps, tripped = false, className = '' }: {
  on: boolean; amps: number; tripped?: boolean; className?: string;
}) {
  return <svg viewBox="0 0 56 140" className={`breaker ${className}`} data-on={on} aria-hidden="true" focusable="false">
    {/* body */}
    <rect x="2" y="1" width="52" height="138" rx="3" fill="#dcdcd6" stroke="#7d848b" strokeWidth="2" />
    <rect x="2" y="1" width="6" height="138" fill="#c4c5bf" />
    {/* terminals */}
    <rect x="14" y="7" width="28" height="15" fill="#33383e" />
    <circle cx="28" cy="14.5" r="5" fill="#a3a9af" /><path d="M24.5 14.5h7" stroke="#33383e" strokeWidth="1.6" />
    <rect x="14" y="118" width="28" height="15" fill="#33383e" />
    <circle cx="28" cy="125.5" r="5" fill="#a3a9af" /><path d="M24.5 125.5h7" stroke="#33383e" strokeWidth="1.6" />
    {/* front shoulder */}
    <rect x="7" y="29" width="42" height="83" rx="2" fill="#f4f4ef" stroke="#a9aeb3" strokeWidth="1.5" />
    {/* toggle slot and toggle */}
    <rect x="17" y="37" width="22" height="48" rx="3" fill="#1b1e22" />
    <g className="breaker-toggle" style={{ transform: on ? 'none' : 'translateY(15px)' }}>
      <rect x="19" y="39" width="18" height="28" rx="2.5" fill={on ? '#ffd60a' : '#6b7178'} stroke="#1b1e22" strokeWidth="1.5"
        style={on ? { filter: 'var(--glow)' } : undefined} />
      <path d="M22.5 45h11M22.5 49h11M22.5 53h11" stroke={on ? '#8a6f00' : '#454a50'} strokeWidth="1.5" />
    </g>
    {/* status window: red = on (contacts closed), green = off */}
    <rect x="22" y="90" width="12" height="5" fill={on ? '#c42b22' : '#2e7d32'} />
    {tripped ? <path d="M40 30 l12 -6 v12 z" fill="#c42b22" stroke="#1b1e22" strokeWidth="1.2" /> : null}
    <text x="28" y="108" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" fontSize="12" fill="#1b1e22">C{amps}</text>
  </svg>;
}

/** The steel DIN rail breakers clip onto. */
export function DinRail({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`steel h-5 rounded-[2px] ${className}`}
    style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 22px, rgb(0 0 0 / .35) 22px 30px), linear-gradient(180deg, #d5d8db, #8f969d)' }} />;
}
