import { Module } from '@nestjs/common';

import { VulnerabilitiesService } from './vulnerabilities.service';
import { VulnerabilitiesController } from './vulnerabilities.controller';

@Module({
  providers: [VulnerabilitiesService],
  controllers: [VulnerabilitiesController],
  exports: [VulnerabilitiesService],
})
export class VulnerabilitiesModule {}
