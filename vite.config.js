// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';

export default defineConfig({
  plugins: [
    react(),
    mdx({
      // Enable JSX in MDX files
      jsxImportSource: 'react',
      // Add remark plugins to handle frontmatter
      remarkPlugins: [remarkFrontmatter],
      rehypePlugins: []
    })
  ],
  base: '/PortfolioPage/', // 👈 This MUST match your GitHub repo name
  build: {
    outDir: 'dist',
  },
  // Optional: Configure file extensions
  optimizeDeps: {
    include: ['@mdx-js/react']
  }
});