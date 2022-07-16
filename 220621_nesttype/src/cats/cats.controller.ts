import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service.js';
import { RolesGuard } from '../guard/role.guard.js';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    constructor(private readonly catsService: CatsService){}

    @Get()
    async count(){
        return await this.catsService.count();
    }

    @Get('create')
    async create(
        @Query('age') age:number,
        @Query('description') description:string,
        @Query('name') name:string
    ){
        const cat = await this.catsService.create({ age, description, name });
        return `${cat.id} 추가 성공`;
    }

    @Get('view')
    async view(){
        const cats = await this.catsService.view();
        return JSON.stringify(cats);
    }
}
