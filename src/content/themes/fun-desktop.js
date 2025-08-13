// src/content/themes/fun-desktop.js
// Fun Desktop — vibrant, glassy, enhanced XP energy.
// Designed to pair with the ThemeEngine’s nested tokens:
//  - window.header.ridge, window.controls.ripple, window.edgeRainbow
//  - taskbar.shimmer, rich motion & z layers

const funDesktop = {
  // ---------- 2D palette ----------
  colors: {
    // Cheerful “XP sky” background with a soft diagonal wash
    background:
      'linear-gradient(135deg, #b9e6ff 0%, #a7f3d0 35%, #fff7ae 70%, #ffd0d4 100%)',
    primary: '#1667ff',     // lively XP blue (frame accents)
    secondary: '#22c55e',   // leaf green
    accent: '#ffd166',      // warm sunshine
    text: '#0b1530',        // deep navy for contrast on white
    surface: 'rgba(255,255,255,0.72)',
  },

  // ---------- Desktop chrome: Window ----------
  // Goal: blue frame + white inner area, glassy and fun
  window: {
    // Content pane: bright glass (feels white)
    bg: 'rgba(255,255,255,0.86)',
    // Frame/edge: expressive blue border
    border: 'rgba(22,103,255,0.55)',
    backdropBlur: '16px',
    title: '#0b1530',
    radius: '20px',
    radiusMaximized: '8px',
    shadow: '0 30px 70px rgba(16, 36, 94, 0.35)',

    // Titlebar: glossy sky-blue → deeper blue fade
    header: {
      height: '44px',
      bg: 'linear-gradient(180deg, rgba(156,206,255,0.9) 0%, rgba(22,103,255,0.85) 100%)',
      // Subtle chrome “ridge” highlight line under the titlebar
      ridge:
        'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 15%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.8) 85%, rgba(255,255,255,0) 100%)',
    },

    // Button cluster on the right, with a playful ripple ink
    controls: {
      size: '28px',
      gap: '8px',
      ripple: 'rgba(22,103,255,0.30)', // used by CSS decorations
    },

    // Classic XP-ish colors for window controls
    icon: {
      close: '#ef4444', // red X (explicitly requested)
      min: '#f59e0b',   // warm amber underscore
      max: '#10b981',   // green maximize
    },

    resizer: { size: '12px', hitArea: '14px' },

    // Optional rainbow border sheen for the frame (border-image)
    // (If you wire it in CSS, this gives a subtle color sweep at edges)
    edgeRainbow:
      'linear-gradient(135deg, #4cc9f0, #43e97b, #fee140, #ff4d6d) 1',
  },

  // ---------- Desktop chrome: Taskbar ----------
  taskbar: {
    // Glassy teal → blue gradient, with shimmer overlay
    bg: 'linear-gradient(180deg, rgba(0,175,236,0.35) 0%, rgba(20,110,255,0.38) 100%)',
    shimmer:
      'linear-gradient(90deg, rgba(76,201,240,.15), rgba(67,233,123,.15), rgba(254,225,64,.15), rgba(245,81,81,.15))',
    border: 'rgba(255,255,255,0.18)',
    height: '64px',
    text: '#0b1530',
    icon: '#0b1530',
    blur: '14px',
    gap: '10px',
    button: {
      // Soft glass buttons with lively hover
      bg: 'rgba(255,255,255,0.50)',
      hoverBg: 'rgba(255,255,255,0.75)',
      activeBg: 'rgba(255,255,255,0.60)',
      radius: '14px',
      padding: '10px 14px',
    },
    mainButton: {
      // “Main Window” CTA with blue focus
      bg: 'rgba(22,103,255,0.24)',
      hoverBg: 'rgba(22,103,255,0.36)',
      text: '#0b1530',
      icon: '#0b1530',
    },
  },

  // ---------- Motion & layers ----------
  motion: {
    'duration-fast': '120ms',
    'duration-normal': '220ms',
    'duration-slow': '340ms',
    'easing-standard': 'cubic-bezier(0.2, 0.0, 0, 1)',
    'easing-emphasized': 'cubic-bezier(.2,.8,.2,1)',
  },
  z: {
    windows: 22,
    taskbar: 30,
    overlay: 40,
  },

  // ---------- 3D materials (nice gloss) ----------
  materials: {
    metalness: 0.12,
    roughness: 0.35,
    envIntensity: 1.15,
    clearcoat: 0.55,
    clearcoatRoughness: 0.18,
  },

  // ---------- Scene lighting (bright & optimistic) ----------
  lighting: {
    env: 1.25,
    ambient: 0.6,
    hemisphereSky: '#cfe7ff',
    hemisphereGround: '#90c9b7',
    dir1Intensity: 1.35,
    dir1Color: '#fff1c7',
    dir1X: -0.6,
    dir1Y: 1.2,
    dir1Z: 0.5,
    toneMapping: 'ACESFilmic',
    exposure: 1.05,
  },
};

export default funDesktop;
