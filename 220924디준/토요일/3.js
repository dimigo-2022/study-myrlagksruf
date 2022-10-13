/**
 * @param {number} oriNum
 * @param {number} color
 * @param {number} num
 * @param {string[]} str 
 */
const make = (oriNum, color, num = oriNum, str = []) => {
    if(num === 0) {
        let arr = [...str];
        for(let i = 0; i < arr.length - 1; i++){
            if(set.has(arr.join(','))){
                return;
            }
            arr = [arr[oriNum - 2], ...arr.slice(0, oriNum - 2), arr[oriNum - 1]];
        }
        set.add(str.join(','));
        return;
    }
    for(let i = 0; i < color; i++){
        make(oriNum, color, num - 1, [...str, i])
    }
}
const set = new Set()

make(5, 3);
console.log(set);