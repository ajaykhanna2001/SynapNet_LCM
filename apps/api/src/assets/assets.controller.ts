import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { AssetsService } from './assets.service';

@ApiTags('assets')
@Controller('assets')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Get()
  async getAssets(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.assetsService.getAssets(page || 1, limit || 20);
  }
}