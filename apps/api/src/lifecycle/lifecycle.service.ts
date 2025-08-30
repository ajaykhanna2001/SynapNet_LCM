import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LifecycleBucket, calculateLifecycleBucket } from '@fleetops/shared';

@Injectable()
export class LifecycleService {
  constructor(private prisma: PrismaService) {}

  async getCatalogEntries(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const [entries, total] = await Promise.all([
      this.prisma.lifecycleCatalogEntry.findMany({
        skip,
        take: limit,
        orderBy: [
          { vendor: 'asc' },
          { product: 'asc' },
          { version: 'asc' },
        ],
      }),
      this.prisma.lifecycleCatalogEntry.count(),
    ]);

    return {
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createCatalogEntry(data: {
    vendor: string;
    product: string;
    version: string;
    releaseDate?: Date;
    endOfSupport?: Date;
    endOfLife?: Date;
  }) {
    const bucket = calculateLifecycleBucket(
      data.releaseDate,
      data.endOfSupport,
      data.endOfLife
    );

    return this.prisma.lifecycleCatalogEntry.create({
      data: {
        ...data,
        bucket,
      },
    });
  }

  async reconcileLifecycleBuckets() {
    const entries = await this.prisma.lifecycleCatalogEntry.findMany();
    
    for (const entry of entries) {
      const newBucket = calculateLifecycleBucket(
        entry.releaseDate,
        entry.endOfSupport,
        entry.endOfLife
      );
      
      if (newBucket !== entry.bucket) {
        await this.prisma.lifecycleCatalogEntry.update({
          where: { id: entry.id },
          data: { bucket: newBucket },
        });
      }
    }
    
    return { message: 'Lifecycle buckets reconciled successfully' };
  }
}