'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './art/icons';

/** Mobile navigation disclosure that closes on route change, Escape or outside click. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (details.current) details.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && details.current?.open) {
        details.current.open = false;
        details.current.querySelector('summary')?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (details.current?.open && !details.current.contains(event.target as Node)) {
        details.current.open = false;
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return <details ref={details} className="menu relative md:hidden">
    <summary className="grid h-11 w-11 place-items-center rounded-sm border-2 border-white/25" aria-label="Menu">
      <Icon name="menu" className="menu-icon-open" /><Icon name="close" className="menu-icon-close" />
    </summary>
    <nav aria-label="Menu" className="band absolute right-0 top-[calc(100%+.9rem)] w-[min(18rem,calc(100vw-2rem))] border-2 border-hivis p-2 shadow-2xl"
      onClick={() => { if (details.current) details.current.open = false; }}>
      {children}
    </nav>
  </details>;
}
