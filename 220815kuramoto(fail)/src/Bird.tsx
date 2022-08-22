import { createSignal, onCleanup, onMount, splitProps } from 'solid-js';
import './Bird.scss';

interface iPos{
    x:number;
    y:number;
    r:number;
    nr:number;
    pr:number;
    f:number;
    c:number;
    w:number;
    wc:number;
    v:{
      x:number;
      y:number;
    }
}

export default () => {
    const [pos, setPos] = createSignal({
        x:Math.random() * 100,
        y:Math.random() * 100,
        r: Math.random() * Math.PI * 2,
        nr:-1,
        pr:-1,
        f:0,
        c:0,
        w:Math.random() * 400 + 200,
        wc:0,
        v : {x : Math.sign(Math.random() - 0.5), y : Math.sign(Math.random() - 0.5)}
    });
    

    const [count, setCount] = createSignal(false);
    const [size, setSize] = createSignal({width:100, height:100});
    let div:HTMLDivElement;
    let num:number;
    onMount(() => {
        let { width, height } = getComputedStyle(div);
        setSize({width: parseInt(width), height:parseInt(height)});
        let pre = 0;
        const move = (time:number) => {
            let tick = (time - pre) / 10;
            pre = time;
            const max = 0.1 * tick;
            setPos(v => {
                let t = (1 - Math.random())**(-0.5);
                if(v.f <= v.c){
                  v.pr = v.r;
                  let r = Math.random() * Math.PI * 2;
                  v.nr = r;
                  v.f = Math.ceil(Math.abs(v.nr - v.pr) / 0.01);
                  v.c = 0;
                }
                v.r = (v.nr - v.pr) / v.f * Math.min(v.c, v.f) + v.pr;
                v.c += t * tick;
                v.wc += tick;
                if(v.wc > v.w){
                    console.log('???');
                    bulbon(null);
                    v.wc -= v.w;
                }
                let x = v.x + max * v.v.x * Math.cos(v.r);
                let y = v.y + max * v.v.y * Math.sin(v.r);
                if(x < 0 || x > 100) {
                  v.v.x *= -1;
                  x = v.x + max * v.v.x * Math.cos(v.r);
                }
                if(y < 0 || y > 100) {
                  v.v.y *= -1;
                  y = v.y + max * v.v.y * Math.sin(v.r);
                }
                return ({ ...v, x, y });
              });
            num = requestAnimationFrame(move);
        }
        num = requestAnimationFrame(move);
    });

    onCleanup(() => cancelAnimationFrame(num));

    const bulbon = (e:MouseEvent) => count() ? null : setCount(v => !v);

    const bulboff = (e:Event) => setCount(v => !v);
    return <>
        <div ref={div} style={{transform:`translate(${pos().x * (innerWidth - size().width) / 100}px, ${pos().y * (innerHeight - size().height) / 100}px)`}} classList={{bird:true, on:count()}} onClick={bulbon} onAnimationEnd={bulboff}></div>
    </>
};