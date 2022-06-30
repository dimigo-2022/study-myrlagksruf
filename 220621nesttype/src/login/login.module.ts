import { Module } from '@nestjs/common';
import { LoginController } from './login.controller.js';
import { LoginService } from './login.service.js';

@Module({
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
