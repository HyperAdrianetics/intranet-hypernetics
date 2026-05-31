import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // En dev, las funciones /api las sirve el servidor local (pnpm dev:api).
      '/api': 'http://localhost:3001',
    },
  },
})
