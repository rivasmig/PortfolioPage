const r=`---\r
title: "MDX System Test ✨"\r
description: "Testing the portfolio's MDX capabilities with style and a touch of interactivity"\r
date: "2024-06-11"\r
tags:\r
  - javascript\r
  - react\r
private:\r
  collaborators: 1\r
  duration: "1 week"\r
  featured: true\r
  status: "completed"\r
  difficulty: 2\r
  role: "developer"\r
  year: 2024\r
---\r
\r
import { useState } from 'react';\r
\r
# MDX System Test ✨\r
\r
Welcome to the **MDX testing ground**! This file demonstrates how beautiful normal Markdown can look with just a few interactive flourishes.\r
\r
## What's Working Here? 🚀\r
\r
- **Pure Markdown** that looks great automatically\r
- **Your existing theme system** providing the styling\r
- **Optional React components** when we want something special\r
- **Code syntax highlighting** for technical content\r
- **Video embeds** and rich media content\r
\r
## Technical Verification\r
\r
This template confirms several key capabilities:\r
\r
### Markdown Features\r
- **Bold** and *italic* text formatting\r
- Ordered and unordered lists\r
- Code blocks with syntax highlighting\r
- Headings at multiple levels\r
\r
### MDX Superpowers\r
- React component imports ✅\r
- State management ✅  \r
- Interactive elements ✅\r
- Theme integration ✅\r
- Video embeds ✅\r
\r
\`\`\`javascript\r
// Clean, syntax-highlighted code blocks\r
const mdxTest = {\r
  status: "working perfectly",\r
  styling: "automatic",\r
  interactivity: "when needed",\r
  media: "fully supported"\r
};\r
\r
console.log("Hello from the MDX system!");\r
\`\`\`\r
\r
## Interactive Demo\r
\r
And here's where MDX shines - when you want something interactive, just add it:\r
\r
<ClickCounter />\r
\r
## Video Test 🎬\r
\r
Let's test video embedding capabilities:\r
\r
<VideoEmbed />\r
\r
## System Status\r
\r
> **Result**: The MDX system is fully operational and ready for real content!\r
\r
The beauty of this approach is that **90% of your writing** can be pure Markdown that automatically looks professional, while you have the **power of React** available whenever you need something special.\r
\r
---\r
\r
*This test file demonstrates the perfect balance between simplicity and capability.*\r
\r
export function ClickCounter() {\r
  const [clicks, setClicks] = useState(0);\r
  \r
  return (\r
    <div style={{ \r
      padding: '1rem', \r
      border: '1px solid var(--color-primary)', \r
      borderRadius: '8px',\r
      margin: '1rem 0',\r
      textAlign: 'center',\r
      background: 'var(--color-surface)'\r
    }}>\r
      <p>A simple React component embedded in Markdown:</p>\r
      <div style={{ \r
        fontSize: '2rem', \r
        fontWeight: 'bold', \r
        margin: '0.5rem 0',\r
        color: 'var(--color-primary)'\r
      }}>\r
        {clicks}\r
      </div>\r
      <button \r
        onClick={() => setClicks(clicks + 1)}\r
        style={{\r
          padding: '0.5rem 1rem',\r
          background: 'var(--color-primary)',\r
          color: 'var(--color-background)',\r
          border: 'none',\r
          borderRadius: '4px',\r
          cursor: 'pointer',\r
          marginRight: '0.5rem'\r
        }}\r
      >\r
        Click me!\r
      </button>\r
      <button \r
        onClick={() => setClicks(0)}\r
        style={{\r
          padding: '0.5rem 1rem',\r
          background: 'transparent',\r
          color: 'var(--color-primary)',\r
          border: '1px solid var(--color-primary)',\r
          borderRadius: '4px',\r
          cursor: 'pointer'\r
        }}\r
      >\r
        Reset\r
      </button>\r
    </div>\r
  );\r
}\r
\r
export function VideoEmbed() {\r
  return (\r
    <div style={{\r
      position: 'relative',\r
      paddingBottom: '56.25%', // 16:9 aspect ratio\r
      height: 0,\r
      overflow: 'hidden',\r
      margin: '1rem 0',\r
      borderRadius: '8px',\r
      border: '1px solid var(--color-primary)'\r
    }}>\r
      <iframe \r
        style={{\r
          position: 'absolute',\r
          top: 0,\r
          left: 0,\r
          width: '100%',\r
          height: '100%',\r
          borderRadius: '8px'\r
        }}\r
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=kQ6lPL4Du0oGM12L" \r
        title="YouTube video player" \r
        frameBorder="0" \r
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" \r
        referrerPolicy="strict-origin-when-cross-origin" \r
        allowFullScreen\r
      />\r
    </div>\r
  );\r
}`;export{r as default};
