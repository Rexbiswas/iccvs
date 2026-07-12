import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    // Optimize chunk splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries to leverage browser caching
          'react-vendor': ['react', 'react-dom', 'react-helmet-async', '@emotion/react', '@emotion/styled'],
          'gsap': ['gsap'],
          'framer': ['framer-motion'],
          'utils': ['axios', 'lenis', 'react-router-dom'],
          'ui': ['@mui/material', '@mui/icons-material', 'lucide-react'],
        }
      }
    },
    // Optimize CSS and JS minification for Safari compatibility
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
      mangle: {
        // Prevent mangling of constructor names (helps with Three.js)
        keep_classnames: true,
      }
    }
  }
})
