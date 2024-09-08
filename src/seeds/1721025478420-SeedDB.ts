import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1721025478420 implements MigrationInterface {
  name = 'SeedDB1721025478420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      //password 123
      `INSERT INTO users  (email, password) VALUES (
            'bbdevpl@gmail.com', '$2b$10$hFZeriyKhDdh9XVoR4xB/ujcuwAx8t5VrcXhMqNIQdop6uglNKkOe'
        ), (
            'admin@user.pl', '$2b$10$hFZeriyKhDdh9XVoR4xB/ujcuwAx8t5VrcXhMqNIQdop6uglNKkOe' 
        )`,
    );
  }

  public async down(): Promise<void> {}
}
