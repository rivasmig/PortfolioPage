# Portfolio 3D Engine - README v0.0.4

## 🚀 Project Overview

This project is a **modular, interactive 3D portfolio site** built with React, Three.js, and @react-three/fiber, designed to showcase diverse creative work in an immersive, gamified environment.

> Think of it like a tiny custom 3D game engine — but for storytelling who you are as a multidisciplinary creative developer.

It blends **hybrid JSX/MDX content**, **dynamic 3D scenes**, and **themeable UI/UX** to enable flexible storytelling through projects, research, media, and more.

Hosted on GitHub Pages, it's fully static, easily updatable, and reflects your professional identity through interaction, polish, and imagination.

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

```
PortfolioPage/
├── assets/                         # Static global assets
├── dist/                           # Vite build output
├── GravityFallsResearchAssets/    # Assets specific to GF research page
├── node_modules/                  # Dependencies
├── projects/                      # MDX-driven project content
├── interests/                     # MDX-driven research content
├── src/                           # App source code
│   ├── components/                # React + R3F components
│   ├── content/                   # Themes and static content
│   ├── core/                      # Central engines like theming
│   ├── hooks/                     # Custom React hooks
│   ├── pages/                     # Routable pages and MDX routers
│   ├── styles/                    # Tailwind + custom styles
│   └── utils/                     # Content loaders, helpers
├── index.html                     # HTML entry point
├── package.json                   # Project dependencies
├── README.md                      # This file
└── vite.config.js                 # Vite configuration
```

---

## 🔧 Tech Stack

```
React 18 + React Router DOM 6 (HashRouter for GitHub Pages)
Three.js + @react-three/fiber + @react-three/drei
Tailwind CSS 3 + PostCSS
Vite for dev/build
Hosted on GitHub Pages
MDX with @mdx-js/rollup and @mdx-js/react
Remark plugins for frontmatter
```

---

## ✅ What We Have (v0.0.4)

* ✅ **Full MDX integration**: Complete pipeline with React component support, video embeds, interactive demos
* ✅ **Dynamic routing**: Any `.mdx` file in `projects/` or `interests/` folders automatically becomes a route
* ✅ **Tag system operational**: Validation, filtering, and card generation working in Gallery and Interests
* ✅ **Real content loading**: File system integration replaces mock data for MDX-driven cards
* ✅ **Stable routing system**: Centralized routing with dynamic MDX routers
* ✅ **GitHub Pages compatibility**: Hash-based routing prevents 404s on deep links
* ✅ **Theme registration timing**: Themes load before render, no "theme not found" errors
* Modular 3D component system (Base3DComponent, containers, compositions)
* Gravity Falls Research archive pages
* Landing page with 3D canvas
* Basic mobile layout (INCOMPLETE)

---

## ❌ What Doesn’t Work (Yet)

* **Mobile responsiveness**: MDX pages need layout refinement and breakpoints
* **3D integration in MDX**: Bringing custom 3D components into MDX files
* **Theme auto-registration**: Dynamically loading themes from `/content/themes`
* **Advanced card interactions**: Tag-based 3D positioning and physics

---

## 🧭 Navigation Structure

* `/#/` → Landing
* `/#/gallery` → Project list with tag filtering (WORKING)
* `/#/interests` → Research articles list (WORKING)
* `/#/project/:slug` → Individual project pages (MDX-driven)
* `/#/interest/:slug` → Individual research pages (MDX-driven)

Future improvements:

* Normalize URL casing
* Breadcrumb navigation
* Mobile navigation patterns

---

## 🏷 Tagging System

Each MDX page uses frontmatter tags for:

* **Public Tags**: Displayed on cards (e.g., `unity`, `audio`, `esp32`)
* **Private Tags**: Internal use for sorting, filtering, PDF generation

Tag types:

* **String** (e.g., `language: javascript`)
* **Integer** (e.g., `collaborators: 4`)
* **Link** (e.g., `paper: [url]`)

Use cases:

* Card generation in Gallery/Interests
* Resume PDF generation
* Client filtering controls

---

## 🗺 Roadmap: v0.0.4 to v0.1.0

### 🚀 Phase 1 – Core Enhancements

* [ ] **Mobile responsiveness** – refine MDX layouts and breakpoints
* [ ] **3D in MDX** – integrate `three-d` components into MDX content
* [ ] **Theme auto-registration** – dynamic theme loading
* [ ] **Advanced card interactions** – physics and spatial placement

### 📚 Phase 2 – Content & Showcase

* [ ] Video + Audio wrappers in MDX
* [ ] 3D carousel viewer with light physics
* [ ] PDF viewer and auto-generated resume

### 🌴 Phase 3 – Atmosphere & Immersion

* [ ] OBJ/GLTF model loading
* [ ] Environmental FX (skybox, shaders)
* [ ] Soft physics for interactive scenes
* [ ] Mini game integration

---

## 📄 Build & Deploy

```bash
npm run dev         # Start local dev server
npm run build       # Production build
npm run preview     # Preview prod build
npm run deploy      # Deploy to GitHub Pages
```

***Note:** `vite.config.js` includes `base: '/PortfolioPage/'` and uses `HashRouter` for reliable GitHub Pages routing.*

---

## 👋 Contributing & AI Agents

This project is developed by a single developer with AI tooling support. All contributors and AI agents must:

* Reference this README for structure and conventions
* Preserve hybrid JSX/MDX design and theming
* Ensure routing consistency and GitHub Pages compatibility
* Test both local and production builds
* Document changes before commit

---

## 📚 Tips for Future Development

* Place static assets in `/public/` or `/assets/`
* Use `setTheme()` inside `useEffect()` in new pages
* Import shared components via `@/components/...` alias
* Add routes in `Router.jsx` first, matching URL patterns
* Review `ThemeEngine.js` for theming workflow

---

## 🔄 Recent Changes (v0.0.4)

* MDX pipeline fully implemented with React, frontmatter, and custom components
* Dynamic MDX routing for projects and interests
* Tag validation, filtering, and real-file integration
* Enhanced theme integration for MDX content

*Enjoy building!*
