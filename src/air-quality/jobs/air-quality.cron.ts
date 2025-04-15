import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { AirQualityService } from '../services/air-quality.service';

@Injectable()
export class AirQualityCron {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Cron('*/1 * * * *')
  async handleCron(): Promise<void> {
    console.log('Fetching air quality data for Paris...');
    await this.airQualityService.fetchAndSaveAirQualityDataForParis();
  }
}