const n=`---
title: "MDX System Test ✨"
description: "Testing the portfolio's MDX capabilities with style and a touch of interactivity"
date: "2024-06-11"
tags:
  - javascript
  - react
private:
  collaborators: 1
  duration: "1 week"
  featured: true
  status: "completed"
  difficulty: 2
  role: "developer"
  year: 2024
---

import { useState } from 'react';

# MDX System Test ✨

Welcome to the **MDX testing ground**! This file demonstrates how beautiful normal Markdown can look with just a few interactive flourishes.

## What's Working Here? 🚀

- **Pure Markdown** that looks great automatically
- **Your existing theme system** providing the styling
- **Optional React components** when we want something special
- **Code syntax highlighting** for technical content

## Technical Verification

This template confirms several key capabilities:

### Markdown Features
- **Bold** and *italic* text formatting
- Ordered and unordered lists
- Code blocks with syntax highlighting
- Headings at multiple levels

### MDX Superpowers
- React component imports ✅
- State management ✅  
- Interactive elements ✅
- Theme integration ✅

\`\`\`javascript
// Clean, syntax-highlighted code blocks
const mdxTest = {
  status: "working perfectly",
  styling: "automatic",
  interactivity: "when needed"
};

console.log("Hello from the MDX system!");
\`\`\`

## Interactive Demo

And here's where MDX shines - when you want something interactive, just add it:

<ClickCounter />

## System Status

> **Result**: The MDX system is fully operational and ready for real content!

The beauty of this approach is that **90% of your writing** can be pure Markdown that automatically looks professional, while you have the **power of React** available whenever you need something special.

---

*This test file demonstrates the perfect balance between simplicity and capability.*

export function ClickCounter() {
  const [clicks, setClicks] = useState(0);
  
  return (
    <div style={{ 
      padding: '1rem', 
      border: '1px solid var(--color-primary)', 
      borderRadius: '8px',
      margin: '1rem 0',
      textAlign: 'center',
      background: 'var(--color-surface)'
    }}>
      <p>A simple React component embedded in Markdown:</p>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        margin: '0.5rem 0',
        color: 'var(--color-primary)'
      }}>
        {clicks}
      </div>
      <button 
        onClick={() => setClicks(clicks + 1)}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--color-primary)',
          color: 'var(--color-background)',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '0.5rem'
        }}
      >
        Click me!
      </button>
      <button 
        onClick={() => setClicks(0)}
        style={{
          padding: '0.5rem 1rem',
          background: 'transparent',
          color: 'var(--color-primary)',
          border: '1px solid var(--color-primary)',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reset
      </button>
    </div>
  );
}`;export{n as default};
