import { defineConfig, PluginOption } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import dynamicImportVarsDefault from '@rollup/plugin-dynamic-import-vars';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path/posix';
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/

// @ts-ignore
const dynamicImportVars = dynamicImportVarsDefault.default as typeof dynamicImportVarsDefault

interface iChangeHTML{
  template?:string;
}

const ChangeHtml:(config?:iChangeHTML)=>PluginOption = function(_config){
  let config:iChangeHTML = {
    template:'./template/index.html'
  };
  if(_config) config = _config;
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
      console.log(id);
      if(id.endsWith('.html')){
        let realId = id.replace(__dirname.replaceAll('\\', '/'), '.').replaceAll('\\', '/');
        const html = await fs.readFile(config.template, {encoding:'utf-8'});
        return html.replace('{%script-template%}', `<script type="module" src="/src${realId.slice(1).replace('index.html', 'index.ts')}"></script>`);
      } else if(id.endsWith('.ts')){
        return `import App from './index.svelte';const app = new App({target: document.getElementById('app')});export default app`;
      }
    },
    // transformIndexHtml(html, ctx){
    //   let root = ctx.filename.replace(__dirname.replaceAll('\\', '/'), '.').replaceAll('\\', '/');
    //   let parCount = root.match(/\//g).length - 1;
    //   return html
    // },
    configureServer(server){
      console.log(server.config.root)
      server.middlewares.use(server.config.base, async (req, res, next) => {
        if(req.url.match(/^\/@/) || req.url.match(/^\/node_modules/)){
          next();
        } else if(path.extname(req.url) === '' || path.extname(req.url) === '.html'){
          const arr = req.url.split('/');
          if(arr[arr.length - 1] === '' || arr[arr.length - 1] === 'index.html'){
            arr[arr.length - 1] = 'index.ts';
          } else {
            arr.push('index.ts');
          }
          const html = await fs.readFile(config.template, {encoding:'utf-8'});
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(html.replace('{%script-template%}', `<script type="module" src="${server.config.base}src${decodeURIComponent(arr.join('/'))}"></script>`));
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
    plugins: [
      VitePWA(),
      ChangeHtml(),
      svelte({
      configFile:false,
      preprocess:sveltePreprocess(),
      include:["./src/**/*.svelte"],
    })],
    build:{
      outDir:"/Users/han/coding/myrlagksruf.github.io",
      rollupOptions:{
        plugins:[
          dynamicImportVars()
        ],
        input,
        output:{
          assetFileNames:'assets/[name][extname]',
          chunkFileNames:'lib/[name].js'
        }
      }
    },
    base:'/',
    server:{
      host:'0.0.0.0'
    }
  }
})
