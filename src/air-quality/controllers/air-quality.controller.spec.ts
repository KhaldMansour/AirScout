import { Test, TestingModule } from '@nestjs/testing';

import { AirQualityService } from '../services/air-quality.service';
import { GetNearestCityAirQualityDto } from '../dto/get-nearest-city-air-quality.dto';
import { AirQualityResponse } from '../types/air-quality-response.interface';

import { AirQualityController } from './air-quality.controller';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let service: AirQualityService;

  const mockAirQualityService = {
    fetchNearestCityAirQuality: jest.fn(),
    getParisMostPollutedTime: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        {
          provide: AirQualityService,
          useValue: mockAirQualityService
        }
      ]
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    service = module.get<AirQualityService>(AirQualityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNearestCityAirQuality', () => {
    it('should return air quality data', async () => {
      const query: GetNearestCityAirQualityDto = { latitude: 48.85, longitude: 2.35 };

      const mockResponse: AirQualityResponse = {
        Result: {
          Pollution: {
            ts: '2025-04-15T03:00:00.000Z',
            aqius: 52,
            mainus: 'p2',
            aqicn: 14,
            maincn: 'p2'
          }
        }
      };

      mockAirQualityService.fetchNearestCityAirQuality.mockResolvedValue(mockResponse);

      const result = await controller.getNearestCityAirQuality(query);

      expect(service.fetchNearestCityAirQuality).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getParisMostPollutedTime', () => {
    it('should return the datetime when Paris was most polluted', async () => {
      const mockDate = '2025-04-15T15:00:00.000Z';

      mockAirQualityService.getParisMostPollutedTime.mockResolvedValue(mockDate);

      const result = await controller.getParisMostPollutedTime();

      expect(service.getParisMostPollutedTime).toHaveBeenCalled();
      expect(result).toBe(mockDate);
    });

    it('should return null if no data is available', async () => {
      mockAirQualityService.getParisMostPollutedTime.mockResolvedValue(null);

      const result = await controller.getParisMostPollutedTime();

      expect(result).toBeNull();
    });
  });
});
