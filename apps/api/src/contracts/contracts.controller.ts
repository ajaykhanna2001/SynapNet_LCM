import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContractStatus, UserRole } from '@fleetops/shared';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import { ContractsService } from './contracts.service';

@ApiTags('contracts')
@Controller('contracts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Get()
  @ApiOperation({ summary: 'Get contracts' })
  @ApiResponse({ status: 200, description: 'Contracts retrieved successfully' })
  async getContracts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.contractsService.getContracts(page || 1, limit || 20);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Create contract' })
  @ApiResponse({ status: 201, description: 'Contract created successfully' })
  async createContract(@Body() createContractDto: {
    vendor: string;
    contractNumber: string;
    startDate: string;
    endDate: string;
    value: number;
    renewalNoticeMonths?: number;
  }) {
    return this.contractsService.createContract({
      ...createContractDto,
      startDate: new Date(createContractDto.startDate),
      endDate: new Date(createContractDto.endDate),
    });
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Update contract' })
  @ApiResponse({ status: 200, description: 'Contract updated successfully' })
  async updateContract(
    @Param('id') id: string,
    @Body() updateContractDto: Partial<{
      vendor: string;
      contractNumber: string;
      startDate: string;
      endDate: string;
      value: number;
      status: ContractStatus;
      renewalNoticeMonths: number;
    }>,
  ) {
    const data = { ...updateContractDto } as any;
    if (updateContractDto.startDate) {
      (data as any).startDate = new Date(updateContractDto.startDate);
    }
    if (updateContractDto.endDate) {
      (data as any).endDate = new Date(updateContractDto.endDate);
    }
    
    return this.contractsService.updateContract(id, data);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete contract' })
  @ApiResponse({ status: 200, description: 'Contract deleted successfully' })
  async deleteContract(@Param('id') id: string) {
    return this.contractsService.deleteContract(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contract by ID' })
  @ApiResponse({ status: 200, description: 'Contract retrieved successfully' })
  async getContractById(@Param('id') id: string) {
    return this.contractsService.getContractById(id);
  }
}