<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Pos } from './lib/variable'
  import * as PIXI from 'pixi.js'
  let canvas:HTMLCanvasElement;
  const r = 20;
  let app:PIXI.Application;
  let ticker:(tick:number)=>void;
  onMount(() => {
    app = new PIXI.Application({
      view:canvas,
      width:1920,
      height:1200
    });
    for(let i = 0; i < 100; i++){
      const pos = new Pos({
        radius:r, app
      });
      pos.move();
    }
    let count = 0;
    ticker = (_tick:number) => {
      let tick = _tick * 5;
      const max = 0.1 * tick;
      Pos.sort();
      for(let pos of Pos.All){
        let t = (1 - Math.random())**(-0.5);
        if(pos.f <= pos.c){
          pos.pr = pos.r;
          let r = Math.random() * Math.PI * 2;
          pos.nr = r;
          pos.f = Math.ceil(Math.abs(pos.nr - pos.pr) / 0.01);
          pos.c = 0;
        }
        pos.r = (pos.nr - pos.pr) / pos.f * Math.min(pos.c, pos.f) + pos.pr;
        pos.c += t * tick;
        let x = pos.x + max * pos.v.x * Math.cos(pos.r);
        let y = pos.y + max * pos.v.y * Math.sin(pos.r);
        if(x < 0 || x > 100) {
          pos.v.x *= -1;
          x = pos.x + max * pos.v.x * Math.cos(pos.r);
        }
        if(y < 0 || y > 100) {
          pos.v.y *= -1;
          y = pos.y + max * pos.v.y * Math.sin(pos.r);
        }
        pos.x = x;
        pos.y = y;
        pos.move();
      }
      count++;
      if(count % 5 === 0){
        for(let pos of Pos.All){
          let prewc = pos.wc;
          if(!pos.bulb.on){
            pos.wc += pos.w;
          }
          if(Math.abs(pos.wc) > Math.PI * 2){
            pos.bulb.on = true;
            pos.wc -= Math.PI * 2 * Math.sign(pos.wc);
          } else if(prewc * pos.wc < 0){
            pos.bulb.on = true;
          }
        }
      }
      if(count === 60){
        for(let i = 0; i < Pos.All.length; i++){
          Pos.All[i].kuramoto(i);
        }
        count = 0;
      }
    };
    app.ticker.add(ticker);
  });

  onDestroy(() => {
    Pos.All = [];
    app.destroy();
  });
</script>
<input bind:value={Pos.K}>
<canvas bind:this={canvas}></canvas>

<style>
  :global(body){
    margin: 0;
    overflow: hidden;
  }
  input{
    position:absolute;
    left:0;
    top:0;
  }
  canvas{
    width:100vw;
    height: 100vh;
  }
</style>