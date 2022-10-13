const ban = (type, num) => Math[type](num);

const arr = [5, 10, 15, 20];

arr[-1] = 0;
let arr2 = {
    '-1':0,
    '0':5,
    '1':10,
    '2':15,
    '3':20,
    length:4
}

for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}

let obj = {
    abc:'Hello',
    def:'not Hello',
    ghi:'no'
};

for(let i in arr){
    console.log(i);
}

// Array-like Object
// for(let i in arr2){
//     console.log(i, arr2[i]);
// }

for(let i of arr){
    console.log(i);
}