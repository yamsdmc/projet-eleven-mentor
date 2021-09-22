import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DogBreed} from "./DogBreed.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Column()
    pseudo: string;

    @Column()
    message: string;

    @ManyToOne(() => DogBreed, (dogBreedEntity) => dogBreedEntity.comment)
    breed: DogBreed;
}
