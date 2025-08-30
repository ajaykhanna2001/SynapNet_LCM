import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventType, Priority, LifecycleBucket, calculateLifecycleBucket } from '@fleetops/shared';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getEvents(
    eventType?: EventType,
    startDate?: Date,
    endDate?: Date,
    page = 1,
    limit = 20,
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (eventType) {
      where.eventType = eventType;
    }

    if (startDate && endDate) {
      where.startDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    const [events, total] = await Promise.all([
      this.prisma.calendarEvent.findMany({
        where,
        skip,
        take: limit,
        include: {
          asset: true,
          contract: true,
        },
        orderBy: {
          startDate: 'asc',
        },
      }),
      this.prisma.calendarEvent.count({ where }),
    ]);

    return {
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createEvent(data: {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    eventType: EventType;
    priority?: Priority;
    assetId?: string;
    contractId?: string;
  }) {
    // Calculate lifecycle bucket if asset is provided
    let lifecycleBucket = LifecycleBucket.ACTIVE;
    
    if (data.assetId) {
      const asset = await this.prisma.asset.findUnique({
        where: { id: data.assetId },
      });
      
      if (asset) {
        lifecycleBucket = asset.lifecycleBucket;
      }
    }

    return this.prisma.calendarEvent.create({
      data: {
        ...data,
        lifecycleBucket,
        priority: data.priority || Priority.MEDIUM,
      },
      include: {
        asset: true,
        contract: true,
      },
    });
  }

  async updateEvent(id: string, data: Partial<{
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    eventType: EventType;
    priority: Priority;
  }>) {
    return this.prisma.calendarEvent.update({
      where: { id },
      data,
      include: {
        asset: true,
        contract: true,
      },
    });
  }

  async deleteEvent(id: string) {
    return this.prisma.calendarEvent.delete({
      where: { id },
    });
  }

  async getEventById(id: string) {
    return this.prisma.calendarEvent.findUnique({
      where: { id },
      include: {
        asset: true,
        contract: true,
      },
    });
  }

  async exportEventsToCSV(eventType?: EventType): Promise<string> {
    const where = eventType ? { eventType } : {};
    
    const events = await this.prisma.calendarEvent.findMany({
      where,
      include: {
        asset: {
          select: { name: true },
        },
        contract: {
          select: { vendor: true, contractNumber: true },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    const headers = [
      'Title',
      'Description',
      'Start Date',
      'End Date',
      'Event Type',
      'Priority',
      'Asset',
      'Contract',
      'Lifecycle Bucket',
    ];

    const rows = events.map(event => [
      event.title,
      event.description || '',
      event.startDate.toISOString(),
      event.endDate.toISOString(),
      event.eventType,
      event.priority,
      event.asset?.name || '',
      event.contract ? `${event.contract.vendor} (${event.contract.contractNumber})` : '',
      event.lifecycleBucket,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
  }
}