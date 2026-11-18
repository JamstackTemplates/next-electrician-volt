import type { ReactNode, SVGProps } from 'react';

/** 24px line icons: 2px strokes, square caps, mitred corners. Colour follows currentColor. */
const PATHS: Record<string, ReactNode> = {
  switchboard: <><rect x="3" y="3" width="18" height="18" /><path d="M3 9h18M7 12v5M11 12v5M15 12v5" /><path d="M6 6h3" /></>,
  smoke: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></>,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M8.5 14.5C6.5 13 5.5 11 5.5 9a6.5 6.5 0 0 1 13 0c0 2-1 4-3 5.5V16h-7z" /><path d="M12 9v3" /></>,
  ev: <><path d="M4 21V5l2-2h6l2 2v16" /><path d="M2 21h14M7 7h4" /><path d="M14 11h3l2 2v5a1.5 1.5 0 0 0 3 0V9l-2-2" /><path d="M9.5 10 7.5 14h3l-2 4" /></>,
  inspect: <><circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6" /><path d="M7 10h1.5l1-2.5 2 5 1-2.5H14" /></>,
  fault: <><path d="M13 2 5 13h6l-1 9 8-12h-6z" /></>,
  shop: <><path d="M3 21V10M21 21V10M2 21h20" /><path d="M2 6 4 3h16l2 3v2a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0z" /><path d="M9 21v-6h6v6" /></>,
  tag: <><path d="M3 3h9l9 9-9 9-9-9z" /><circle cx="8" cy="8" r="1.5" /><path d="m10 14 4-4" /></>,
  exit: <><rect x="2" y="6" width="20" height="12" /><circle cx="9" cy="9" r="1" /><path d="m7 16 2-4 2 1v3M9 12l-2 1M15 12h4M17 10l2 2-2 2" /></>,
  data: <><rect x="4" y="3" width="16" height="18" /><path d="M8 11h8v6H8zM10 11V9h4v2M10 17v-2M12 17v-2M14 17v-2" /></>,
  solar: <><path d="M4 13h16l-2 8H6z" /><path d="M5 17h14M10 13l-1 8M14 13l1 8" /><circle cx="12" cy="6" r="2.5" /><path d="M12 1v1M17 6h1M6 6h1M15.5 2.5l-.7.7M8.5 2.5l.7.7" /></>,
  battery: <><rect x="5" y="4" width="14" height="17" /><path d="M9 2h6v2" /><path d="M13 8l-3 5h4l-3 5" /></>,
  pulse: <><path d="M2 12h5l2-5 3 10 3-8 2 3h5" /></>,
  phone: <><path d="M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" /></>,
  email: <><rect x="2" y="5" width="20" height="14" /><path d="m2 5 10 8 10-8" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  pin: <><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
  tick: <><path d="m4 12 5 5L20 6" /></>,
  warning: <><path d="M12 3 2 21h20z" /><path d="M12 10v5M12 17.5v.5" /></>,
  print: <><path d="M6 9V2h12v7" /><rect x="2" y="9" width="20" height="9" /><path d="M6 14h12v8H6z" /></>,
  house: <><path d="M3 11 12 3l9 8" /><path d="M5 9v12h14V9" /><path d="M10 21v-6h4v6" /></>,
  menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  close: <><path d="m5 5 14 14M19 5 5 19" /></>,
  copy: <><rect x="8" y="8" width="13" height="13" /><path d="M16 8V3H3v13h5" /></>,
};

export type IconName = keyof typeof PATHS;
export const ICON_NAMES = Object.keys(PATHS);

export function Icon({ name, size = 24, title, ...rest }: { name: string; size?: number; title?: string } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="square" strokeLinejoin="miter" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}
    focusable="false" {...rest}>
    {title ? <title>{title}</title> : null}
    {PATHS[name] ?? PATHS.fault}
  </svg>;
}

/** The bolt used in the wordmark and site icon. */
export function Bolt({ className = '', ...rest }: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 32" className={className} aria-hidden="true" focusable="false" {...rest}>
    <path d="M13 0 1 18h7l-3 14L19 11h-7z" fill="currentColor" />
  </svg>;
}
