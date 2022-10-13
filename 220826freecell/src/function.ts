import { state } from './variable';

interface iTrump{
    p:number;
    c:number;
    num:number;
}

let count = 0;

export const loopCheck = () => {
    const p = document.querySelector<HTMLDivElement>(`[data-p="${count + 1}"][data-r]`);
    const r = document.querySelector<HTMLDivElement>(`.trump[data-p="${count + 1}"][data-c="${p.dataset.r}"]:last-child:not([data-r]), .trump.left[data-p="${count + 1}"][data-c="${p.dataset.r}"]`);
    if(state.move){
        state.can = false;
        state.move.from.dataset.can = state.move.can;
        let next = state.move.from.nextElementSibling as HTMLDivElement;
        state.move.to.append(state.move.from);
        if(next){
            state.move.from = next;
        } else {
            state.move = null;
        }
    } else if(r) {
        state.can = false;
        goRight(r, p);
    } else {
        state.can = true;
    }
    count = (count + 1) % 4;
    requestAnimationFrame(loopCheck);
};


export function toTrump(div:HTMLDivElement, value:number|iTrump){
    let t:iTrump = null;
    if(typeof value === 'number'){
        t = getTrumpInfo(value);
    } else {
        t = value;
    }
    div.classList.add('trump');
    div.dataset.p = String(t.p);
    div.dataset.c = String(t.c);
    div.dataset.num = String(t.num);
}

export function reTrump(div:HTMLDivElement){
    div.removeAttribute('data-num');
    div.removeAttribute('data-c');
    div.removeAttribute('data-p');
}

export function getTrumpInfo(value:number):iTrump{
    return {
        p:value % 4 + 1,
        c:Math.floor(value / 4) + 1,
        num:value
    }
}

export function isPosible(pick:HTMLElement, target:HTMLElement){
    let pre = getTrumpInfo(Number(pick.dataset.num));
    let next = getTrumpInfo(Number(target.dataset.num));
    if(next.c - pre.c === 1 && pre.p % 2 + next.p % 2 === 1 && pick.parentElement !== target.parentElement){
        return true;
    }
    return false;
}

// hold 부분에 남아있는 공간이 있는지 확인
// pick한 카드를 복제해서 남아있는 공간에 넣기
// pick한 카드 지우기
// pick 초기화
export function goLeft(pick:HTMLDivElement, dest:HTMLDivElement){
    if(!(dest && !dest.dataset.num && (!pick.closest('main') || pick.parentElement.lastChild === pick))) return;
    toTrump(dest, getTrumpInfo(Number(pick.dataset.num)));
    if(pick.closest('header')){
        reTrump(pick);
    } else {
        pick.remove();
    }
    if(state.pick){
        state.pick.id = '';
        state.pick = null;   
    }
}

export function goRight(pick:HTMLDivElement, dest:HTMLDivElement){
    if(!(dest && dest.dataset.r === pick.dataset.c && dest.dataset.p === pick.dataset.p && (!pick.closest('main') || pick.parentElement.lastChild === pick))) return;
    dest.dataset.r = String(Number(dest.dataset.r) + 1);
    toTrump(dest, getTrumpInfo(Number(pick.dataset.num)));
    if(pick.classList.contains('left')) reTrump(pick);
    else pick.remove();
    if(state.pick){
        state.pick.id = '';
        state.pick = null;   
    }
}

export function goTrump(_pick:HTMLDivElement, dest:HTMLDivElement){
    let pick:HTMLDivElement = _pick;
    if(pick.classList.contains('left')){
        pick = document.createElement('div');
        toTrump(pick, Number(_pick.dataset.num));
        reTrump(_pick);
    }
    let can = dest.lastElementChild instanceof HTMLDivElement ? dest.lastElementChild.dataset.can : '0';
    state.move = {
        from:pick,
        to:dest,
        can,
    };
    if(state.pick){
        state.pick.id = '';
        state.pick = null;   
    }
}