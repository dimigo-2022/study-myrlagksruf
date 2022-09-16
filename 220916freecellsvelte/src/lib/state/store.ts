import { writable } from "svelte/store";
import { getTrumpInfo } from "../module/function";
import { TrumpCard, type iTrump } from "../module/trump";
const arr:iTrump[][] = [];
let count = 0;

for(let i = 0; i < 52; i++){
    let row = count % 8;
    if(!arr[row]) arr[row] = [];
    // arr[row].push({...obj, row, index:Math.floor(count / 8)});
    arr[row].push({
        shape:'X',
        index:Math.floor(count / 8),
        num:-1,
        row
    });
    count += 1;
}
arr.push([null, null, null, null], [null, null, null, null]);
export const cards = writable(arr);

export const makeCard = () => {
    const card = new TrumpCard();
    card.shuffle();
    const pick = card.pick();
    return (row:number, index:number) => {
        let { value, done } = pick.next()
        if(done) return done;
        const obj = getTrumpInfo(value.num);
        cards.update(v => {
            v[row][index] = {...obj, row, index};
            return v;
        });
        return done;
    };
};

export const moveTo = (fromRow:number, fromIndex:number, row:number, index = -1) => {
    cards.update(v => {
        console.log(fromRow, fromIndex, row, index);
        const fromArr = v[fromRow];
        const toArr = v[row];
        if(fromArr === toArr) return v;
        if(index === -1){
            const lastIndex = toArr.at(-1)?.index ?? -1;
            if(fromRow === 8){
                fromArr[fromIndex].index = lastIndex + 1;
                fromArr[fromIndex].row = row;
                v[row] = [...v[row], fromArr[fromIndex]];
            } else {
                for(let i = fromIndex; i < fromArr.length; i++){
                    fromArr[i].index = lastIndex + i - fromIndex + 1;
                    fromArr[i].row = row;
                }
                v[row] = [...v[row], ...fromArr.slice(fromIndex)];
            }
        } else {
            fromArr[fromIndex].index = index;
            fromArr[fromIndex].row = row;
            v[row] = [...v[row].slice(0, index), fromArr[fromIndex], ...v[row].slice(index + 1)];
        }
        
        if(fromRow === 8){
            v[fromRow] = [...fromArr.slice(0, fromIndex), null, ...fromArr.slice(fromIndex + 1)];
        } else {
            v[fromRow] = fromArr.slice(0, fromIndex);
        }
        console.log([...v]);
        return v;
    });
};

cards.subscribe(v => {
    const obj = { H:2, S:0, D:1, C:3, X:-1 };
    const all = [...v.slice(0, 8).map(t => t.at(-1)), ...v[8]].filter(t => t);
    for(let card of all){
        let pack = v[9][obj[card.shape]];
        if(pack && pack.num + 1 === card.num || !pack && card.num === 1) {
            moveTo(card.row, card.index, 9, obj[card.shape]);
            break;
        }
    }
});

export const pickStore = writable({
    row:-1, index:-1
});

export const pickReset = () => {
    pickStore.set({row:-1, index:-1});
};