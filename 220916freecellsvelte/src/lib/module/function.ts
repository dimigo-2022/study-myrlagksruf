import type { iTrump } from './trump';

export function getTrumpInfo(value:number):Pick<iTrump, 'shape'|'num'> & {total:number}{
    const arr = ["H", "S", "D", "C"] as const;
    return {
        shape:arr[value % 4],
        num:Math.floor(value / 4) + 1,
        total: value
    }
}


export function isPosible(to:iTrump, from:iTrump){
    const obj = {
        H:0, S:1, D:2, C:3,X:-1
    }
    if(from.num - to.num === 1 &&
        obj[to.shape] % 2 + obj[from.shape] % 2 === 1){
        return true;
    }
    return false;
}