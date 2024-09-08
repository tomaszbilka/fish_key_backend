import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetTokens1725626472387 implements MigrationInterface {
  name = 'AddResetTokens1725626472387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "resetTokens" ("id" SERIAL NOT NULL, "resetToken" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "REL_faa776436b5a4667604610aa32" UNIQUE ("userId"), CONSTRAINT "PK_0fd60b2018e10794db1a3aa7ca9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "resetTokens" ADD CONSTRAINT "FK_faa776436b5a4667604610aa32b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "resetTokens" DROP CONSTRAINT "FK_faa776436b5a4667604610aa32b"`,
    );
    await queryRunner.query(`DROP TABLE "resetTokens"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
