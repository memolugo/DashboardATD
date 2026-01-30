import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El 'base' debe ser el nombre de tu repositorio en GitHub para que las rutas funcionen
export default defineConfig({
  plugins: [react()],
  base: '/DashboardATD/', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});