//src/components/desktop/useWindowManager.js
import { useMemo, useSyncExternalStore } from 'react';

/**
 * Window record (normalized geometry)
 * @typedef {Object} DesktopWindow
 * @property {string} id
 * @property {string} title
 * @property {{x:number,y:number,w:number,h:number}} rect  // 0..1 normalized
 * @property {'normal'|'minimized'|'maximized'|'closed'} state
 * @property {number} z
 * @property {string=} icon
 * @property {any=} content            // optional: React node or descriptor
 * @property {{x:number,y:number,w:number,h:number}=} prevRect
 */

/** Internal store (intentionally simple, dependency-free) */
const _store = {
  windows: /** @type {DesktopWindow[]} */ ([]),
  zCounter: 1,
  listeners: new Set(),
};

/* ---------------------------
   Core store plumbing
---------------------------- */
function _emit() {
  _store.listeners.forEach((l) => {
    try { l(); } catch (e) { console.error(e); }
  });
}
function _subscribe(listener) {
  _store.listeners.add(listener);
  return () => _store.listeners.delete(listener);
}
/** IMPORTANT: return a stable reference; do not allocate here */
function _getSnapshot() {
  return _store.windows;
}
/** Replace array ref and notify */
function _replaceWindows(next) {
  _store.windows = next;
  _emit();
}

/* ---------------------------
   Helpers
---------------------------- */
function _findIndex(id) {
  return _store.windows.findIndex((w) => w.id === id);
}
function _bringToFront(idx) {
  _store.zCounter += 1;
  _store.windows[idx].z = _store.zCounter;
}
const _clamp01 = (n) => Math.max(0, Math.min(1, n));
function _clampRect(rect) {
  const w = Math.max(0.1, Math.min(1, rect.w));
  const h = Math.max(0.1, Math.min(1, rect.h));
  const x = Math.max(0, Math.min(1 - w, _clamp01(rect.x)));
  const y = Math.max(0, Math.min(1 - h, _clamp01(rect.y)));
  return { x, y, w, h };
}

/* ---------------------------
   Actions (always call _replaceWindows([...]) after mutation)
---------------------------- */

/**
 * Initialize windows (replaces current set). Any missing fields get sane defaults.
 * @param {Partial<DesktopWindow>[]} initial
 */
function initWindows(initial = []) {
  const normalized = initial.map((w, i) => ({
    id: w.id ?? `win-${i + 1}`,
    title: w.title ?? 'Window',
    rect: _clampRect(w.rect ?? { x: 0.2, y: 0.15, w: 0.6, h: 0.6 }),
    state: w.state ?? 'normal',
    z: typeof w.z === 'number' ? w.z : (i + 1),
    icon: w.icon,
    content: w.content,
    prevRect: w.prevRect,
  }));
  _store.zCounter = Math.max(1, ...normalized.map((w) => w.z));
  _replaceWindows(normalized); // new ref
}

/**
 * Open (or restore) a window by id. If it doesn't exist and config provided, create it.
 * @param {string} id
 * @param {Partial<DesktopWindow>=} config
 */
function open(id, config) {
  const idx = _findIndex(id);
  if (idx >= 0) {
    const w = _store.windows[idx];
    if (w.state === 'closed' || w.state === 'minimized') w.state = 'normal';
    _bringToFront(idx);
    _replaceWindows([..._store.windows]);
    return;
  }
  if (config) {
    const win = {
      id,
      title: config.title ?? 'Window',
      rect: _clampRect(config.rect ?? { x: 0.25, y: 0.18, w: 0.5, h: 0.6 }),
      state: config.state ?? 'normal',
      z: ++_store.zCounter,
      icon: config.icon,
      content: config.content,
      prevRect: config.prevRect,
    };
    _replaceWindows([..._store.windows, win]);
  } else {
    console.warn(`open("${id}") called but window not found and no config provided.`);
  }
}

function close(id) {
  const idx = _findIndex(id); if (idx < 0) return;
  _store.windows[idx].state = 'closed';
  _replaceWindows([..._store.windows]);
}

function minimize(id) {
  const idx = _findIndex(id); if (idx < 0) return;
  const w = _store.windows[idx];
  if (w.state === 'minimized') return;
  w.prevRect = w.rect;
  w.state = 'minimized';
  _replaceWindows([..._store.windows]);
}

function maximize(id) {
  const idx = _findIndex(id); if (idx < 0) return;
  const w = _store.windows[idx];
  if (w.state !== 'maximized') {
    w.prevRect = w.rect;
    w.rect = { x: 0, y: 0, w: 1, h: 1 };
    w.state = 'maximized';
    _bringToFront(idx);
    _replaceWindows([..._store.windows]);
  }
}

function restore(id) {
  const idx = _findIndex(id); if (idx < 0) return;
  const w = _store.windows[idx];
  w.state = 'normal';
  if (w.prevRect) {
    w.rect = _clampRect(w.prevRect);
    w.prevRect = undefined;
  }
  _bringToFront(idx);
  _replaceWindows([..._store.windows]);
}

function focus(id) {
  const idx = _findIndex(id); if (idx < 0) return;
  _bringToFront(idx);
  _replaceWindows([..._store.windows]);
}

/**
 * Move by normalized deltas (dx, dy) in [−1..1].
 * Conversion from pixels → normalized should be done by the Window component.
 */
function move(id, dx, dy) {
  const idx = _findIndex(id); if (idx < 0) return;
  const w = _store.windows[idx];
  w.rect = _clampRect({ ...w.rect, x: w.rect.x + dx, y: w.rect.y + dy });
  _replaceWindows([..._store.windows]);
}

/** Resize by normalized deltas (dw, dh); anchor is top-left unless you pre-adjust x/y externally. */
function resize(id, dw, dh) {
  const idx = _findIndex(id); if (idx < 0) return;
  const w = _store.windows[idx];
  w.rect = _clampRect({ ...w.rect, w: w.rect.w + dw, h: w.rect.h + dh });
  _replaceWindows([..._store.windows]);
}

/** Set rect directly (normalized). */
function setRect(id, rect) {
  const idx = _findIndex(id); if (idx < 0) return;
  _store.windows[idx].rect = _clampRect(rect);
  _replaceWindows([..._store.windows]);
}

/** Replace content/title/icon of an existing window. */
function updateMeta(id, meta = {}) {
  const idx = _findIndex(id); if (idx < 0) return;
  const w = _store.windows[idx];
  if (meta.title != null) w.title = meta.title;
  if (meta.icon != null) w.icon = meta.icon;
  if (meta.content != null) w.content = meta.content;
  _replaceWindows([..._store.windows]);
}

/** Remove a window entirely. */
function remove(id) {
  const idx = _findIndex(id); if (idx < 0) return;
  const next = [..._store.windows];
  next.splice(idx, 1);
  _replaceWindows(next);
}

/* ---------------------------
   Selectors (pure; non-mutating)
---------------------------- */

/** Returns windows as-is (unsorted). Sort at render time if needed. */
function getWindows() { return _store.windows; }

/** Convenience: sorted by z ascending for deterministic rendering order */
function getWindowsSorted() {
  return [..._store.windows].sort((a, b) => a.z - b.z);
}

/** Visible windows: normal or maximized (not minimized/closed). */
function visibleWindows() {
  return _store.windows.filter((w) => w.state === 'normal' || w.state === 'maximized');
}

/** Minimized windows (for taskbar). */
function minimizedWindows() {
  return _store.windows.filter((w) => w.state === 'minimized');
}

/** Any window in non-closed state (includes minimized). */
function isAnyOpen() {
  return _store.windows.some((w) => w.state !== 'closed');
}

/** Any window currently visible (normal/maximized). Useful for camera gating. */
function hasVisibleWindow() {
  return visibleWindows().length > 0;
}

/** Convenience getter */
function getById(id) {
  return _store.windows.find((w) => w.id === id);
}

/* ---------------------------
   React hook
---------------------------- */
/**
 * React hook: subscribe to the store and get memoized selectors & actions.
 * Optionally pass a projector to compute derived data.
 * @template T
 * @param {(windows: DesktopWindow[]) => T=} select
 * @returns {T & {actions: typeof actions, selectors: typeof selectors}}
 */
function useWindowManager(select) {
  // Subscribe to the windows array (stable ref between updates)
  const windows = useSyncExternalStore(_subscribe, _getSnapshot, _getSnapshot);

  // Project/derive if asked
  const derived = useMemo(
    () => (select ? select(windows) : { windows }),
    [windows, select]
  );

  const actions = useMemo(
    () => ({
      initWindows, open, close, minimize, maximize, restore, focus,
      move, resize, setRect, updateMeta, remove,
    }),
    []
  );

  const selectors = useMemo(
    () => ({
      getWindows,
      getWindowsSorted,
      visibleWindows,
      minimizedWindows,
      isAnyOpen,
      hasVisibleWindow,
      getById,
    }),
    []
  );

  return /** @type {any} */ ({ ...derived, actions, selectors });
}

/* ---------------------------
   Export grouped APIs
---------------------------- */
export const windowManager = {
  // actions
  initWindows, open, close, minimize, maximize, restore, focus,
  move, resize, setRect, updateMeta, remove,
  // selectors
  getWindows, getWindowsSorted, visibleWindows, minimizedWindows, isAnyOpen, hasVisibleWindow, getById,
};

export default useWindowManager;
