// src/components/desktop/Taskbar.jsx
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import useWindowManager from './useWindowManager';

/**
 * Taskbar
 *
 * Props:
 *  - showMainWhenAllClosed?: boolean (default true)
 *  - mainConfig?: Partial<DesktopWindow>  // used if "main" doesn't exist yet when requested
 *  - onIconRectChange?: (id: string, rect: DOMRect | null) => void
 *      Called whenever a minimized window button mounts/unmounts/updates, so
 *      you can use its rect for smooth minimize/restore animations later.
 */
export default function Taskbar({
  showMainWhenAllClosed = true,
  mainConfig = {
    id: 'main',
    title: 'Main',
    icon: '👤',
    rect: { x: 0.2, y: 0.12, w: 0.6, h: 0.66 },
    state: 'normal',
  },
  onIconRectChange,
}) {
  const { selectors, actions } = useWindowManager();

  const minimized = selectors.minimizedWindows();
  const anyOpen = selectors.isAnyOpen(); // includes minimized
  const showMainCTA = showMainWhenAllClosed && !anyOpen;

  // Layout regions for future expansion (widgets/search/etc.)
  // Left: app buttons; Center: reserved; Right: reserved
  return (
    <div className="taskbar" role="toolbar" aria-label="Taskbar">
      {/* Left region: Main CTA (conditional) + minimized windows */}
      <div className="flex items-center gap-[var(--taskbar-gap)]">
        {showMainCTA && (
          <button
            className="taskbar-button taskbar-main"
            aria-label="Open Main Window"
            title="Open Main Window"
            onClick={() => {
              const main = selectors.getById('main');
              if (!main) {
                // If main isn't registered yet, open it with provided config
                actions.open(mainConfig.id ?? 'main', mainConfig);
              } else {
                actions.open('main');
              }
            }}
          >
            <span className="icon">{mainConfig.icon ?? '👤'}</span>
            <span>Main Window</span>
          </button>
        )}

        {minimized.map((w) => (
          <TaskbarItem
            key={w.id}
            id={w.id}
            title={w.title}
            icon={w.icon}
            onActivate={() => actions.restore(w.id)}
            onRect={(rect) => onIconRectChange?.(w.id, rect)}
          />
        ))}
      </div>

      {/* Center region (reserved for future widgets/search) */}
      <div className="flex-1" />

      {/* Right region (reserved for clock/tray in future) */}
      <div className="flex items-center gap-[var(--taskbar-gap)]">
        {/* placeholders for future expansion */}
        {/* <SearchButton/>  <ClockWidget/>  <SystemTray/> */}
      </div>
    </div>
  );
}

/** Single minimized window button with rect reporting for animations */
function TaskbarItem({ id, title, icon, onActivate, onRect }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const report = () => onRect?.(el.getBoundingClientRect());
    report();

    const ro = 'ResizeObserver' in window ? new ResizeObserver(report) : null;
    ro?.observe(el);

    const onWin = () => report();
    window.addEventListener('scroll', onWin, true);

    return () => {
      onRect?.(null);
      ro?.disconnect();
      window.removeEventListener('scroll', onWin, true);
    };
  }, [onRect]);

  return (
    <button
      ref={ref}
      className="taskbar-button"
      aria-label={`Restore ${title}`}
      title={title}
      onClick={onActivate}
    >
      <span className="icon">{icon || '🗔'}</span>
      <span>{title}</span>
    </button>
  );
}
