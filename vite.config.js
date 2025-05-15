import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement VITE_ du bon fichier .env
  const env = loadEnv(mode, process.cwd());

  // Mappe les variables VITE_ en process.env.VARIABLE
  const processEnv = Object.keys(env)
    .filter((key) => key.startsWith('VITE_'))
    .reduce((acc, key) => {
      acc[`process.env.${key}`] = JSON.stringify(env[key]);
      return acc;
    }, {});

  const origin = env.VITE_ORIGIN || 'http://localhost:5173'

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: processEnv,
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
      host: '0.0.0.0',
      port: parseInt(env.VITE_PORT || '5173', 10),
      strictPort: true,
      cors: true,
      origin: origin,

      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  };
});