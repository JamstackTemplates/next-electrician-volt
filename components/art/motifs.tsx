import type { Suburb, SuburbGroup } from '../../content/business';

const COND = "'Barlow Condensed', sans-serif";

/** Horizontal circuit trace with solder pads, a resistor and a capacitor, joining one section to the next. */
export function CircuitDivider({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 1200 48" preserveAspectRatio="xMinYMid slice" className={`block h-12 w-full ${className}`} aria-hidden="true" focusable="false">
    <g fill="none" stroke="var(--trace)" strokeWidth="3" style={{ filter: 'var(--glow)' }}>
      <path d="M0 24 H180 L196 10 H330" />
      <path d="M330 10 l8 -8 l10 16 l10 -16 l10 16 l10 -16 l8 8" />
      <path d="M386 10 H520 L536 24 H700" />
      <path d="M700 10 V38 M712 10 V38" />
      <path d="M712 24 H860 L876 38 H1040 L1056 24 H1200" />
      <path d="M520 24 V44 H640" opacity=".55" />
    </g>
    {[[180, 24], [330, 10], [520, 24], [860, 24], [1040, 38]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="6"
      className="fill-bg" stroke="var(--trace)" strokeWidth="3" />)}
    <circle cx="640" cy="44" r="4" fill="var(--trace)" />
  </svg>;
}

/** Three stripped cable ends: active (brown), neutral (blue), earth (green-yellow), with copper strands. */
export function CableEnds({ className = '', bleed = false }: { className?: string; bleed?: boolean }) {
  const art = <CableArt className={bleed ? 'h-[66px] w-auto flex-none' : `block h-auto w-full max-w-[26rem] ${className}`} />;
  if (!bleed) return art;
  // Sheath runs in from the page edge to the stripped ends.
  return <div className={`flex items-center ${className}`} aria-hidden="true">
    <div className="h-[60px] flex-1 border-y-[3px] border-[#1b1e22] bg-[#c9ccd0]" />
    <div className="-ml-px">{art}</div>
  </div>;
}

function CableArt({ className }: { className: string }) {
  const cables = [
    { y: 16, fill: '#8a4b22', stripe: false },
    { y: 42, fill: '#1f5fa8', stripe: false },
    { y: 68, fill: '#2e7d32', stripe: true },
  ];
  return <svg viewBox="40 0 520 86" className={className} aria-hidden="true" focusable="false">
    <defs>
      <pattern id="earth-stripe" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="16" fill="#ffd60a" />
      </pattern>
    </defs>
    {/* outer grey sheath */}
    <rect x="-10" y="4" width="330" height="78" rx="12" fill="#c9ccd0" stroke="#1b1e22" strokeWidth="3" />
    {cables.map(({ y, fill, stripe }, index) => {
      const end = 470 + index * 22;
      return <g key={y}>
        <rect x="300" y={y - 9} width={end - 300} height="18" rx="8" fill={fill} stroke="#1b1e22" strokeWidth="2.5" />
        {stripe ? <rect x="302" y={y - 7} width={end - 304} height="14" rx="6" fill="url(#earth-stripe)" /> : null}
        <g stroke="#c87533" strokeWidth="2.2" strokeLinecap="round">
          <path d={`M${end} ${y - 4} h34`} /><path d={`M${end} ${y} h40`} /><path d={`M${end} ${y + 4} h32`} />
        </g>
        <path d={`M${end} ${y - 5} h30`} stroke="#f0b27a" strokeWidth="1" strokeLinecap="round" />
      </g>;
    })}
  </svg>;
}

/** Yellow-bodied multimeter with probes; `reading` shows on the LCD ("240 V", or "OL" on the 404). */
export function Multimeter({ reading = '240 V', className = '', title }: { reading?: string; className?: string; title?: string }) {
  return <svg viewBox="0 0 300 360" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} focusable="false">
    {title ? <title>{title}</title> : null}
    {/* leads */}
    <path d="M118 318 C110 350 40 340 30 300 S40 210 18 170" fill="none" stroke="#1b1e22" strokeWidth="7" strokeLinecap="round" />
    <path d="M150 318 C170 356 270 350 278 290 S250 220 282 180" fill="none" stroke="#c42b22" strokeWidth="7" strokeLinecap="round" />
    <path d="M8 120 L28 172 M12 172 h22" stroke="#1b1e22" strokeWidth="10" strokeLinecap="round" />
    <path d="M8 120 l-4 -16" stroke="#a3a9af" strokeWidth="4" strokeLinecap="round" />
    <path d="M292 130 L282 182 M270 182 h22" stroke="#c42b22" strokeWidth="10" strokeLinecap="round" />
    <path d="M292 130 l3 -16" stroke="#a3a9af" strokeWidth="4" strokeLinecap="round" />
    {/* body */}
    <rect x="60" y="10" width="180" height="310" rx="22" fill="#ffd60a" stroke="#1b1e22" strokeWidth="4" />
    <rect x="76" y="26" width="148" height="278" rx="12" fill="#2c3137" />
    {/* LCD */}
    <rect x="90" y="42" width="120" height="66" rx="4" fill="#c8d6b9" stroke="#1b1e22" strokeWidth="3" />
    <text x="150" y="91" textAnchor="middle" fontFamily="'Saira Stencil One', sans-serif" fontSize="34" fill="#1b1e22">{reading}</text>
    <text x="98" y="56" fontFamily={COND} fontSize="10" fontWeight="700" fill="#1b1e22">AC</text>
    {/* dial */}
    <circle cx="150" cy="186" r="50" fill="#1b1e22" stroke="#6b7178" strokeWidth="3" />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <path key={i} d={`M${150 + Math.cos(a) * 56} ${186 + Math.sin(a) * 56} L${150 + Math.cos(a) * 64} ${186 + Math.sin(a) * 64}`} stroke="#ffd60a" strokeWidth="3" />;
    })}
    <rect x="144" y="140" width="12" height="92" rx="5" fill="#dcdcd6" transform="rotate(-35 150 186)" />
    <circle cx="150" cy="186" r="12" fill="#6b7178" />
    <text x="150" y="122" textAnchor="middle" fontFamily={COND} fontSize="13" fontWeight="700" fill="#ffd60a">V~</text>
    {/* sockets */}
    {[100, 150, 200].map((x, i) => <circle key={x} cx={x} cy="276" r="11" fill={i === 1 ? '#c42b22' : '#1b1e22'} stroke="#6b7178" strokeWidth="3" />)}
  </svg>;
}

/** Schematic service-area map: the Abbotsford base as a terminal block, suburbs as nodes on three branches. */
export function ServiceAreaMap({ suburbs, base, className = '' }: { suburbs: readonly Suburb[]; base: string; className?: string }) {
  const groups: { id: SuburbGroup; label: string; y: number }[] = [
    { id: 'north', label: 'North', y: 70 }, { id: 'inner', label: 'Inner', y: 200 }, { id: 'east', label: 'East', y: 330 },
  ];
  return <svg viewBox="0 0 760 400" className={className} aria-hidden="true" focusable="false">
    {/* terminal block */}
    <rect x="20" y="150" width="120" height="100" rx="4" fill="#2c3137" stroke="#ffd60a" strokeWidth="3" />
    {[0, 1, 2].map(i => <g key={i}>
      <rect x="112" y={165 + i * 26} width="20" height="18" fill="#a3a9af" />
      <circle cx="122" cy={174 + i * 26} r="5" fill="#33383e" />
    </g>)}
    <text x="30" y="188" fontFamily="'Saira Stencil One', sans-serif" fontSize="19" fill="#ffd60a">BASE</text>
    <text x="30" y="214" fontFamily={COND} fontSize="17" fontWeight="600" fill="#f1efe8">{base}</text>
    <text x="30" y="234" fontFamily={COND} fontSize="13" fill="#a7adb5">near Victoria Park</text>
    {groups.map((group, gi) => {
      const items = suburbs.filter(s => s.group === group.id && s.name !== base);
      const startY = 174 + gi * 26;
      const lastX = 230 + (items.length - 1) * 118;
      return <g key={group.id}>
        <path d={`M132 ${startY} H${160 + gi * 8} L${190} ${group.y} H${lastX}`} fill="none" stroke="#ffd60a" strokeWidth="4"
          style={{ filter: 'drop-shadow(0 0 4px rgb(255 214 10 / .5))' }} />
        <text x="200" y={group.y - 14} fontFamily={COND} fontSize="14" fontWeight="600" fill="#a7adb5" letterSpacing="1">{group.label.toUpperCase()}</text>
        {items.map((suburb, i) => {
          const x = 230 + i * 118;
          return <g key={suburb.id}>
            <circle cx={x} cy={group.y} r="9" fill="#23272c" stroke="#ffd60a" strokeWidth="4" />
            <text x={x} y={group.y + (i % 2 ? -20 : 34)} textAnchor="middle" fontFamily={COND} fontSize="20" fontWeight="600" fill="#f1efe8">{suburb.name}</text>
          </g>;
        })}
      </g>;
    })}
  </svg>;
}

/** Spring clip for the top of a clipboard. */
export function ClipboardClip({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 180 54" className={className} aria-hidden="true" focusable="false">
    <path d="M30 54 V24 Q30 14 40 14 H66 Q70 2 90 2 Q110 2 114 14 H140 Q150 14 150 24 V54 Z" fill="#a3a9af" stroke="#1b1e22" strokeWidth="3" />
    <circle cx="90" cy="15" r="6" fill="var(--bg)" stroke="#1b1e22" strokeWidth="3" />
    <path d="M42 36 H138" stroke="#6b7178" strokeWidth="3" />
  </svg>;
}

/** Unplugged lead with a small spark, for the 404. */
export function UnpluggedLead({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 240 120" className={className} aria-hidden="true" focusable="false">
    <path d="M0 90 C60 90 70 40 120 50" fill="none" stroke="#a3a9af" strokeWidth="8" strokeLinecap="round" />
    <rect x="118" y="34" width="44" height="34" rx="4" fill="#dcdcd6" stroke="#1b1e22" strokeWidth="3" />
    <path d="M162 42 h18 M162 60 h18 M156 51 h10" stroke="#a3a9af" strokeWidth="5" />
    <path d="M196 30 l10 12 -8 2 12 14 M206 70 l14 -6 M200 22 l4 -12" stroke="#ffd60a" strokeWidth="4" fill="none" strokeLinecap="square" style={{ filter: 'var(--glow)' }} />
  </svg>;
}
