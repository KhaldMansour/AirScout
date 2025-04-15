import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PollutionRecord } from '../entities/pollution-record.entity';

import { AirQualityService } from './air-quality.service';

type ConfigKey = 'IQAIR_BASE_URL' | 'IQAIR_API_KEY' | 'IQAIR_API_VERSION';

const mockConfigService = {
  get: jest.fn((key: ConfigKey) => {
    const config = {
      IQAIR_BASE_URL: 'https://api.airvisual.com/',
      IQAIR_API_KEY: 'dummy-key',
      IQAIR_API_VERSION: 'v2/'
    };
    return config[key];
  })
};

const mockGetOne = jest.fn();

const mockQueryBuilder = {
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  getOne: mockGetOne
};

const mockPollutionRepo = {
  create: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn(() => mockQueryBuilder)
};

describe('AirQualityService', () => {
  let service: AirQualityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getRepositoryToken(PollutionRecord), useValue: mockPollutionRepo }
      ]
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchNearestCityAirQuality', () => {
    it('should return pollution data for given coordinates', async () => {
      const mockResponse = {
        data: {
          current: {
            pollution: {
              aqius: 65,
              mainus: 'p2',
              aqicn: 45,
              maincn: 'p1'
            }
          }
        }
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        } as Response)
      );

      const result = await service.fetchNearestCityAirQuality({
        latitude: 48.85,
        longitude: 2.35
      });

      expect(result).toEqual({
        Result: {
          Pollution: mockResponse.data.current.pollution
        }
      });
    });

    it('should throw if fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Bad Request'
        } as Response)
      );

      await expect(
        service.fetchNearestCityAirQuality({ latitude: 48.85, longitude: 2.35 })
      ).rejects.toThrow('Failed to fetch air quality data: Bad Request');
    });
  });

  describe('fetchAndSaveAirQualityDataForParis', () => {
    it('should fetch and save pollution data for Paris', async () => {
      const pollution = {
        aqius: 70,
        mainus: 'pm2.5',
        aqicn: 55,
        maincn: 'pm10'
      };

      const mockApiResponse = {
        data: {
          city: 'Paris',
          state: 'Ile-de-France',
          country: 'France',
          current: {
            pollution
          }
        }
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponse)
        } as Response)
      );

      mockPollutionRepo.create.mockReturnValueOnce({ ...pollution, timestamp: 'now' });
      await service.fetchAndSaveAirQualityDataForParis();

      expect(mockPollutionRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        city: 'Paris',
        aqius: 70
      }));
      expect(mockPollutionRepo.save).toHaveBeenCalled();
    });

    it('should not save if pollution data is missing', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { current: {} } })
        } as Response)
      );

      await service.fetchAndSaveAirQualityDataForParis();

      expect(mockPollutionRepo.create).not.toHaveBeenCalled();
      expect(mockPollutionRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('getParisMostPollutedTime', () => {
    it('should return the timestamp of the most polluted record', async () => {
      mockPollutionRepo.createQueryBuilder().getOne.mockResolvedValue({
        timestamp: '2024-04-01T12:00:00Z'
      });

      const result = await service.getParisMostPollutedTime();
      expect(result).toBe('2024-04-01T12:00:00Z');
    });

    it('should return null if no records are found', async () => {
      mockPollutionRepo.createQueryBuilder().getOne.mockResolvedValue(null);
      const result = await service.getParisMostPollutedTime();
      expect(result).toBeNull();
    });
  });
});
