'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Icon } from './art/icons';

export type ChecklistItem = { id: string; area: string; check: string; why: string; stopAndCall: boolean };
export type ChecklistArea = { id: string; title: string };

const STORAGE_KEY = 'bright-spark-safety-ticks';

function readTicks(): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : [];
  } catch { return []; }
}

function writeTicks(ids: string[]) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch { /* storage unavailable: ticks last for this visit only */ }
}

/**
 * The 10-minute safety check on a clipboard sheet. Native checkboxes work without JavaScript;
 * with it, an analogue gauge and count follow the ticks, which are remembered in this browser only.
 */
export function SafetyChecklist({ areas, items, heading, printHeader, stopLabel }: {
  areas: ChecklistArea[]; items: ChecklistItem[]; heading: ReactNode; printHeader: ReactNode; stopLabel: string;
}) {
  const [enhanced, setEnhanced] = useState(false);
  const [ticked, setTicked] = useState<string[]>([]);

  useEffect(() => {
    setEnhanced(true);
    const known = new Set(items.map(item => item.id));
    setTicked(readTicks().filter(id => known.has(id)));
  }, [items]);

  function toggle(id: string, checked: boolean) {
    setTicked(current => {
      const next = checked ? [...new Set([...current, id])] : current.filter(value => value !== id);
      writeTicks(next);
      return next;
    });
  }

  function clear() { setTicked([]); writeTicks([]); }

  const done = ticked.length;
  const total = items.length;
  const angle = -90 + (total ? done / total : 0) * 180;

  return <div className="safety-grid grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
    {enhanced ? <aside aria-label="Progress" className="no-print band rounded-md p-5 lg:sticky lg:top-6 lg:order-2">
      <svg viewBox="0 0 200 118" className="mx-auto block w-full max-w-[15rem]" aria-hidden="true">
        <path d="M14 104 A86 86 0 0 1 186 104" fill="none" stroke="#4a5058" strokeWidth="14" />
        <path d="M14 104 A86 86 0 0 1 186 104" fill="none" stroke="#ffd60a" strokeWidth="14" pathLength={100}
          strokeDasharray={`${(done / total) * 100} 100`} style={{ transition: 'stroke-dasharray .5s ease' }} />
        {Array.from({ length: total + 1 }, (_, i) => {
          const a = Math.PI - (i / total) * Math.PI;
          return <path key={i} d={`M${100 + Math.cos(a) * 70} ${104 - Math.sin(a) * 70} L${100 + Math.cos(a) * 62} ${104 - Math.sin(a) * 62}`} stroke="#b4b9bf" strokeWidth="2" />;
        })}
        <g className="gauge-needle" style={{ transform: `rotate(${angle}deg)`, transformOrigin: '100px 104px' }}>
          <path d="M100 104 L100 30" stroke="#ff8a80" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="104" r="9" fill="#a3a9af" stroke="#1b1e22" strokeWidth="2" />
      </svg>
      <p className="mt-2 text-center font-cond text-[1.5rem] font-bold tabular" role="status" aria-live="polite">{done} of {total} checked</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="btn btn-hivis !min-h-11 !text-[1.05rem] !shadow-none" onClick={() => window.print()}>
          <Icon name="print" size={18} />Print
        </button>
        <button type="button" className="btn btn-line !min-h-11 !text-[1.05rem]" onClick={clear} disabled={!done}>Clear</button>
      </div>
      <p className="band-muted mt-3 text-[.92rem]">Ticks are saved in this browser only.</p>
    </aside> : null}

    <div className="node clipboard-sheet relative rounded-sm border-2 border-ink/70 px-5 pb-8 pt-6 shadow-[8px_8px_0_var(--line)] sm:px-8 lg:order-1">
      <div className="print-only mb-4">{printHeader}</div>
      <h2 id="checklist-heading" className="stencil text-[clamp(2rem,4.4vw,3rem)]">{heading}</h2>
      {areas.map(area => {
        const list = items.filter(item => item.area === area.id);
        if (!list.length) return null;
        return <fieldset key={area.id} className="mt-8 border-0 p-0">
          <legend className="font-cond text-[1.5rem] font-bold">{area.title}</legend>
          <div className="mt-3 grid gap-4">
            {list.map(item => <div key={item.id} className="check-row flex items-start gap-4">
              <input type="checkbox" id={`check-${item.id}`} className="check-box" aria-describedby={`why-${item.id}`}
                checked={enhanced ? ticked.includes(item.id) : undefined}
                onChange={enhanced ? event => toggle(item.id, event.currentTarget.checked) : undefined} />
              <div>
                <label htmlFor={`check-${item.id}`} className="check-text cursor-pointer text-[1.12rem] font-semibold">{item.check}</label>
                {item.stopAndCall ? <span className="ml-2 inline-block rounded-[3px] bg-danger-fill px-1.5 py-0.5 align-middle font-cond text-[.85rem] font-semibold text-white">{stopLabel}</span> : null}
                <p id={`why-${item.id}`} className="mt-1 text-muted">{item.why}</p>
              </div>
            </div>)}
          </div>
        </fieldset>;
      })}
    </div>
  </div>;
}
