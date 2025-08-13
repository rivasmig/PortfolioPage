// src/content/themes/dark-desktop.js
// Dark Desktop – glassy windows, soft shadows, sunset-accent palette.
// Works with the enhanced ThemeEngine that flattens nested tokens into CSS vars.

const darkDesktop = {
  // -------- 2D palette --------
  colors: {
    primary: '#2c3e50',   // dusk blue
    secondary: '#e67e22', // sunset orange
    accent: '#f1c40f',    // golden highlight
    text: '#E6EAF2',
    surface: 'rgba(255,255,255,0.06)',
  },

  // -------- Desktop chrome: Windows --------
  window: {
    bg: 'rgba(16,18,24,0.42)',           // semi-transparent glass
    border: 'rgba(255,255,255,0.14)',
    backdropBlur: '14px',
    title: '#F3F6FC',
    radius: '22px',
    shadow: '0 20px 60px rgba(0,0,0,0.45)',
    // Traffic-light controls
    icon: { close: '#ef4444', min: '#f59e0b', max: '#10b981' },
    // Helpful extras for your components (become CSS vars like --window-header-height)
    header: { height: '42px', bg: 'rgba(255,255,255,0.04)' },
    controls: { size: '12px', gap: '10px', hoverOpacity: '0.9' },
    // Resizer + focus accents
    outline: { focused: 'rgba(241,196,15,0.35)', width: '2px' },
    resizer: { size: '10px', hitArea: '12px' },
  },

  // -------- Desktop chrome: Taskbar --------
  taskbar: {
    bg: 'rgba(10,12,18,0.65)',
    border: 'rgba(255,255,255,0.10)',
    height: '64px',
    text: '#E6EAF2',
    icon: '#E6EAF2',
    blur: '10px',
    gap: '8px',
    button: {
      bg: 'rgba(255,255,255,0.06)',
      hoverBg: 'rgba(255,255,255,0.12)',
      activeBg: 'rgba(255,255,255,0.18)',
      radius: '14px',
      padding: '10px 14px',
    },
    mainButton: {
      // “Main Window” button appearance
      bg: 'rgba(236, 180, 44, 0.15)',
      hoverBg: 'rgba(236, 180, 44, 0.25)',
      text: '#f1c40f',
      icon: '#f1c40f',
    },
  },

  // -------- Motion & layering --------
  motion: {
    'duration-fast': '140ms',
    'duration-normal': '220ms',
    'duration-slow': '340ms',
    'easing-standard': 'cubic-bezier(0.2, 0, 0, 1)',
    'easing-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
  },
  z: {
    windows: 20,
    taskbar: 30,
    overlay: 40,
  },

  // -------- 3D materials (read via CSS vars in your R3F components) --------
  materials: {
    metalness: 0.15,
    roughness: 0.45,
    envIntensity: 1.0,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
  },

  // -------- Scene lighting defaults --------
  lighting: {
    env: 1.2, // HDRI intensity
    ambient: 0.6,
    hemisphereSky: '#9fb2ff',
    hemisphereGround: '#0d1117',
    dir1Intensity: 1.4,
    dir1Color: '#ffd3a1',
    dir1X: -0.8,
    dir1Y: 1.3,
    dir1Z: 0.6,
    toneMapping: 'ACESFilmic',
    exposure: 1.0,
  },
};

export default darkDesktop;
