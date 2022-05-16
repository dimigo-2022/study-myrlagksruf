import { defineConfig, PluginOption } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path/posix';
// https://vitejs.dev/config/
const html = await fs.readFile('./template/index.html', {encoding:'utf-8'});
const ChangeHtml:()=>PluginOption = function(){
  return {
    name:'ChangeHTML',
    async resolveId(source, importer){
      if(source.endsWith('.html')){
        console.log(`path: ${source}`);
        return source;
      } else if(source.endsWith('.ts')){
        return `.${source}`;
      }
    },
    async load(id){
      if(id.endsWith('.html')){
        let realId = id.replace(__dirname.replaceAll('\\', '/'), '.').replaceAll('\\', '/');
        return html.replace('{%script-template%}', `<script type="module" src="/src${realId.slice(1).replace('index.html', 'index.ts')}"></script>`);
      } else if(id.endsWith('.ts')){
        return `import App from './index.svelte';const app = new App({target: document.getElementById('app')});export default app`;
      }
    },
    transformIndexHtml(html, ctx){
      let root = ctx.filename.replace(__dirname.replaceAll('\\', '/'), '.').replaceAll('\\', '/');
      let parCount = root.match(/\//g).length - 1;
      return html.replace(/(src|href)=\"(.+?)\"/g, `$1="${'../'.repeat(parCount)}$2"`);
    },
    configureServer(server){
      server.middlewares.use(async (req, res, next) => {
        if(req.url.match(/^\/@/) || req.url.match(/^\/node_modules/)){
          next();
        } else if(path.extname(req.url) === '' || path.extname(req.url) === '.html'){
          const arr = req.url.split('/');
          if(arr[arr.length - 1] === '' || arr[arr.length - 1] === 'index.html'){
            arr[arr.length - 1] = 'index.ts';
          } else {
            arr.push('index.ts');
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(html.replace('{%script-template%}', `<script type="module" src="/src${decodeURIComponent(arr.join('/'))}"></script>`));
        } else if(path.extname(req.url) === '.ts'){
          try{
            await fs.access(`./src${decodeURIComponent(req.url)}`);
            next();
          } catch(err){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
            res.end(`import App from './index.svelte';const app = new App({target: document.getElementById('app')});export default app`);
          }
        } else {
          next();
        }
      })
    }
  }
}

const findFiles = async (source:string, currentPath = ['.']) => {
  const dir = await fs.opendir(source);
  const result:string[] = [];
  for await(let i of dir){
    if(i.isDirectory()){
      const arr = await findFiles(`${source}/${i.name}`, [...currentPath, i.name]);
      result.push(...arr);
    } else {
      if(i.name === 'index.svelte'){
        result.push([...currentPath, 'index.html'].join('/'));
      }
    }
  }
  return result;
};

export default defineConfig(async () => {
  const input = await findFiles('./src');
  return {
    plugins: [svelte({
      configFile:false,
      preprocess:sveltePreprocess()
    }), ChangeHtml()],
    build:{
      rollupOptions:{
        input
      }
    },
    base:'',
    server:{
      host:'0.0.0.0'
    }
  }
})
