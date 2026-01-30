import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reemplaza 'atlas-morelos' con el nombre exacto de tu repositorio en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/atlas-morelos/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});