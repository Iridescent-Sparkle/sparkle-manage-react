import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup'

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://iridescent.icu/',
        changeOrigin: true,
        secure: false,
        protocolRewrite:"https",
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
