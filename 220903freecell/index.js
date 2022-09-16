import { Trump } from './trump.js';

const trump = new Trump();
const pick = trump.pick();
let count = 0;
let init = false;
const container = document.querySelector('#container');

const update = () => {
    const card = pick.next();
    if(!card.done){
        const num = card.value.num;
        const div = document.querySelector(`#container > div:nth-child(${count + 1})`)
        const childCount = div.childElementCount;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.style.backgroundPositionX = `calc(100% / 12 * ${num % 13})`;
        cardDiv.style.backgroundPositionY = `calc(100% / 3 * ${Math.floor(num / 13)})`;
        cardDiv.style.transform = `translateY(calc(-150px * ${childCount} + 30px * ${childCount}))`;
        div.append(cardDiv);

        count = (count + 1) % 8;
        requestAnimationFrame(update);
    } else {
        init = true;
    }
};

update();

container.addEventListener('click', e => {
    if(!(e.target instanceof HTMLDivElement &&
        e.target.classList.contains('card') &&
        e.target.parentElement.lastElementChild === e.target &&
        init)) return;
    
    e.target.classList.add('selected');
});