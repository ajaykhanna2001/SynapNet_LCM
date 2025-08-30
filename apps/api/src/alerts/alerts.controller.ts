import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { AlertsService } from './alerts.service';

@ApiTags('alerts')
@Controller('alerts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get()
  async getAlerts() {
    return this.alertsService.getAlerts();
  }
}
