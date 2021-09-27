import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DogBreed as DogBreedEntity} from "./DogBreed.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @Column()
    pseudo: string;

    @Column()
    message: string;

    @ManyToOne(() => DogBreedEntity, (dogBreed) => dogBreed.comments)
    breed: DogBreedEntity;
}
