import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetNearestCityAirQualityDto {
  @ApiProperty({
    description: 'The latitude of the city for which to fetch air quality data.',
    example: 30.00808,
    type: Number
  })
  @IsNotEmpty()
  @IsLatitude()
    latitude: number;

  @ApiProperty({
    description: 'The longitude of the city for which to fetch air quality data.',
    example: 31.21093,
    type: Number
  })
  @IsNotEmpty()
  @IsLongitude()
    longitude: number;
}
