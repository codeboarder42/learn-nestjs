import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlphaMigration implements MigrationInterface {
  name = 'AlphaMigration';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user`(`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `isActive` bool DEFAULT true, PRIMARY KEY(`ID`)) ENGINE=InnoDb',
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user`');
  }
}
