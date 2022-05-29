import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build:{
    rollupOptions:{
      input:{
        'index':'./index.html',
        'index2':'./index2.html'
      }
    }
  },
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
