import { Injectable } from '@nestjs/common';

const htmlTemp = (...arr:string[]) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
</head>
<body>
${arr.join('')}
</body>
</html>`


@Injectable()
export class LoginService {
    login(){
        return htmlTemp('<div>로그인 : <input type="text" id="id" /><br>패스워드 : <input type="password" id="pw" /></div>', 
        `<script>
        const div = document.querySelector('div');
        div.addEventListener('keydown', async e => {
            if(e.code !== 'Enter') return;
            const res = await fetch('/login', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(Object.fromEntries(Array.from(document.querySelectorAll('input')).map(v => [v.id, v.value])))
            });
            const status = await res.json();
            if(status.status){
                location.href = status.url
            }
        });</script>`);
    }
}
