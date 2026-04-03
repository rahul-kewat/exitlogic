import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Relative base so built assets work from subpaths and when opening dist/ over HTTP
// (absolute `/assets/...` breaks for file:// or e.g. GitHub Pages project sites).
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})
