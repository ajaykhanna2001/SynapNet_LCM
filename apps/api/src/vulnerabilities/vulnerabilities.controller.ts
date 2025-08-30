import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { VulnerabilitiesService } from './vulnerabilities.service';

@ApiTags('vulnerabilities')
@Controller('vulnerabilities')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class VulnerabilitiesController {
  constructor(private vulnerabilitiesService: VulnerabilitiesService) {}

  @Get()
  async getVulnerabilities(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.vulnerabilitiesService.getVulnerabilities(page || 1, limit || 20);
  }
}