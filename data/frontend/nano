import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: '.', // Project root
  publicDir: 'public', // Serves assets from public/
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html') // Tell Vite where index.html is
    }
  },
  server: {
    port: 3000,
    open: false
  }
})
