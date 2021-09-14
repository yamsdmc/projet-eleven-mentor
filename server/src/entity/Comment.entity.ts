import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DogBreed} from "./DogBreed.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Column()
    comment: string;

    @ManyToOne(() => DogBreed, (dogBreedEntity) => dogBreedEntity.comment)
    breed: DogBreed;
}
