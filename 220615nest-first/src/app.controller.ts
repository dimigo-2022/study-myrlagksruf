import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest } from 'fastify';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  Hello(@Req() request:FastifyRequest): string {
    console.log(request.url);
    return this.appService.getHello();
  }
}
