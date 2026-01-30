import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El 'base' debe incluir la carpeta atlas-morelos para que funcione en GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/DashboardATD/atlas-morelos/', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});