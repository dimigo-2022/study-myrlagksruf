const res = await fetch('https://www.naver.com');
const txt = await res.text();
console.log(txt);

// fetch, Promise, class


// Promise
// pending      아직 실행 완료 안됨
// fulfilled    실행 완료
// rejected     오류

export {};