import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

describe('AvailabilityService', () => {
  let service: AvailabilityService;
  let prisma: { availability: { create: jest.Mock }; activity: { findUnique: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      availability: {
        create: jest.fn(),
      },
      activity: {
        findUnique: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<AvailabilityService>(AvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByActivityId', () => {
    it('should throw NotFoundException when activity does not exist', async () => {
      prisma.activity.findUnique.mockResolvedValue(null);

      await expect(service.findByActivityId('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should reject when endsAt is before startsAt', async () => {
      const dto: CreateAvailabilityDto = {
        activityId: 'valid-uuid',
        startsAt: '2025-01-10T10:00:00Z',
        endsAt: '2025-01-05T10:00:00Z',
        capacity: 10,
        remaining: 5,
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should reject when remaining exceeds capacity', async () => {
      const dto: CreateAvailabilityDto = {
        activityId: 'valid-uuid',
        startsAt: '2025-01-01T10:00:00Z',
        endsAt: '2025-01-05T10:00:00Z',
        capacity: 5,
        remaining: 10,
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });
});
