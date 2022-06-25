import { Injectable } from '@nestjs/common';
import { CatMan } from './cats.db.js';
import { Cat } from '../database/Cat.js';

@Injectable()
export class CatsService {
    private _count = 0;
    async count(){
        return await CatMan.count();
    }

    async create(obj:Omit<Cat, 'id'>){
        const cat = new Cat();
        Object.assign(cat, obj);
        return await CatMan.save(cat);
    }

    async view(){
        const cats = await CatMan.find();
        return cats;
    }

    say(){
        return 'meow';
    }
}
