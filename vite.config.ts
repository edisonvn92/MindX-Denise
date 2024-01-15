import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { dependencies } from './package.json';
function renderChunks(deps: Record<string, string>) {
  const chunks: any = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', 'firebase'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
export default defineConfig({
  build: {
    assetsDir: './public',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  server: {
    port: 4000,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3009',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
