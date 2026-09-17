import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePriceDto } from './dto/create-price.dto.js';

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePriceDto) {
    const errors: string[] = [];

    const validFrom = new Date(dto.validFrom);
    const validTo = new Date(dto.validTo);
    if (validTo <= validFrom) {
      errors.push('validTo must be after validFrom');
    }

    if (!dto.activityId) {
      errors.push('activityId is required');
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const activity = await this.prisma.activity.findUnique({
      where: { id: dto.activityId },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return this.prisma.price.create({
      data: {
        amount: dto.amount,
        currency: dto.currency,
        validFrom,
        validTo,
        isActive: dto.isActive ?? true,
        activity: { connect: { id: dto.activityId } },
      },
    });
  }

  async findByActivityId(activityId: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return this.prisma.price.findMany({
      where: { activityId, isActive: true },
      orderBy: { validFrom: 'asc' },
    });
  }
}
