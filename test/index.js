import { Trump } from './trump.js'

const card = document.querySelector('div');
const but = document.querySelector('button');
let count = 0;
let trump = new Trump();

const pick = trump.pick();
trump.shuffle();
console.log(pick.next().value);
console.log(pick.next().value);
console.log(pick.next().value);

but.addEventListener('click', e => {
    card.style.backgroundPosition = `calc(100% / 12 * ${count % 13}) calc(100% / 3 * ${Math.floor(count / 13)})`;
    count += 1;
});