import { Trump } from './trump.js'

const card = document.querySelector('div');
const but = document.querySelector('button');
let count = 0;
let trump = new Trump();

trump.shuffle();
const pick = trump.pick();
// .next() 할 때마다 다음 카드 뽑음

but.addEventListener('click', e => {
    const next = pick.next();
    card.style.backgroundPosition = `calc(100% / 12 * ${next.value.num % 13}) calc(100% / 3 * ${Math.floor(next.value.num / 13)})`;
    count += 1;
});