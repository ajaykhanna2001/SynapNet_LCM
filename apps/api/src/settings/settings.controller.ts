import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { SettingsService } from './settings.service';

@ApiTags('settings')
@Controller('settings')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }
}
