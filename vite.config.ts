import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { vitePluginVersion } from './vite-plugin-version'

export default defineConfig({
  plugins: [react(), tailwindcss(), vitePluginVersion()],
  base: "/dining/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
