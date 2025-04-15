import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePollutionRecordsTable1744696318026 implements MigrationInterface {
  name = 'CreatePollutionRecordsTable1744696318026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `pollution_records` (`id` int NOT NULL AUTO_INCREMENT, `timestamp` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `country` varchar(255) NOT NULL, `aqius` int NOT NULL, `mainus` varchar(255) NOT NULL, `aqicn` int NOT NULL, `maincn` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `pollution_records`');
  }
}
