import './style.scss';
import { Trump } from "./trump";
import { isPosible, toTrump, loopCheck } from "./function";
import init from './event';

const t = new Trump();
t.shuffle();
const pick = t.pick();
let count = 0;
let n = pick.next();
const loop = () => {
    const tag = document.querySelector(`main > div:nth-child(${count + 1})`);
    const div = document.createElement('div');
    toTrump(div, n.value.num);
    const next = tag.firstElementChild;
    if(!(next instanceof HTMLDivElement)){
        div.dataset.can = '0';
    } else if(isPosible(next, div)) {
        div.dataset.can = next.dataset.can;
    } else {
        div.dataset.can = String(Number(next.dataset.can) + 1);
    }
    tag.prepend(div);
    count = (count + 1) % 8;
    n = pick.next();
    if(!n.done){
        requestAnimationFrame(loop);
    } else {
        init();
        loopCheck();
    }
}

loop();