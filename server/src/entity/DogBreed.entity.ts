import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Comment} from "./Comment.entity";

@Entity()
export class DogBreed {
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

    @OneToMany(() => Comment, (commentEntity) => commentEntity.breed)
    comment: Comment[];
}
