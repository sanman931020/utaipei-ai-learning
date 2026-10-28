import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  plugins: [react()],
  // Relative asset paths let the built site run from any sub-folder of a school web server.
  base: './',
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  server: { port: 5174 },
  // Teaching text (~800 kB of Traditional Chinese, ~280 kB gzipped) gets its own chunk so app updates do not re-download it.
  build: { chunkSizeWarningLimit: 900, rollupOptions: { output: { manualChunks(id) { if (id.includes('node_modules/react')) return 'react'; if (id.includes('/src/content/')) return 'content' } } } },
})
