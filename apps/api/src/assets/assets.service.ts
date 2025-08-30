import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async getAssets(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [assets, total] = await Promise.all([
      this.prisma.asset.findMany({
        skip,
        take: limit,
        include: { contract: true },
        orderBy: { name: 'asc' },
      }),
      this.prisma.asset.count(),
    ]);

    return {
      assets,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}