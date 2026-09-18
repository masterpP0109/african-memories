import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateAvailabilityDto } from "./dto/create-availability.dto.js";

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAvailabilityDto) {
    const errors: string[] = [];

    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);
    if (endsAt <= startsAt) {
      errors.push("endsAt must be after startsAt");
    }

    if (dto.remaining > dto.capacity) {
      errors.push("remaining cannot exceed capacity");
    }

    if (!dto.activityId) {
      errors.push("activityId is required");
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.prisma.availability.create({
      data: {
        startsAt,
        endsAt,
        capacity: dto.capacity,
        remaining: dto.remaining,
        activity: { connect: { id: dto.activityId } },
      },
    });
  }

  async findByActivityId(activityId: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!activity) {
      throw new NotFoundException("Activity not found");
    }

    return this.prisma.availability.findMany({
      where: { activityId },
      orderBy: { startsAt: "asc" },
    });
  }
}
