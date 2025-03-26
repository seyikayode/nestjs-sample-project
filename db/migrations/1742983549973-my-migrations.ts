import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigrations1742983549973 implements MigrationInterface {
    name = 'MyMigrations1742983549973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artistes" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_f7579078456d8aed6879c9b5a1" UNIQUE ("userId"), CONSTRAINT "PK_90f112b1de4c6d92db690677656" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "releasedDate" date NOT NULL, "duration" TIME NOT NULL, "lyrics" text NOT NULL, "playlistId" integer, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlists" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "twoFASecret" text, "enable2FA" boolean NOT NULL DEFAULT false, "apiKey" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs_artistes" ("songsId" integer NOT NULL, "artistesId" integer NOT NULL, CONSTRAINT "PK_a351a1d4f370bc6424408761060" PRIMARY KEY ("songsId", "artistesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59aaa2cd3f3dc80095958fb508" ON "songs_artistes" ("songsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3777df968239a8f042cc5dbe2e" ON "songs_artistes" ("artistesId") `);
        await queryRunner.query(`ALTER TABLE "artistes" ADD CONSTRAINT "FK_f7579078456d8aed6879c9b5a16" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_46fc694bda96d0127f5a8ec3720" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs_artistes" ADD CONSTRAINT "FK_59aaa2cd3f3dc80095958fb5089" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "songs_artistes" ADD CONSTRAINT "FK_3777df968239a8f042cc5dbe2ed" FOREIGN KEY ("artistesId") REFERENCES "artistes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs_artistes" DROP CONSTRAINT "FK_3777df968239a8f042cc5dbe2ed"`);
        await queryRunner.query(`ALTER TABLE "songs_artistes" DROP CONSTRAINT "FK_59aaa2cd3f3dc80095958fb5089"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_46fc694bda96d0127f5a8ec3720"`);
        await queryRunner.query(`ALTER TABLE "artistes" DROP CONSTRAINT "FK_f7579078456d8aed6879c9b5a16"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3777df968239a8f042cc5dbe2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59aaa2cd3f3dc80095958fb508"`);
        await queryRunner.query(`DROP TABLE "songs_artistes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "artistes"`);
    }

}
