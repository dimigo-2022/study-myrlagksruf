const arr = [...Array(500)].map((v, i) => i * 2 + 1)
const check = new Set();
/**
 * 
 * @param {number[]} arr 
 * @param {number[]} pick 
 * @param {number} num 
 * @returns 
 */
const get = (arr, pick, num) => {
    if(num === 1) {
        const myNum = 999 - pick.reduce((acc, v) => acc + v, 0);
        if(arr.includes(myNum)){
            pick.push(myNum)
            check.add(pick.join(','));
        }
        return;
    }
    for(let i = 0; i < arr.length; i++){
        get(arr.slice(i + 1), [...pick, arr[i]], num - 1);
    }
}

get(arr, [], 3);
console.log(check.size);