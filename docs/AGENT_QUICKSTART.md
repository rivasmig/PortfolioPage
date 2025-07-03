# AI Agent Quickstart Guide

**Project**: Portfolio 3D Engine | **Type**: React + Three.js + MDX Portfolio Website

> **Context**: You're working on a production-ready 3D portfolio system with excellent architecture. The core systems work well - most tasks involve adding content, enhancing features, or fixing specific issues.

---

## 🏗️ Project Overview

**Purpose**: Interactive 3D portfolio showcasing projects and research through MDX content  
**Architecture**: React SPA with hash routing, dynamic MDX loading, comprehensive theming, 3D integration  
**Deployment**: GitHub Pages static hosting  
**Content**: Projects and research articles as `.mdx` files with frontmatter metadata

---

## 📁 Critical File Reference

### **Core Systems (Don't Break These)**
- `src/Router.jsx` - Main routing system with dynamic MDX loading
- `src/core/ThemeEngine.js` - Theme management with CSS variables + 3D integration
- `src/hooks/useMDXContent.js` - React hook for content loading and filtering
- `src/utils/mdxLoader.js` - Real MDX file processing (NOT demo code)

### **Page Components (Working Systems)**
- `src/pages/Gallery.jsx` - Project listing with tag filtering (uses useMDXContent)
- `src/pages/Interests.jsx` - Research listing with statistics (uses useMDXContent)
- `src/pages/LandingPage.jsx` - 3D home page with navigation
- `src/App.jsx` - Theme registration and simple landing

### **Component Libraries**
- `src/components/cards/BaseCard.jsx` - Universal card with inheritance pattern
- `src/components/cards/ProjectCard.jsx` - Extends BaseCard for projects
- `src/components/cards/InterestCard.jsx` - Extends BaseCard for research
- `src/components/layout/ThreeCanvas.jsx` - 3D scene wrapper with theme integration
- `src/components/three-d/base/Base3DComponent.jsx` - Foundation for all 3D objects

### **Content System**
- `src/utils/content/mdx-components.jsx` - Registers ALL 3D components for MDX use
- `src/utils/content/MDXRenderer.jsx` - MDX rendering wrapper
- `src/pages/projects/` - Directory for `.mdx` project files
- `src/pages/interests/` - Directory for `.mdx` research files

### **Configuration**
- `src/core/tags/tags.js` - All valid content tags with validation
- `src/content/themes/` - Theme definitions (JS files with colors + 3D properties)
- `src/styles/globals.css` - Base CSS + theme-specific styling

---

## 🛠️ Common Tasks

### **Adding Content**
1. Create `.mdx` file in `src/pages/projects/` or `src/pages/interests/`
2. Include frontmatter with `title`, `description`, `tags`, and `private` metadata
3. Router.jsx automatically creates routes for any `.mdx` file
4. Use any 3D component from mdx-components.jsx in content

### **Working with Themes**
- Themes are JS objects that set CSS variables and 3D material properties
- Register new themes in App.jsx with `themeEngine.registerTheme()`
- Set theme in pages with `useTheme()` hook: `setTheme('theme-name')`
- All styled elements automatically use CSS variables like `--color-primary`

### **3D Components**
- All 3D components inherit from Base3DComponent for consistent behavior
- Available in MDX: `<Cube />`, `<Sphere />`, `<Scene>`, `<Interactive3D />`
- ThreeCanvas provides scene setup with automatic theme integration
- Mobile optimization built into ThreeCanvas and Base3DComponent

### **Content Processing**
- useMDXContent hook provides: content, projects, interests, loading states
- mdxLoader.js handles file loading, frontmatter parsing, tag validation
- Tag system (tags.js) validates metadata and provides filtering
- Cards automatically render from content hook data

---

## 🚨 Critical Don'ts

- **Don't modify Router.jsx** without understanding MDX loading system
- **Don't break useMDXContent hook** - Gallery/Interests depend on it
- **Don't alter card inheritance** - BaseCard → ProjectCard/InterestCard pattern is clean
- **Don't hardcode colors** - use CSS variables from theme system
- **Don't assume missing directories** - projects/ and interests/ are in src/pages/

---

## 🔍 Understanding the Architecture

### **Content Flow**
```
.mdx files → mdxLoader.js → useMDXContent hook → Gallery/Interests pages → Cards render
```

### **Theme Flow**
```
Theme JS → ThemeEngine → CSS variables → All components use variables → 3D materials update
```

### **Routing Flow**
```
URL → Router.jsx → Dynamic import .mdx → MDXRenderer → Page with theme
```

### **3D Flow**
```
ThreeCanvas → Base3DComponent → Theme properties → Material rendering
```

---

## 📋 Before Starting Work

1. **Check current system status** - Gallery.jsx and Interests.jsx show what's working
2. **Understand content structure** - Look at existing .mdx files for patterns
3. **Test theme system** - Use browser dev tools to see CSS variables
4. **Verify 3D integration** - Check ThreeCanvas and registered components

---

## 🎯 System Strengths

- **Excellent separation of concerns** - Core, components, pages, content clearly divided
- **Working content pipeline** - Real MDX loading and processing
- **Clean component inheritance** - BaseCard pattern with project/interest extensions
- **Comprehensive theming** - 2D + 3D integration with reactive switching
- **Mobile optimization** - Built into core 3D components
- **Production-ready routing** - Hash-based for GitHub Pages compatibility

---

## ⚡ Quick Commands

```bash
npm run dev         # Local development
npm run build       # Production build  
npm run deploy      # Deploy to GitHub Pages
```

---

*This is a well-architected system with solid foundations. Focus on understanding the working patterns before making changes.*