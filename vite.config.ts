import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  /* imagetools — src/assets/works의 스크린샷 원본을 크기별 webp로 만든다 (lib/screenshots.ts) */
  plugins: [react(), tailwindcss(), imagetools()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
