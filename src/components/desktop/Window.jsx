// src/components/desktop/Window.jsx
import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import useWindowManager from './useWindowManager';
import { log, useDebugLogging } from '../../utils/simpleLogging';

const ContentSizeCtx = React.createContext({ width: 0, height: 0, isNarrow: false, isShort: false });
export const useWindowContentSize = () => React.useContext(ContentSizeCtx);

/** Viewport helper */
function useViewport() {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return vp;
}

/** Treat as “mobile” only when primary pointer is coarse AND viewport is small. */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    const small = window.innerWidth < 768;
    setIsMobile(Boolean(coarse && small));
  }, []);
  return isMobile;
}

function rectNormToPx(rect, w, h) {
  return { left: rect.x * w, top: rect.y * h, width: rect.w * w, height: rect.h * h };
}

export default function Window({ win, children }) {
  const { actions } = useWindowManager();
  const { w, h } = useViewport();
  const isMobile = useIsMobile();
  const { logRender, log: dbg } = useDebugLogging(`Window:${win?.id ?? 'unknown'}`);

  // ---- guards ----
  if (!win) return null;
  if (win.state === 'closed' || win.state === 'minimized') return null;

  // drag + resize gesture state
  const dragRef = useRef(null);     // { startX, startY }
  const resizeRef = useRef(null);   // { dir, startX, startY, startRect }

  // style from normalized rect
  const style = useMemo(() => {
    const px = rectNormToPx(win.rect, w, h);
    return {
      left: px.left,
      top: px.top,
      width: px.width,
      height: px.height,
      zIndex: win.z ?? 1,
      position: 'absolute',
      pointerEvents: 'auto',
    };
  }, [win.rect, win.z, w, h]);

  useEffect(() => {
    logRender({ id: win.id, rect: win.rect, z: win.z, state: win.state });
  });

  /* =========================
     DRAG (desktop)
  ==========================*/
  const startDrag = useCallback((clientX, clientY) => {
    dragRef.current = { startX: clientX, startY: clientY };
    log.interaction(`DRAG start (${win.id})`, { x: clientX, y: clientY });

    const onMove = (ev) => {
      const ctx = dragRef.current;
      if (!ctx) return;
      const dx = (ev.clientX - ctx.startX) / w;
      const dy = (ev.clientY - ctx.startY) / h;
      ctx.startX = ev.clientX;
      ctx.startY = ev.clientY;
      actions.move(win.id, dx, dy);
    };

    const onUp = (ev) => {
      log.interaction(`DRAG end (${win.id})`, { x: ev.clientX, y: ev.clientY });
      dragRef.current = null;
      window.removeEventListener('pointermove', onMove, true);
      window.removeEventListener('pointerup', onUp, true);
      window.removeEventListener('pointercancel', onUp, true);
      window.removeEventListener('mousemove', onMove, true);
      window.removeEventListener('mouseup', onUp, true);
    };

    window.addEventListener('pointermove', onMove, true);
    window.addEventListener('pointerup', onUp, true);
    window.addEventListener('pointercancel', onUp, true);
    window.addEventListener('mousemove', onMove, true);
    window.addEventListener('mouseup', onUp, true);
  }, [actions, win.id, w, h]);

  const onTitlePointerDown = useCallback((e) => {
    if (isMobile || win.state !== 'normal') return;
    if (e.button !== 0 && e.pointerType !== 'mouse') return;
    if (e.target.closest?.('.window-controls') || e.target.closest?.('.window-resizer')) return;
    e.preventDefault(); e.stopPropagation();
    startDrag(e.clientX, e.clientY);
  }, [isMobile, win.state, startDrag]);

  const onTitleMouseDown = useCallback((e) => {
    if (isMobile || win.state !== 'normal') return;
    if (e.button !== 0) return;
    if (e.target.closest?.('.window-controls') || e.target.closest?.('.window-resizer')) return;
    e.preventDefault(); e.stopPropagation();
    startDrag(e.clientX, e.clientY);
  }, [isMobile, win.state, startDrag]);

  const onTitleEnter = useCallback(() => log.hover('DragZone:Titlebar', 'enter', { id: win.id }), [win.id]);
  const onTitleLeave = useCallback(() => log.hover('DragZone:Titlebar', 'leave', { id: win.id }), [win.id]);

  /* =========================
     RESIZE (desktop)
  ==========================*/
  const startResize = useCallback((e, dir) => {
    if (isMobile || win.state !== 'normal') return;
    if (e.button !== 0 && e.pointerType !== 'mouse') return;
    e.preventDefault(); e.stopPropagation();

    resizeRef.current = { dir, startX: e.clientX, startY: e.clientY, startRect: { ...win.rect } };
    log.interaction(`RESIZE start (${win.id})`, { dir, x: e.clientX, y: e.clientY, rect: win.rect });

    const onMove = (ev) => {
      const ctx = resizeRef.current;
      if (!ctx) return;
      const dx = (ev.clientX - ctx.startX) / w;
      const dy = (ev.clientY - ctx.startY) / h;
      let { x, y, w: rw, h: rh } = ctx.startRect;

      if (ctx.dir.includes('e')) rw = ctx.startRect.w + dx;
      if (ctx.dir.includes('s')) rh = ctx.startRect.h + dy;
      if (ctx.dir.includes('w')) { rw = ctx.startRect.w - dx; x = ctx.startRect.x + dx; }
      if (ctx.dir.includes('n')) { rh = ctx.startRect.h - dy; y = ctx.startRect.y + dy; }

      actions.setRect(win.id, { x, y, w: rw, h: rh });
      log.interaction(`RESIZE move (${win.id})`, { dir: ctx.dir, dx, dy, rect: { x, y, w: rw, h: rh } });
    };

    const onUp = (ev) => {
      log.interaction(`RESIZE end (${win.id})`, { dir, x: ev.clientX, y: ev.clientY });
      resizeRef.current = null;
      window.removeEventListener('pointermove', onMove, true);
      window.removeEventListener('pointerup', onUp, true);
      window.removeEventListener('pointercancel', onUp, true);
      window.removeEventListener('mousemove', onMove, true);
      window.removeEventListener('mouseup', onUp, true);
    };

    window.addEventListener('pointermove', onMove, true);
    window.addEventListener('pointerup', onUp, true);
    window.addEventListener('pointercancel', onUp, true);
    window.addEventListener('mousemove', onMove, true);
    window.addEventListener('mouseup', onUp, true);
  }, [actions, isMobile, win.state, win.rect, win.id, w, h]);

  const resizerEnter = useCallback((dir) => log.hover(`ResizeZone:${dir}`, 'enter', { id: win.id }), [win.id]);
  const resizerLeave = useCallback((dir) => log.hover(`ResizeZone:${dir}`, 'leave', { id: win.id }), [win.id]);

  /* =========================
     Controls
  ==========================*/
  const onMinPointerUp = useCallback((e) => {
    e.stopPropagation(); e.preventDefault();
    log.click('Window.Minimize', { id: win.id }); actions.minimize(win.id);
  }, [actions, win.id]);

  const onMaxRestorePointerUp = useCallback((e) => {
    e.stopPropagation(); e.preventDefault();
    if (win.state === 'maximized') { log.click('Window.Restore', { id: win.id }); actions.restore(win.id); }
    else { log.click('Window.Maximize', { id: win.id }); actions.maximize(win.id); }
  }, [actions, win.id, win.state]);

  const onClosePointerUp = useCallback((e) => {
    e.stopPropagation(); e.preventDefault();
    log.click('Window.Close', { id: win.id }); actions.close(win.id);
  }, [actions, win.id]);

  const onTitlebarDoubleClick = useCallback(() => {
    if (win.state === 'maximized') { log.click('Window.TitlebarDoubleClick.Restore', { id: win.id }); actions.restore(win.id); }
    else { log.click('Window.TitlebarDoubleClick.Maximize', { id: win.id }); actions.maximize(win.id); }
  }, [actions, win.id, win.state]);

  /* =========================
     Content-size observer
  ==========================*/
  const contentRef = useRef(null);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0, isNarrow: false, isShort: false });

  useEffect(() => {
    const el = contentRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      const next = {
        width: cr.width,
        height: cr.height,
        isNarrow: cr.width < 520,
        isShort: cr.height < 360,
      };
      setContentSize(next);
      log.debug(`[Window:${win.id}] content resized`, next);
      // Expose for CSS as well
      el.style.setProperty('--window-content-w', `${cr.width}px`);
      el.style.setProperty('--window-content-h', `${cr.height}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [win.id]);

  // Allow function children/win.content to adapt based on size
  const renderPayload = contentSize;
  const resolvedContent =
    typeof children === 'function' ? children(renderPayload)
    : typeof win.content === 'function' ? win.content(renderPayload)
    : (children ?? win.content ?? (
        <div className="p-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--window-title)' }}>{win.title}</h2>
          <p className="opacity-80 text-sm">This window is ready for content.</p>
        </div>
      ));

  const CtrlBtn = ({ label, title, onPointerUp }) => (
    <button
      type="button"
      className="window-btn"
      aria-label={title}
      title={title}
      onPointerDown={(e) => { e.stopPropagation(); log.interaction(`Ctrl ${title} pointerdown`, { id: win.id }); }}
      onPointerUp={onPointerUp}
      onMouseEnter={() => log.hover(`Ctrl:${title}`, 'enter', { id: win.id })}
      onMouseLeave={() => log.hover(`Ctrl:${title}`, 'leave', { id: win.id })}
      style={{
        width: 28, height: 24,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 6, lineHeight: 1, fontWeight: 700,
        color: 'var(--window-title)', background: 'transparent',
        border: '1px solid transparent',
        transition: `background var(--motion-duration-fast) var(--motion-easing-standard),
                     border-color var(--motion-duration-fast) var(--motion-easing-standard),
                     transform var(--motion-duration-fast) var(--motion-easing-standard)`,
        userSelect: 'none', pointerEvents: 'auto',
      }}
      onMouseDown={(e) => { e.stopPropagation(); e.currentTarget.style.transform = 'scale(0.96)'; }}
      onMouseUp={(e) => { e.stopPropagation(); e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`window ${win.state === 'maximized' ? 'window--maximized' : ''}`}
      style={style}
      onMouseDown={() => { actions.focus(win.id); dbg('focus', { id: win.id, z: win.z }); }}
      role="dialog"
      aria-label={win.title}
    >
      {/* Titlebar (drag handle) */}
      <div
        className="window-titlebar"
        onPointerDown={onTitlePointerDown}
        onMouseDown={onTitleMouseDown}
        onPointerEnter={onTitleEnter}
        onPointerLeave={onTitleLeave}
        onDoubleClick={onTitlebarDoubleClick}
        style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', paddingInline: 10, touchAction: 'none' }}
      >
        <div className="window-title" style={{ pointerEvents: 'none' }}>{win.title}</div>
        <div className="window-controls" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <CtrlBtn label="_" title="Minimize" onPointerUp={onMinPointerUp} />
          <CtrlBtn label="▢" title={win.state === 'maximized' ? 'Restore' : 'Maximize'} onPointerUp={onMaxRestorePointerUp} />
          <CtrlBtn label="X" title="Close" onPointerUp={onClosePointerUp} />
        </div>
      </div>

      {/* Content */}
      <div className="window-content" style={{ padding: 10 }}>
        <div
          ref={contentRef}
          className="window-inner-frame"
          style={{
            position: 'relative', width: '100%', height: '100%',
            borderRadius: `calc(var(--window-radius) - 8px)`,
            border: '1px solid var(--window-border)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(calc(var(--window-backdrop-blur) * 0.6))',
            WebkitBackdropFilter: 'blur(calc(var(--window-backdrop-blur) * 0.6))',
            overflow: 'hidden',
          }}
        >
          <ContentSizeCtx.Provider value={contentSize}>
            {resolvedContent}
          </ContentSizeCtx.Provider>
        </div>
      </div>

      {/* Resizers (desktop only) */}
      {!isMobile && win.state === 'normal' && (
        <>
          {['n','s','e','w','ne','nw','se','sw'].map((dir) => (
            <div
              key={dir}
              className={`window-resizer ${dir}`}
              onPointerDown={(e) => startResize(e, dir)}
              onMouseDown={(e) => startResize(e, dir)}
              onPointerEnter={() => resizerEnter(dir)}
              onPointerLeave={() => resizerLeave(dir)}
              style={{ touchAction: 'none' }}
            />
          ))}
        </>
      )}
    </div>
  );
}
