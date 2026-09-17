import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePriceDto } from './dto/create-price.dto';

describe('PricingService', () => {
  let service: PricingService;
  let prisma: { price: { create: jest.Mock }; activity: { findUnique: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      price: {
        create: jest.fn(),
      },
      activity: {
        findUnique: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricingService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<PricingService>(PricingService);
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
    it('should reject when validTo is before validFrom', async () => {
      const dto: CreatePriceDto = {
        amount: 100,
        currency: 'USD',
        validFrom: '2025-01-10T00:00:00Z',
        validTo: '2025-01-05T00:00:00Z',
        activityId: 'valid-uuid',
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when activity does not exist', async () => {
      const dto: CreatePriceDto = {
        amount: 100,
        currency: 'USD',
        validFrom: '2025-01-01T00:00:00Z',
        validTo: '2025-01-10T00:00:00Z',
        activityId: 'nonexistent-id',
      };

      prisma.activity.findUnique.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });
});
