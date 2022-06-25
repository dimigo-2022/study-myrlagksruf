import { DataSource } from "typeorm";
import { Cat } from "./database/Cat.js";
import path from 'path';
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const AppDataSource = new DataSource({
    type:"sqlite",
    database:path.resolve(__dirname, '../data', 'main.db'),
    entities:[Cat],
    synchronize:true
});

const source = await AppDataSource.initialize();

export default source;