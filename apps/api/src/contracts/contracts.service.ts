import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractStatus } from '@fleetops/shared';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async getContracts(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const [contracts, total] = await Promise.all([
      this.prisma.contract.findMany({
        skip,
        take: limit,
        include: {
          assets: true,
          _count: {
            select: { assets: true },
          },
        },
        orderBy: {
          endDate: 'asc',
        },
      }),
      this.prisma.contract.count(),
    ]);

    return {
      contracts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createContract(data: {
    vendor: string;
    contractNumber: string;
    startDate: Date;
    endDate: Date;
    value: number;
    renewalNoticeMonths?: number;
  }) {
    return this.prisma.contract.create({
      data: {
        ...data,
        renewalNoticeMonths: data.renewalNoticeMonths || 3,
      },
    });
  }

  async updateContract(id: string, data: Partial<{
    vendor: string;
    contractNumber: string;
    startDate: Date;
    endDate: Date;
    value: number;
    status: ContractStatus;
    renewalNoticeMonths: number;
  }>) {
    return this.prisma.contract.update({
      where: { id },
      data,
    });
  }

  async deleteContract(id: string) {
    return this.prisma.contract.delete({
      where: { id },
    });
  }

  async getContractById(id: string) {
    return this.prisma.contract.findUnique({
      where: { id },
      include: {
        assets: true,
      },
    });
  }
}