import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/conspiracyQueries",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: '127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
  },
    }
  }
})