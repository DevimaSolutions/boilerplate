import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

import { AppService } from './app.service';
import { HealthCheckDto } from './dto/health-check.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ThrottlerGuard)
  @ApiTags('Health')
  @ApiOperation({ description: 'Check if the app is healthy' })
  @Get()
  getHealthCheck(): HealthCheckDto {
    return this.appService.getHealthCheck();
  }
}
