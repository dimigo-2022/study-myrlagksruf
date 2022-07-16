import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("a*b")
  getHello(): string {
    return this.appService.getHello();
  }
}
