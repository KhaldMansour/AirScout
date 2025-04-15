import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AirQualityController (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/air-quality/nearest-city (GET)', () => {
    it('should return air quality data for given coordinates', async () => {
      const response = await request(app.getHttpServer())
        .get('/air-quality/nearest-city')
        .query({ latitude: 48.85, longitude: 2.35 });

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.data.Result).toHaveProperty('Pollution');
      expect(response.body.data.Result.Pollution).toHaveProperty('aqius');
    });

    it('should return 400 if required query params are missing', async () => {
      const response = await request(app.getHttpServer())
        .get('/air-quality/nearest-city');
        
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);  
      expect(response.body.error).toContain('latitude should not be empty');
    });
  });

  describe('/air-quality/paris-most-polluted-time (GET)', () => {
    it('should return most polluted time for Paris', async () => {
      const response = await request(app.getHttpServer())
        .get('/air-quality/paris-most-polluted-time');

      expect(response.status).toBe(HttpStatus.OK);  
      expect(response.body.data).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });
});
