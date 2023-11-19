import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGoogleAuthOption1699280092809 implements MigrationInterface {
  name = 'AddGoogleAuthOption1699280092809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_email_verified" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "google_account_id" character varying`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_account_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_email_verified"`);
  }
}
