// src/core/ThemeEngine.js
/**
 * ThemeEngine - Manages dynamic theme switching for the entire site.
 * Handles:
 *  • 2D UI tokens (colors/typography/motion)
 *  • Desktop chrome (window/taskbar)
 *  • 3D material / lighting tokens (R3F)
 *
 * Exposed helpers: window.setTheme(name), window.getTheme()
 */

class ThemeEngine {
  constructor() {
    this.currentTheme = 'frutiger-aero';
    this.themes = new Map();
    this.listeners = new Set();

    // Rich defaults (safe fallbacks + the new fun-desktop extras)
    this.defaults = {
      colors: {
        primary: '#2c3e50',
        secondary: '#e67e22',
        accent: '#f1c40f',
        text: '#ffffff',
        surface: 'rgba(255,255,255,0.08)',
        // Optional page background (gradient OK)
        // background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
      },

      window: {
        bg: 'rgba(15,18,24,0.40)',
        border: 'rgba(255,255,255,0.18)',
        backdropBlur: '12px',
        title: '#ffffff',
        radius: '20px',
        radiusMaximized: '0px',
        shadow: '0 10px 30px rgba(0,0,0,0.35)',
        outline: { focused: 'rgba(99,102,241,0.6)', width: '2px' },
        header: {
          height: '42px',
          bg: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))',
          ridge: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
        },
        controls: {
          size: '28px',
          gap: '6px',
          ripple: 'rgba(47,134,246,0.35)', // for fun-desktop ripple
        },
        icon: {
          close: '#ef4444',
          min: '#f59e0b',
          max: '#10b981',
        },
        resizer: { size: '12px', hitArea: '12px' },

        // Optional colorful border sheen (fun-desktop)
        edgeRainbow: 'none', // e.g., 'linear-gradient(135deg,#4cc9f0,#43e97b,#fee140,#ff4d6d) 1'
      },

      taskbar: {
        bg: 'rgba(8,10,14,0.55)',
        border: 'rgba(255,255,255,0.12)',
        height: '64px',
        text: '#ffffff',
        icon: '#ffffff',
        blur: '12px',
        gap: '10px',
        button: {
          bg: 'rgba(255,255,255,0.06)',
          hoverBg: 'rgba(255,255,255,0.12)',
          activeBg: 'rgba(255,255,255,0.18)',
          radius: '10px',
          padding: '10px 12px',
        },
        mainButton: {
          bg: 'rgba(59,130,246,.18)',
          hoverBg: 'rgba(59,130,246,.28)',
          text: '#e6e8ef',
          icon: '#e6e8ef',
        },
        // Optional soft colorful shimmer layer
        shimmer:
          'linear-gradient(90deg, rgba(76,201,240,.12), rgba(67,233,123,.12), rgba(254,225,64,.12), rgba(245,81,81,.12))',
      },

      motion: {
        'duration-fast': '120ms',
        'duration-normal': '200ms',
        'duration-slow': '320ms',
        'easing-standard': 'cubic-bezier(0.2, 0.0, 0, 1)',
        'easing-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
      },

      z: {
        windows: 20,
        taskbar: 30,
        overlay: 40,
      },

      materials: {},
      lighting: {},
    };

    const saved = this._safeLocalGet('portfolio-theme');
    if (saved) this.currentTheme = saved;

    if (typeof window !== 'undefined') {
      window.setTheme = (name) => this.setTheme(name);
      window.getTheme = () => this.getCurrentThemeName();
    }
  }

  /** Register a theme (merged over defaults). If it’s the current one, apply immediately. */
  registerTheme(name, themeConfig) {
    const merged = this._deepMerge(this.defaults, themeConfig || {});
    this.themes.set(name, merged);
    if (name === this.currentTheme || this.themes.size === 1) {
      this.applyTheme();
    }
  }

  /** Switch to a theme by name. */
  setTheme(themeName) {
    if (!this.themes.has(themeName)) {
      console.warn(`Theme "${themeName}" not found. Available:`, Array.from(this.themes.keys()));
      return;
    }
    this.currentTheme = themeName;
    this._safeLocalSet('portfolio-theme', themeName);
    this.applyTheme();
    this._notify();
  }

  /** Get current theme config (merged). */
  getCurrentTheme() {
    return this.themes.get(this.currentTheme) || this.defaults;
  }

  getCurrentThemeName() {
    return this.currentTheme;
  }

  getAvailableThemes() {
    return Array.from(this.themes.keys());
  }

  /** Apply current theme → document CSS variables (incl. derived tokens). */
  applyTheme() {
    if (typeof document === 'undefined') return;
    const theme = this.getCurrentTheme();
    const root = document.documentElement;

    // --- Flat sections
    this._applyFlatVars(root, theme.colors, '--color-');
    this._applyFlatVars(root, theme.materials, '--material-');
    this._applyFlatVars(root, theme.lighting, '--lighting-');
    this._applyFlatVars(root, theme.motion, '--motion-');
    this._applyFlatVars(root, theme.z, '--z-');

    // --- Nested (window/taskbar) → kebab vars
    this._applyNested(root, theme.window, 'window');   // --window-*
    this._applyNested(root, theme.taskbar, 'taskbar'); // --taskbar-*

    // --- Derived / convenience vars for CSS (only set if not already present)
    this._applyDerived(root, theme);

    // --- Optional: apply page background if theme provides colors.background
    if (theme.colors && theme.colors.background) {
      document.body.style.background = String(theme.colors.background);
    }

    // --- Theme class on body for targeting
    if (document.body) {
      [...document.body.classList].forEach((c) => c.startsWith('theme-') && document.body.classList.remove(c));
      document.body.classList.add(`theme-${this.currentTheme}`);
      document.body.setAttribute('data-theme', this.currentTheme);
    }

    return theme;
  }

  /** Subscribe to changes (returns unsubscribe). */
  subscribe(cb) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  /** Path getter with fallback, e.g., getThemeProperty('window.icon.close') */
  getThemeProperty(path, fallback = null) {
    const theme = this.getCurrentTheme();
    const val = path.split('.').reduce((obj, key) => (obj && obj[key] != null ? obj[key] : undefined), theme);
    return val === undefined ? fallback : val;
  }

  // ---------------------
  // Helpers
  // ---------------------

  _notify() {
    const name = this.currentTheme;
    const cfg = this.getCurrentTheme();
    this.listeners.forEach((cb) => {
      try { cb(name, cfg); } catch (e) { console.error('Theme listener error:', e); }
    });
  }

  _applyFlatVars(root, obj = {}, prefix = '--') {
    Object.entries(obj || {}).forEach(([k, v]) => {
      root.style.setProperty(`${prefix}${this._toKebab(k)}`, String(v));
    });
  }

  _applyNested(root, obj = {}, section = '') {
    const walk = (node, path = []) => {
      Object.entries(node || {}).forEach(([k, v]) => {
        const nextPath = [...path, this._toKebab(k)];
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          walk(v, nextPath);
        } else {
          const varName = `--${section}-${nextPath.join('-')}`;
          root.style.setProperty(varName, String(v));
        }
      });
    };
    walk(obj, []);
  }

  /** Ensure helpful CSS vars exist even if a theme didn’t set them explicitly. */
  _applyDerived(root, theme) {
    const setIfMissing = (name, value) => {
      if (!root.style.getPropertyValue(name)) root.style.setProperty(name, String(value));
    };

    // Window hover background fallback
    setIfMissing('--window-btn-hover', 'rgba(255,255,255,0.08)');

    // Focused outline fallback
    setIfMissing('--window-outline-focused', theme.window?.outline?.focused ?? 'rgba(99,102,241,.6)');
    setIfMissing('--window-outline-width', theme.window?.outline?.width ?? '2px');

    // Maximized radius helper
    setIfMissing('--window-radius-maximized', theme.window?.radiusMaximized ?? '0px');

    // Ripple + ridge + edge rainbow helpers for Fun-Desktop
    setIfMissing('--window-controls-ripple', theme.window?.controls?.ripple ?? 'rgba(47,134,246,0.35)');
    setIfMissing('--window-header-ridge', theme.window?.header?.ridge ?? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)');
    setIfMissing('--window-edge-rainbow', theme.window?.edgeRainbow ?? 'none');

    // Taskbar shimmer helper
    setIfMissing('--taskbar-shimmer', theme.taskbar?.shimmer ?? 'transparent');

    // Z-index fallbacks (in case theme.z omitted)
    setIfMissing('--z-windows', theme.z?.windows ?? 20);
    setIfMissing('--z-taskbar', theme.z?.taskbar ?? 30);
    setIfMissing('--z-overlay', theme.z?.overlay ?? 40);
  }

  _toKebab(str) {
    return String(str)
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  _deepMerge(base, patch) {
    if (patch == null) return base ?? {};
    if (base == null) return patch;
    if (Array.isArray(base) || Array.isArray(patch)) return patch ?? base;

    const out = { ...base };
    Object.entries(patch).forEach(([k, v]) => {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        out[k] = this._deepMerge(base[k], v);
      } else {
        out[k] = v;
      }
    });
    return out;
  }

  _safeLocalGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  _safeLocalSet(key, val) {
    try { localStorage.setItem(key, val); } catch {}
  }
}

// Global singleton
export const themeEngine = new ThemeEngine();
export default ThemeEngine;
