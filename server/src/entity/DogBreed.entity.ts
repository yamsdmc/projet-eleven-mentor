import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Comment} from "./Comment.entity";

@Entity()
export class DogBreed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    likes: number;

    @OneToMany(() => Comment, (commentEntity) => commentEntity.breed)
    comment: Comment[];
}
