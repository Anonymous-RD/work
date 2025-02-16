import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-nice-scroll': 'react-nice-scroll/dist/react-nice-scroll.esm.js'
    }
  }
})
