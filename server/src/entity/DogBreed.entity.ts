import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DogBreedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    description: string;

    @Column()
    test: string;

    @Column()
    image: string;

    @Column()
    likes: number;
}
