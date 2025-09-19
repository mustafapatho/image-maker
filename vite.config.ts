import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    return {
      plugins: [react()],
      define: {
        'process.env': {
          VITE_GEMINI_API_KEY: JSON.stringify(env.VITE_GEMINI_API_KEY),
          VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
          VITE_SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
          VITE_PAYMENT_API_KEY: JSON.stringify(env.VITE_PAYMENT_API_KEY)
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
