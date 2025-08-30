import { Test, TestingModule } from '@nestjs/testing';
import { CalendarService } from './calendar.service';
import { PrismaService } from '../prisma/prisma.service';
import { LifecycleBucket, calculateLifecycleBucket } from '@fleetops/shared';

describe('CalendarService', () => {
  let service: CalendarService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalendarService,
        {
          provide: PrismaService,
          useValue: {
            calendarEvent: {
              findMany: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findUnique: jest.fn(),
            },
            asset: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEvents', () => {
    it('should return paginated events', async () => {
      const mockEvents = [
        {
          id: '1',
          title: 'Test Event',
          startDate: new Date(),
          endDate: new Date(),
          eventType: 'MAINTENANCE',
          priority: 'HIGH',
          lifecycleBucket: LifecycleBucket.ACTIVE,
        },
      ];

      jest.spyOn(prismaService.calendarEvent, 'findMany').mockResolvedValue(mockEvents as any);
      jest.spyOn(prismaService.calendarEvent, 'count').mockResolvedValue(1);

      const result = await service.getEvents();

      expect(result).toEqual({
        events: mockEvents,
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        },
      });
    });
  });

  describe('lifecycle bucket calculation', () => {
    it('should calculate NEW bucket for recent releases', () => {
      const releaseDate = new Date();
      releaseDate.setMonths(releaseDate.getMonth() - 6); // 6 months ago

      const bucket = calculateLifecycleBucket(releaseDate);
      expect(bucket).toBe(LifecycleBucket.NEW);
    });

    it('should calculate ACTIVE bucket for 2-year-old releases', () => {
      const releaseDate = new Date();
      releaseDate.setFullYear(releaseDate.getFullYear() - 2); // 2 years ago

      const bucket = calculateLifecycleBucket(releaseDate);
      expect(bucket).toBe(LifecycleBucket.ACTIVE);
    });

    it('should calculate MATURE bucket for 4-year-old releases', () => {
      const releaseDate = new Date();
      releaseDate.setFullYear(releaseDate.getFullYear() - 4); // 4 years ago

      const bucket = calculateLifecycleBucket(releaseDate);
      expect(bucket).toBe(LifecycleBucket.MATURE);
    });

    it('should calculate EOL bucket for products past end of life', () => {
      const releaseDate = new Date();
      releaseDate.setFullYear(releaseDate.getFullYear() - 5);
      
      const endOfLife = new Date();
      endOfLife.setMonths(endOfLife.getMonth() - 1); // 1 month ago

      const bucket = calculateLifecycleBucket(releaseDate, undefined, endOfLife);
      expect(bucket).toBe(LifecycleBucket.EOL);
    });

    it('should calculate LEGACY bucket for products approaching EOL', () => {
      const releaseDate = new Date();
      releaseDate.setFullYear(releaseDate.getFullYear() - 3);
      
      const endOfLife = new Date();
      endOfLife.setMonths(endOfLife.getMonth() + 3); // 3 months from now

      const bucket = calculateLifecycleBucket(releaseDate, undefined, endOfLife);
      expect(bucket).toBe(LifecycleBucket.LEGACY);
    });

    it('should default to ACTIVE for products without dates', () => {
      const bucket = calculateLifecycleBucket();
      expect(bucket).toBe(LifecycleBucket.ACTIVE);
    });
  });
});