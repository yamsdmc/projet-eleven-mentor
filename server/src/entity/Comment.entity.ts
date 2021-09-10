import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DogBreedEntity} from "./DogBreed.entity";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @ManyToOne(() => DogBreedEntity, (dogBreedEntity) => dogBreedEntity.comment)
    breed: DogBreedEntity;
}
