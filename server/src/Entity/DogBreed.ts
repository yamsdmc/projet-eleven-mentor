import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DogBreed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;
}
