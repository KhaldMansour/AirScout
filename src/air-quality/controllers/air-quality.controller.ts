import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AirQualityService } from '../services/air-quality.service';
import { GetNearestCityAirQualityDto } from '../dto/get-nearest-city-air-quality.dto';
import { AirQualityResponse } from '../types/air-quality-response.interface';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

    @Get('nearest-city')
    @ApiOperation({ summary: 'Get the air quality for the nearest city' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'The air quality data for the nearest city.',
      type: AirQualityResponse
    })
  async getNearestCityAirQuality( @Query() query: GetNearestCityAirQualityDto): Promise<AirQualityResponse> {
    return await this.airQualityService.fetchNearestCityAirQuality(query);
  }

    @Get('paris-most-polluted-time')
    @ApiOperation({ summary: 'Get Paris most polluted time' })
    async getParisMostPollutedTime(): Promise<string | null> {
      const result = await this.airQualityService.getParisMostPollutedTime();
      return result;
    }
}
