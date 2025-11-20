import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Force restart configuration
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: ['react-router-dom', 'framer-motion', 'lucide-react'],
    exclude: ['lucide-react']
  }
});
