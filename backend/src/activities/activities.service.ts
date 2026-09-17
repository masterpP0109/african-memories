import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.activity.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        prices: { where: { isActive: true } },
        availabilities: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { slug },
      include: { prices: true, availabilities: true },
    });
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }
}
