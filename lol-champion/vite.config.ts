import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server:{
    proxy:{
      '/api':{
        target:'https://www.op.gg',
        changeOrigin:true,
        secure:true,
      }
    }
  }
})
