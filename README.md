# Portfolio 3D Engine - README v0.0.2

## 🚀 Project Overview

This project is a **modular, interactive 3D portfolio site** built with React, Three.js, and @react-three/fiber, designed to showcase diverse creative work in an immersive, gamified environment.

> Think of it like a tiny custom 3D game engine — but for storytelling who you are as a multidisciplinary creative developer.

It blends **hybrid JSX/MDX content**, **dynamic 3D scenes**, and **themeable UI/UX** to enable flexible storytelling through projects, research, media, and more.

Hosted on GitHub Pages, it’s fully static, easily updatable, and reflects your professional identity through interaction, polish, and imagination.

---

## 🎯 Purpose & Vision

* **Audience**: Employers, collaborators, and curious visitors
* **Tone**: Playful but disciplined, stylish but technical
* **Goal**: Communicate your depth as a developer through experience-rich, interactive pages
* **Future**: Power future portfolio sections, galleries, themed research sites, and even business websites

---

## 🧠 Philosophy

* **Built like a game engine**: Modular components, flexible architecture, real-time feel
* **Hybrid content**: Interactive JSX + flexible MDX for frequent updates
* **Playable storytelling**: Interactions, animations, environments reflect personality
* **Professional first**: Built to impress employers who value creativity

---

## 🧱 Current Structure

### Root Directory

```
PortfolioPage/
├── assets/                         # Static global assets
├── dist/                           # Vite build output
├── GravityFallsResearchAssets/    # Assets specific to GF research page
├── node_modules/                  # Dependencies
├── src/                           # App source code
│   ├── components/                # React + R3F components
│   ├── content/                   # Themes and static content
│   ├── core/                      # Central engines like theming
│   ├── hooks/                     # Custom React hooks
│   ├── pages/                     # All JSX pages (landing, research, gallery, etc)
│   ├── styles/                    # Tailwind + custom styles
│   └── utils/                     # Content loaders, helpers
├── index.html                     # HTML entry point
├── package.json                   # Project dependencies
├── README.md                      # This file
└── vite.config.js                 # Vite configuration
```

### Components Directory Breakdown

```
src/components/
├── content/           # MDX renderer + dynamic content routing/layout (PARTIAL, INCOMPLETE)
├── layout/            # App-level layout (e.g., <ThreeCanvas/>)
└── three-d/           # All 3D components, organized into:
    ├── base/          # Base3DComponent, Animated3D, Interactive3D
    ├── primitives/    # Cube, Sphere, Plane, Pyramid
    ├── wireframes/    # Wireframe versions of all primitives
    ├── containers/    # TextContainer3D, ImageContainer3D, CardContainer3D, MarkdownCard (LEGACY)
    ├── interactive/   # ClickableCube, HoverSphere, DraggablePyramid
    └── compositions/  # High-level 3D compositions (e.g., ProjectShowcase)
```

---

## 🔧 Tech Stack

```
React 18 + React Router DOM 6
Three.js + @react-three/fiber + @react-three/drei
Tailwind CSS 3 + PostCSS
Vite for dev/build
Hosted on GitHub Pages
```

---

## ✅ What We Have (v0.0.1)

* Modular 3D component system (Base3DComponent, containers, compositions)
* Theme engine with multiple predefined themes and CSS custom property injection
* Gravity Falls Research site with themed 3D pages
* Landing page with 3D canvas
* Some setup for MDX/JSX integration (NOT YET WORKING)
* Some navigation structure and router setup (PARTIAL)
* Basic mobile layout (INCOMPLETE/BUGGY)

---

## ❌ What Doesn’t Work (Yet)

* MDX integration: existing files do not currently support full 3D/JSX usage inside `.mdx`
* Navigation: routing issues on GitHub Pages, lack of breadcrumbs, unreliable mobile nav
* Mobile design: layout issues due to hardcoded 3D positions, poor scaling
* Tagging system: not implemented at all
* Auto-generated Cards from MDX: not yet functional
* Video/Audio embedding in MDX: not supported
* 3D Carousel Viewer: not built yet
* PDF viewer and generator: not yet implemented
* 3D model loading: no OBJ/GLTF import capability yet
* Physics (e.g., palm trees responding to clicks): not implemented

---

## 🧭 Navigation Philosophy (Target Design)

* Page navigation is currently buggy (especially with GitHub Pages routing quirks)
* Needs fix for proper relative routing, mobile-friendly back buttons, and breadcrumb logic
* Desired structure:

  * `/` → Landing
  * `/gallery` → 3D carousel of cards
  * `/interests` → Feed of articles/papers (MDX driven)
  * `/gravity-falls-research` → Archived project hub
  * `/project/:slug` → MDX project pages

---

## 🏷 Tagging System (Planned)

Each MDX page will have `tags` (in frontmatter or metadata):

* **Public Tags**: Displayed on cards (e.g., `unity`, `audio`, `esp32`)
* **Private Tags**: Used internally for sorting/filtering or PDF generation

Each tag is typed:

* **String** (e.g., `language: javascript`)
* **Integer** (e.g., `collaborators: 4`)
* **Link** (e.g., `paper: [url]`)

Use cases:

* Card generation
* Resume building (PDFs)
* Filters in Gallery

---

## 🗺 Roadmap: v0.0.2 to v0.1.0

### ✅ Phase 0 - README + Audit

* [x] Comprehensive README
* [ ] Architecture.md or inline documentation

### 🛠 Phase 1 - Stability + Core Features

* [ ] **Fix navigation bugs** (redirects, 404, routing logic)
* [ ] **Mobile-friendly layout engine** (ratios, breakpoints, anchors)
* [ ] **MDX pipeline overhaul** (true support, shared 3D components)
* [ ] **Tag system with types**

### 📚 Phase 2 - Content + Showcase

* [ ] Video + Audio player support (preferably via MDX-compatible wrapper)
* [ ] Transitionary 3D `Card` components (auto-generated from MDX)
* [ ] Carousel viewer with physics/light motion
* [ ] PDF Viewer for research, reports

### 🌴 Phase 3 - Atmosphere + Immersion

* [ ] Load OBJ/GLTF models
* [ ] Add environmental FX (skybox, palm trees, water shader)
* [ ] Add soft physics for interactions
* [ ] Auto-resume generator using tag data
* [ ] Mini game page (bonus fun)

---

## 📄 Build Commands

```bash
npm run dev         # Start local dev server
npm run build       # Production build
npm run preview     # Preview prod build
npm run deploy      # Deploy to GitHub Pages
```

---

## 👋 Contributing & Working With AI

This project is developed by a single developer with support from AI tools (LLMs). All AI agents must reference this README when assisting on this repo. Always ensure changes:

* Follow the project structure
* Respect hybrid JSX/MDX design
* Preserve theming and responsiveness
* Are documented before commit

---

## 📚 Tips for Future Development

* Place static assets in `/public/` or `/assets/`
* Use `setTheme()` inside `useEffect()` in all new JSX pages
* Use shared components via `@/components/...` alias if added
* Future devs: read `ThemeEngine.js` to understand theming structure

---

## 🧠 About You (the Developer)

This portfolio is a reflection of a multidimensional creative coder — someone who builds games, tools, models, audio, visual design systems, and more. It’s your digital playground, resume, museum, and sketchbook.

> If a hiring manager says “this is too much,” they weren’t the right one anyway.

---

## 📎 Final Notes

* Gravity Falls site remains fully functional and is now its own archive page
* MDX, tagging, and dynamic content generation are top priorities
* Resume generation via tag-mapped pages = a huge productivity hack
* Most of all: have fun. You're building something awesome and personal
