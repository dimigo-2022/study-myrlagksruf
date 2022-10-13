// // 변수
// let a;
// let b = 30;

// // 우측 우선순위, 연산자, 피연산자
// let c = b = a = 20;
// console.log(a, b, c);

// // code block scope
// {
//     // 또 다른 c
//     let c = 30;
//     {
//         c = 40
//     }
//     console.log(c);
// }

// console.log(c);


// // 변수의 타입

// let d = 30
// console.log(typeof d);

// let e = '문자열';
// console.log(typeof e);

// console.log(typeof true);
// // console.log(typeof g);
// console.log(typeof null);
// console.log(typeof Math);



// // 산술 연산자, 비교 연산자, 논리 연산자
// // 산술 연산자 +, -, *, /, **
// // 비교 연산자 >, <, >=, <=, ===, !==
// // 논리 연산자 !, ||, &&

// console.log(!10 > 20)



// // truely value

// // falsy value
// /*
//     undefined
//     null
//     false
//     0
//     ''
//     NaN (Not A Number)
// */

// let g;

// console.log(1 + g);

// 호출
console.log(Math.floor(2.3))
console.log(Math.random())


// let a; let b; let c;
// 함수는 호출할 때만 실행이 된다. () <- 이거 써서
// return은 함수를 호출하고 나서의 결괏값을 준다.
// return은 함수를 그 즉시 종료한다.
// let d = 30;

// let add = (a, b) => {
//     return a + b
// }
let add = (a, b) => a + b;
let mul = (a, b) => a * b;
let jegob = a => a * a;

// console.log(((a, b) => a + b)(10, 20));
// console.log((a => b => a + b)(10)(20));

// let calc = (a, b, fun, deco) => {
//     return `calc! ${deco(a, b, fun)}`;
// }

// console.log(calc(20, 30, add, (a, b, f) => `deco! ${f(a, b)}`));
// console.log(calc(20, 40, mul));
