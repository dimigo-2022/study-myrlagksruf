import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatsModule } from './cats/cats.module.js';
import { LoginModule } from './login/login.module.js';

@Module({
  imports: [CatsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
