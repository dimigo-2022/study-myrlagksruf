/**
 * 
 * @param {string} str
 * @returns {string[]}
 */
const je = (str) => {
    /**
     * 
     * @param {[string, number][]} remain 
     * @param {string[]} cur 
     * @returns {string[]}
     */
    const re = (remain, cur = []) => {
        if(cur.length === str.length){
            return [cur.join('')];
        }
        /**
         * @type {string[]}
         */
        let arr = [];
        for(let i = 0; i < remain.length;i++){
            let rem = remain
                .filter(v => v[0] === remain[i][0] ? v[1] - 1 : v[1])
                .map((v, j) => [v[0], v[0] === remain[i][0] ? v[1] - 1 : v[1]]);
            arr = [...arr, ...re(rem, [...cur, remain[i][0]])];
        }
        return arr;
    }
    const sort = [...str].sort((a, b) => a.localeCompare(b)).reduce(
        /**
         * 
         * @param {[string, number][]} acc 
         * @param {string} cur 
         */
        (acc, cur) => {
            let ind = acc.findIndex(v => v[0] === cur);
            if(ind === -1){
                acc.push([cur, 1]);
            } else {
                acc[ind][1]++;
            }
            return acc;
    }, []);
    return re(sort);
}

console.log(je('remote'));