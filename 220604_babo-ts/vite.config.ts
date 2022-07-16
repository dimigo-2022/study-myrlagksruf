import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// https://www.naver.com/api
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build:{
    rollupOptions:{
      input:{
        index:'./index.html',
        page:'./page.html'
      }
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'https://www.naver.com',
        changeOrigin:true,
        secure:true,
        rewrite(p){
          return p.replace(/^\/api/, '/');
        }
      },
      '/search':{
        target:'https://www.google.com',
        changeOrigin:true,
        secure:true
      }
    }
  }
});