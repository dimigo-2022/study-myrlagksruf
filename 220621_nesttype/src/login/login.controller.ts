import { Body, Controller, Get, Header, Post, Res } from '@nestjs/common';
import { iLoginData } from './login.js';
import { LoginService } from './login.service.js';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService){}

    @Get()
    @Header('content-type', 'text/html')
    login(){
        return this.loginService.login();
    }

    @Post()
    getLogin(@Body() data:iLoginData){
        console.log(data);
        return {status:true, url:'/login'};
    }
}
