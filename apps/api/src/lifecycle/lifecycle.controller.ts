import { Controller, Get, Post, UseGuards, Query, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LifecycleService } from './lifecycle.service';
import { UserRole } from '@fleetops/shared';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('lifecycle')
@Controller('lifecycle')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LifecycleController {
  constructor(private lifecycleService: LifecycleService) {}

  @Get('catalog')
  @ApiOperation({ summary: 'Get lifecycle catalog entries' })
  @ApiResponse({ status: 200, description: 'Catalog entries retrieved successfully' })
  async getCatalogEntries(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.lifecycleService.getCatalogEntries(page || 1, limit || 20);
  }

  @Post('catalog')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Create lifecycle catalog entry' })
  @ApiResponse({ status: 201, description: 'Catalog entry created successfully' })
  async createCatalogEntry(@Body() createEntryDto: {
    vendor: string;
    product: string;
    version: string;
    releaseDate?: string;
    endOfSupport?: string;
    endOfLife?: string;
  }) {
    return this.lifecycleService.createCatalogEntry({
      ...createEntryDto,
      releaseDate: createEntryDto.releaseDate ? new Date(createEntryDto.releaseDate) : undefined,
      endOfSupport: createEntryDto.endOfSupport ? new Date(createEntryDto.endOfSupport) : undefined,
      endOfLife: createEntryDto.endOfLife ? new Date(createEntryDto.endOfLife) : undefined,
    });
  }

  @Post('reconcile')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Reconcile lifecycle buckets' })
  @ApiResponse({ status: 200, description: 'Lifecycle buckets reconciled successfully' })
  async reconcileLifecycleBuckets() {
    return this.lifecycleService.reconcileLifecycleBuckets();
  }
}