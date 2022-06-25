import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cat{
    @PrimaryGeneratedColumn("uuid")
    id:number;

    @Column({
        length: 50
    })
    name: string;

    @Column("text")
    description:string;

    @Column("int")
    age: number;
}