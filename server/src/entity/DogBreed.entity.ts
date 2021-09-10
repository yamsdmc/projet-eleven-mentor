import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CommentEntity} from "./Comment.entity";

@Entity()
export class DogBreedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    likes: number;

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.breed)
    comment: CommentEntity[];
}
