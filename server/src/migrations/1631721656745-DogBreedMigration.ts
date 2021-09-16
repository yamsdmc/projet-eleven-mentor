import {MigrationInterface, QueryRunner} from "typeorm";

export class DogBreedMigration1631721656745 implements MigrationInterface {
    name = 'DogBreedMigration1631721656745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "likes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "likes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."dog_breed" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
