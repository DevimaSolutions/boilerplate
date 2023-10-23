import { genSaltSync, hashSync } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1698049105390 implements MigrationInterface {
  name = 'Initial1698049105390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminEmail = 'admin@devima.solutions';
    const adminPassword = 'Test1234';

    const adminPasswordHash = hashSync(adminPassword, genSaltSync());

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(
      `CREATE TABLE "email_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" integer NOT NULL, "template_id" integer NOT NULL, CONSTRAINT "PK_06c564c515d8cdb40b6f3bfbbb4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('0', '1')`);
    await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('0', '1', '2')`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT '0', "status" "public"."users_status_enum" NOT NULL DEFAULT '1', "image_uri" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    await queryRunner.manager.query(
      `INSERT INTO users (email, password, role) VALUES ('${adminEmail}', '${adminPasswordHash}', '1')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "email_templates"`);
  }
}
