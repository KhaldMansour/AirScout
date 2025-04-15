import { ApiProperty } from '@nestjs/swagger';

export class Pollution {
  @ApiProperty({
    description: 'Timestamp of the air quality data.',
    example: '2025-04-15T00:00:00.000Z',
    type: String
  })
    ts: string;

  @ApiProperty({
    description: 'Air Quality Index (AQI) in the US scale.',
    example: 62,
    type: Number
  })
    aqius: number;

  @ApiProperty({
    description: 'Main pollutant in the US (e.g., PM2.5).',
    example: 'p2',
    type: String
  })
    mainus: string;

  @ApiProperty({
    description: 'Air Quality Index (AQI) in the China scale.',
    example: 22,
    type: Number
  })
    aqicn: number;

  @ApiProperty({
    description: 'Main pollutant in China (e.g., PM2.5).',
    example: 'p2',
    type: String
  })
    maincn: string;
}

export class AirQualityResponse {
  @ApiProperty({
    description: 'The result object that contains the pollution data.',
    type: Object
  })
    Result: {
    Pollution: Pollution;
  };
}
