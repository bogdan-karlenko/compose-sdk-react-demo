import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  //base: process.env.NODE_ENV === 'production' ? '/compose-sdk-react-demo/' : '/',
})
