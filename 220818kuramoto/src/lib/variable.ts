import * as PIXI from 'pixi.js'
export class Pos{
    x = Math.random() * 100;
    y = Math.random() * 100;
    r = Math.random() * Math.PI * 2;
    nr = -1;
    pr = -1;
    f = 0;
    c = 0;
    w = Math.random() * 1000 + 400;
    wc = 0;
    bulb = {
      on: false,
      c:0,
      f:[[1, 0], [0.4, 1], [0.1, 1], [0, 0]]
    };
    v = {
      x : Math.sign(Math.random() - 0.5),
      y : Math.sign(Math.random() - 0.5)
    }
    graph:PIXI.Graphics;
    back:PIXI.Graphics;
    radius:number;
    app:PIXI.Application;
    static All:Pos[] = [];
    constructor(obj:{ radius:number, app:PIXI.Application}){
      const { radius, app } = obj;
      const filter = new PIXI.filters.BlurFilter(10);
      this.back = new PIXI.Graphics();
      this.graph = new PIXI.Graphics();
      this.graph.filters = [filter];
      this.radius = radius;
      this.app = app;
      this.app.stage.addChild(this.back);
      this.app.stage.addChild(this.graph);
      Pos.All.push(this);
    }
    move(){
      const app = this.app;
      this.back.clear();
      this.back.beginFill(0xffffff);
      this.back.lineStyle(3, 0x000000);
      this.back.drawCircle(this.x / 100 * (app.view.width - 2 * this.radius) + this.radius, this.y / 100 * (app.view.height - 2 * this.radius) + this.radius, this.radius);
      this.back.endFill();
      if(this.bulb.on){
        this.bulb.c += 0.03;
        const findIndex = this.bulb.f.findIndex(v => v[0] < this.bulb.c);
        const find = this.bulb.f[findIndex];
        const next = this.bulb.f[findIndex - 1];
        if(this.bulb.f[0] === find){
          this.bulb.c = 0;
          this.bulb.on = false;
        } else {
          let cur = (this.bulb.c - find[0]) / (next[0] - find[0]);
          let result = find[1] * (1 - cur) + cur * next[1];
          this.graph.clear();
          this.graph.beginFill(0xf8e287, result);
          this.graph.drawCircle(this.x / 100 * (app.view.width - 2 * this.radius) + this.radius, this.y / 100 * (app.view.height - 2 * this.radius) + this.radius, this.radius);
          this.graph.endFill();
        }
      }
    }
}