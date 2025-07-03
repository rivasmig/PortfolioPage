# Portfolio 3D Engine

A **modular, interactive 3D portfolio site** built with React, Three.js, and MDX that showcases creative work in an immersive, gamified environment.

> Think of it like a tiny custom 3D game engine — but for storytelling who you are as a multidisciplinary creative developer.

**Live Site**: [Portfolio 3D Engine](https://rivasmig.github.io/PortfolioPage/) • **Version**: v0.0.5

---

## 🎯 What This Is

This portfolio blends **interactive 3D scenes**, **dynamic MDX content**, and **themeable experiences** to create something more engaging than a traditional portfolio site. It's built like a game engine with modular components, flexible architecture, and real-time feel.

### Key Features

✨ **Interactive MDX Projects** - Full project pages with embedded media, galleries, and interactive components  
🎮 **3D Components** - Modular Three.js components for immersive experiences  
🎨 **Theming** - Switch between visual styles (Frutiger Aero, Gravity Falls, Minimal)  
📱 **Tag-Based Organization** - Smart filtering and categorization system  
🚀 **GitHub Pages Ready** - Fully static with hash-based routing  

---

## 🗂 What's Inside

The site is organized around two main content types:

### **Projects** (`/#/gallery`)
Showcases my creative work with MDX pages featuring:
- Interactive image galleries and media embeds
- Progress tracking and feature lists
- Custom styling and animations
- YouTube videos, SoundCloud audio, external links

### **Research & Interests** (`/#/interests`)
Documenting my research, studies, and explorations:
- Academic work and papers
- Learning projects and experiments
- Technical deep-dives and case studies

Each piece of content is an `.mdx` file with frontmatter tags that drive the filtering, card generation, and routing systems.

---

## 🛠 Tech Overview

```
React 18 + React Router + Three.js + MDX + Tailwind CSS
```

- **React Router DOM 6** - Hash-based routing for GitHub Pages compatibility
- **@react-three/fiber + drei** - 3D components and scenes  
- **MDX Pipeline** - Frontmatter-driven content with React component support
- **Tailwind CSS** - Utility-first styling with custom theme system
- **Vite** - Fast development and optimized builds

**Adding Content:**
1. Create `.mdx` files in `/projects/` or `/interests/`
2. Add frontmatter with tags and metadata
3. Use React components within your content
4. Site automatically generates routes and cards

---

## 🧭 Current Status (v0.0.5)

### ✅ **What Works**
- **Production-ready MDX showcase** with complex interactive components
- **Working navigation system** using React Router with theme persistence
- **Temporary tag system** for filtering and organization
- **GitHub Pages deployment** with reliable routing
- **Theme engine** with multiple visual styles

### 🚧 **In Progress**
- **Mobile responsiveness** - MDX layouts need breakpoint optimization
- **Full Tag Integration** - A larger list of tags and potential interactions between tags
- **3D component integration** - Bringing Three.js components into MDX files  
- **Performance optimization** - Bundle size and loading improvements

### 📋 **Planned**
- **More project examples** - Additional MDX showcases
- **Advanced 3D features** - Physics, environmental effects, model loading
- **Enhanced mobile experience** - Touch interactions and responsive layouts
- **Automated Features** - auto generating pdfs, auto updating pages, overal ease of use

---

## 📖 Documentation

For comprehensive information about working with this project:

**For Developers & Contributors:**
- `/docs/AGENT_QUICKSTART.md` - Quick context for AI agents and new contributors
- `/docs/knowledge/` - Detailed technical documentation
- `/docs/logs/` - Development history and change logs

**For Content Creators:**
- `/docs/knowledge/workflows/adding-projects.md` - How to add new projects
- `/docs/knowledge/workflows/creating-themes.md` - Custom theme development
- `/docs/knowledge/components/` - Available React components for MDX

---

## 🎨 Themes & Customization

The site includes multiple visual themes that completely transform the look and feel:

- **Frutiger Aero** - Glossy, translucent early-2000s aesthetic
- **Gravity Falls** - Mystery/adventure theme with custom styling
- **Minimal** - Clean, modern professional look

Themes affect everything from color palettes to component styling and can be easily extended or customized.

---

## 🏗 Architecture Highlights

### **Modular 3D System**
- `Base3DComponent` - Foundation for all 3D elements `src/components/three-d/base`
- Organized by function: `primitives/`, `interactive/`, `compositions/`
- Easy to extend with new Three.js components

### **MDX Content Pipeline**  
- Frontmatter-driven metadata and tags
- React component support within content
- Automatic route generation from files
- Smart external link handling

### **Theme Engine**
- CSS variable-based theming system
- Component-level theme integration
- Runtime theme switching

### **Tag System**
- Public tags (displayed on cards)
- Private tags (internal filtering)
- Validation and filtering logic
- Future: 3D spatial positioning via interactions

## 📄 License & Usage

This project is designed as a portfolio page for myself, but feel free to fork, modify, and adapt for your own creative portfolio needs.

---

## 🔮 Vision

This isn't just a portfolio site—it's a foundation for interactive storytelling about creative work. The modular architecture supports future expansions into:

- **Interactive galleries** with 3D navigation
- **Mini-games** that showcase technical skills  
- **Immersive experiences** that blend code, art, and interaction
- **Dynamic content** that evolves with your work

**Goal**: Create portfolio experiences that are as engaging and memorable as the work they showcase.

---