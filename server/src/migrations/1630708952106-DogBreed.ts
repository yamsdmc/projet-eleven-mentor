import {MigrationInterface, QueryRunner} from "typeorm";

export class DogBreed1630708952106 implements MigrationInterface {
    name = 'DogBreed1630708952106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dog_breed" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_deca9734c3f499a05f8b0c8cb51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dog_breed_entity" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "likes" integer NOT NULL, CONSTRAINT "PK_809ba35189e7da4c78edc478380" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dog_breed_entity"`);
        await queryRunner.query(`DROP TABLE "dog_breed"`);
    }

}
