import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AirQualityService } from './services/air-quality.service';
import { AirQualityController } from './controllers/air-quality.controller';
import { PollutionRecord } from './entities/pollution-record.entity';
import { AirQualityCron } from './jobs/air-quality.cron';

@Module({
  imports: [TypeOrmModule.forFeature([PollutionRecord])],
  controllers: [AirQualityController],
  providers: [AirQualityService, AirQualityCron]
})
export class AirQualityModule {
}
