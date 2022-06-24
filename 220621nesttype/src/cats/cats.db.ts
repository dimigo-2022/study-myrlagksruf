import source from "../database.js";
import { Cat } from '../database/Cat.js';

export const CatMan = source.getRepository(Cat);