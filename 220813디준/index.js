// boolean : true, false

let str = 'a';

if(str){
    console.log(str);
}

// falsy value
// 0
// ''
// null
// undefined
// false
// NaN

// truly value

// 비교연산자
// >        크다
// <        작다
// >=       크거나 같다
// <=       작거나 같다
// ===      같다
// !==      다르다

if(1 !== '1'){
    console.log('???');
}

// 논리연산자
// &&       그리고
// ||       또는

let x = 2022;

if(x > 2000){
    console.log('good');
}


// 10 보다 크다, 그리고, 20보다 작다
x = 15;

if(10 < x && x < 20){
    console.log('10보다 크고 20보다 작다');
}

// 10보다 작거나, 20보다 크다

if(10 > x || x > 20){
    console.log('10보다 작거나 20보다 크다');
}

// 윤년체크
// 2월에 29일
// 년도가 4의 배수인데, 100의 배수가 아니면 윤년
// 그런데 400의 배수면 윤년

let year = 100;
if(true/**/){
    console.log('윤년');
}

// let y = 10;

// if(y > 10){
//     console.log(10);
// } else if(y > 6){
//     console.log(6);
// }

year = 2104;

if(year % 4 === 0 && year % 100 !== 0){
    console.log('윤년');
} else if(year % 400 === 0){
    console.log('윤년2');
}


let y = 40;
if(y > 50){
    console.log(50);
} else if(y > 40){
    console.log(60);
} else {
    console.log('나머지')
}