import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// index.html = aplikasi React. resep_saya.html & detail_resep.html masih HTML biasa,
// tetap disertakan supaya ikut ter-build.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resepSaya: resolve(__dirname, 'resep_saya.html'),
        detailResep: resolve(__dirname, 'detail_resep.html'),
      },
    },
  },
});
