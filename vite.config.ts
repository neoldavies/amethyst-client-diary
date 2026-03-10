import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // This 'base' line fixes the blank screen on GitHub Pages
    base: '/amethyst-client-diary/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // Correcting the alias to point to the 'src' directory
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // Allows you to access the server from your mobile via your local IP
      host: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});