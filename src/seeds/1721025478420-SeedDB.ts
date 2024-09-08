import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1721025478420 implements MigrationInterface {
  name = 'SeedDB1721025478420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      //password123
      `INSERT INTO users  (email, password) VALUES (
            'bbdevpl@gmail.com', '$2b$10$Y7ltmHChpPY4cZXsn7p7HuvXS2lCWDdCTpkjOKwd6weiTdIrIek7i'
        ), (
            'admin@user.pl', '$2b$10$Y7ltmHChpPY4cZXsn7p7HuvXS2lCWDdCTpkjOKwd6weiTdIrIek7i' 
        )`,
    );
  }

  public async down(): Promise<void> {}
}
