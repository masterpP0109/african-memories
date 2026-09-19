import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateActivityDto } from "./dto/create-activity.dto.js";
import { UpdateActivityDto } from "./dto/update-activity.dto.js";

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished(category?: string) {
    return this.prisma.activity.findMany({
      where: { status: "PUBLISHED", ...(category ? { category } : {}) },
      include: {
        prices: { where: { isActive: true } },
        availabilities: true,
      },
      orderBy: { name: "asc" },
    });
  }

  async create(dto: CreateActivityDto) {
    try {
      return await this.prisma.activity.create({ data: dto });
    } catch (error) {
      this.rethrowKnownDatabaseError(error);
    }
  }

  async update(id: string, dto: UpdateActivityDto) {
    try {
      return await this.prisma.activity.update({ where: { id }, data: dto });
    } catch (error) {
      this.rethrowKnownDatabaseError(error);
    }
  }

  async findBySlug(slug: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { slug },
      include: { prices: true, availabilities: true },
    });
    if (!activity || activity.status !== "PUBLISHED") throw new NotFoundException("Activity not found");
    return activity;
  }

  private rethrowKnownDatabaseError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        throw new ConflictException("Activity slug already exists");
      if (error.code === "P2025")
        throw new NotFoundException("Activity not found");
    }
    throw error;
  }
}
