import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VulnerabilitiesService {
  constructor(private prisma: PrismaService) {}

  async getVulnerabilities(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [vulnerabilities, total] = await Promise.all([
      this.prisma.vulnerability.findMany({
        skip,
        take: limit,
        orderBy: { publishedDate: 'desc' },
      }),
      this.prisma.vulnerability.count(),
    ]);

    return {
      vulnerabilities,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}