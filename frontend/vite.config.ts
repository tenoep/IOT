import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      host: true, // Allows access from outside the container
      port: 5173,
    },
    define: {
      "process.env": env,
    }
  }
})
