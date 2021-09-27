import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Comment} from "./Comment.entity";

@Entity()
export class DogBreed {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column({nullable: true})
    likes: number;

    @OneToMany(() => Comment, (commentEntity) => commentEntity.breed)
    comments: Comment[];
}
