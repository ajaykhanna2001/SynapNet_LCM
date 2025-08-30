import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getJobs() {
    return this.jobsService.getJobs();
  }
}
