import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetNearestCityAirQualityDto } from '../dto/get-nearest-city-air-quality.dto';
import { AirQualityResponse } from '../types/air-quality-response.interface';
import { PollutionRecord } from '../entities/pollution-record.entity';

@Injectable()
export class AirQualityService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly apiVersion: string;
  constructor(
        private readonly configService: ConfigService,
        @InjectRepository(PollutionRecord)
    private readonly pollutionRecordRepository: Repository<PollutionRecord>
  ) {
    this.baseUrl = this.configService.get<string>('IQAIR_BASE_URL');
    this.apiKey = this.configService.get<string>('IQAIR_API_KEY');
    this.apiVersion = this.configService.get<string>('IQAIR_API_VERSION');
  }
    
  async fetchNearestCityAirQuality(dto: GetNearestCityAirQualityDto): Promise<AirQualityResponse> {
    const { latitude, longitude } = dto;        
    const url = `${this.baseUrl}${this.apiVersion}nearest_city?lat=${latitude}&lon=${longitude}&key=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch air quality data: ${response.statusText}`);
    }
    
    const data = await response.json();

    return {
      Result: {
        Pollution: data.data?.current?.pollution
      }
    };
  }

  async fetchAndSaveAirQualityDataForParis(): Promise<void> {
    const longitude = 2.352222;
    const latitude = 48.856613;
    const url = `${this.baseUrl}${this.apiVersion}nearest_city?lat=${latitude}&lon=${longitude}&key=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch air quality data: ${response.statusText}`);
    }
  
    const data = await response.json();
    const pollution = data.data?.current?.pollution;
            
    if (pollution) {
      const record = this.pollutionRecordRepository.create({
        timestamp: new Date().toISOString(),
        city: data.data?.city,
        state: data.data?.state,
        country: data.data?.country,
        aqius: pollution.aqius,
        mainus: pollution.mainus,
        aqicn: pollution.aqicn,
        maincn: pollution.maincn
      });
  
      await this.pollutionRecordRepository.save(record);
    }
  }

  async getParisMostPollutedTime(): Promise<string | null> {
    const result = await this.pollutionRecordRepository
      .createQueryBuilder('pollutionRecords')
      .orderBy('pollutionRecords.aqius', 'DESC') 
      .limit(1) 
      .getOne();
    
    return result ? result.timestamp : null;
  }
}
