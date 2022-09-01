import { isPosible, goLeft, goTrump } from "./function";
import { state } from "./variable";

const middle = document.querySelector<HTMLDivElement>('.middle');

function init(){
    const mouseMove = (e:MouseEvent|TouchEvent) => {
        let X:number;
        if(e instanceof TouchEvent){
            X = e.touches[0].clientX
        } else {
            X = e.clientX;
        }
        if(X < innerWidth / 2){
            middle.classList.add('inverse');
        } else {
            middle.classList.remove('inverse');
        }
    }

    const clickFun = (e:MouseEvent|TouchEvent) => {
        e.preventDefault();
        if(!state.can) return;
        let pickTemp = document.querySelector<HTMLDivElement>('#pick');
        if(!(e.target instanceof HTMLDivElement &&
            e.target.classList.contains('trump') &&
            ((e.target.closest('main') && e.target.dataset.can  && e.target.dataset.can === (e.target.parentElement.lastElementChild as HTMLElement).dataset.can) ||
            e.target.closest('header')))) {
                if(e.target instanceof HTMLDivElement &&
                    e.target.classList.contains('trump-row') &&
                    e.target.lastElementChild === null){
                    if(state.pick) goTrump(state.pick, e.target);
                }
                if(pickTemp) pickTemp.id = '';
                state.pick = null;
                return;
        }

        if(!pickTemp){
            if(!e.target.dataset.r && !(e.target.classList.contains('left') && !e.target.dataset.num)){
                state.pick = e.target;
                state.pick.id = 'pick';
            }
            return;
        }
        state.pick = pickTemp;
        if(state.pick === e.target && e.target.classList.contains('trump') && !e.target.classList.contains('left')){
            let g = document.querySelector<HTMLDivElement>('.trump.left:not([data-num])');
            goLeft(state.pick, g);
            return;
        }

        if(e.target.classList.contains('left') && e.target.classList.contains('trump')){
            goLeft(state.pick, e.target);
            return;
        } else if(isPosible(state.pick, e.target)){
            goTrump(state.pick, e.target.parentElement as HTMLDivElement);
            return;
        }
        state.pick.id = '';
        state.pick = null;
    }
    
    window.addEventListener('mouseover', e => {
        if(!(state.pick && e.target instanceof HTMLDivElement && e.target.dataset.num)) {
            document.body.style.cursor = 'default';
            return;
        }
        if(isPosible(state.pick, e.target)){
            document.body.style.cursor = 'pointer';
            return;
        }
        document.body.style.cursor = 'default';
    });

    window.addEventListener('pointermove', mouseMove);
    window.addEventListener('pointerdown', clickFun);
}

export default init;