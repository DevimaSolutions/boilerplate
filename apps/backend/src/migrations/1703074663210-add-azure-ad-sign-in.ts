import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAzureAdSignIn1703074663210 implements MigrationInterface {
  name = 'AddAzureAdSignIn1703074663210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "azure_ad_account_id" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "azure_ad_account_id"`);
  }
}
