import{j as e,r as i}from"./index-BsbDU7gG.js";function s(){const[r,n]=i.useState(0);return e.jsxs("div",{style:{padding:"1rem",border:"1px solid var(--color-primary)",borderRadius:"8px",margin:"1rem 0",textAlign:"center",background:"var(--color-surface)"},children:[e.jsx("p",{children:"A simple React component embedded in Markdown:"}),e.jsx("div",{style:{fontSize:"2rem",fontWeight:"bold",margin:"0.5rem 0",color:"var(--color-primary)"},children:r}),e.jsx("button",{onClick:()=>n(r+1),style:{padding:"0.5rem 1rem",background:"var(--color-primary)",color:"var(--color-background)",border:"none",borderRadius:"4px",cursor:"pointer",marginRight:"0.5rem"},children:"Click me!"}),e.jsx("button",{onClick:()=>n(0),style:{padding:"0.5rem 1rem",background:"transparent",color:"var(--color-primary)",border:"1px solid var(--color-primary)",borderRadius:"4px",cursor:"pointer"},children:"Reset"})]})}function t(r){const n={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"MDX System Test ✨"}),`
`,e.jsxs(n.p,{children:["Welcome to the ",e.jsx(n.strong,{children:"MDX testing ground"}),"! This file demonstrates how beautiful normal Markdown can look with just a few interactive flourishes."]}),`
`,e.jsx(n.h2,{children:"What's Working Here? 🚀"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pure Markdown"})," that looks great automatically"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Your existing theme system"})," providing the styling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Optional React components"})," when we want something special"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Code syntax highlighting"})," for technical content"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Technical Verification"}),`
`,e.jsx(n.p,{children:"This template confirms several key capabilities:"}),`
`,e.jsx(n.h3,{children:"Markdown Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bold"})," and ",e.jsx(n.em,{children:"italic"})," text formatting"]}),`
`,e.jsx(n.li,{children:"Ordered and unordered lists"}),`
`,e.jsx(n.li,{children:"Code blocks with syntax highlighting"}),`
`,e.jsx(n.li,{children:"Headings at multiple levels"}),`
`]}),`
`,e.jsx(n.h3,{children:"MDX Superpowers"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"React component imports ✅"}),`
`,e.jsx(n.li,{children:"State management ✅"}),`
`,e.jsx(n.li,{children:"Interactive elements ✅"}),`
`,e.jsx(n.li,{children:"Theme integration ✅"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// Clean, syntax-highlighted code blocks\r
const mdxTest = {\r
  status: "working perfectly",\r
  styling: "automatic",\r
  interactivity: "when needed"\r
};\r
\r
console.log("Hello from the MDX system!");
`})}),`
`,e.jsx(n.h2,{children:"Interactive Demo"}),`
`,e.jsx(n.p,{children:"And here's where MDX shines - when you want something interactive, just add it:"}),`
`,e.jsx(s,{}),`
`,e.jsx(n.h2,{children:"System Status"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Result"}),": The MDX system is fully operational and ready for real content!"]}),`
`]}),`
`,e.jsxs(n.p,{children:["The beauty of this approach is that ",e.jsx(n.strong,{children:"90% of your writing"})," can be pure Markdown that automatically looks professional, while you have the ",e.jsx(n.strong,{children:"power of React"})," available whenever you need something special."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"This test file demonstrates the perfect balance between simplicity and capability."})})]})}function l(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{s as ClickCounter,l as default};
