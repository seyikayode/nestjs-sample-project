import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedPhone1742983698987 implements MigrationInterface {
    name = 'RemovedPhone1742983698987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
