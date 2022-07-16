import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';


const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter()
);

try{
  await app.listen(4000, '0.0.0.0');
} catch(err){
  console.log(err);
}

