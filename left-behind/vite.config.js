import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' lets the build work on GitHub Pages project URLs (user.github.io/repo/)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { assetsInlineLimit: process.env.INLINE ? 100000000 : 4096 },
})
