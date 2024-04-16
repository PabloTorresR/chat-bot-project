import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  server: {
    port: 3800,
    proxy: {
      '/api': {
        target: process.env.VITE_API_GATEWAY_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      '@chat-app/styles': path.resolve(__dirname, './src/styles'),
      '@chat-app': path.resolve(__dirname, './src/app'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
