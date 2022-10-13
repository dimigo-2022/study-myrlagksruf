Math.random()

// key 값의 타입은 무조건 string
Math['random']();

let n1 = '김한결';
let n2 = '박동규';
let n3 = '김경호';

let n = ['김한결', '박동규', '김경호'];

// 객체는 number, string, boolean, undefined 등의 값의 타입을 제외한 나머지 값
n['2'] = '강경호';


let obj = {
    ArrowLeft: false,
    ArrowRight: false,
}

// 정적으로 접근할 때
console.log(obj.ArrowLeft)
window.addEventListener('keydown', e => {
    // if(e.code === 'ArrowLeft'){
    //     ArrowLeft = true;
    // } else if(e.code === 'ArrowRight'){
    //     ArrowRight = true;
    // }

    // A instanceof B : A 객체가 B 객체가 맞냐?
    // A in B : A 속성이 B 안에 들어 있니?
    if(e.code in obj){
        obj[e.code] = true;
    }
});

window.addEventListener('keyup', e => {
    if(e.code in obj){
        obj[e.code] = false;
    }
})