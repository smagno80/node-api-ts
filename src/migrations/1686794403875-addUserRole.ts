import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1686794403875 implements MigrationInterface {
  name = 'AddUserRole1686794403875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'ADMIN') NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
  }
}
