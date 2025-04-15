import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirQualityModule } from './air-quality/air-quality.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [AirQualityModule,    
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {}
