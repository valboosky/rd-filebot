import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', // use current folder
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
})
