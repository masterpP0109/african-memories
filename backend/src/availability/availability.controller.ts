import { AdminApiKeyGuard } from "../auth/admin-api-key.guard.js";
import { Controller, Get, Param, Post, Body, UseGuards } from "@nestjs/common";
import { AvailabilityService } from "./availability.service.js";
import { CreateAvailabilityDto } from "./dto/create-availability.dto.js";

@Controller("availability")
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @UseGuards(AdminApiKeyGuard)
  create(@Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(dto);
  }

  @Get("activity/:activityId")
  findByActivity(@Param("activityId") activityId: string) {
    return this.availabilityService.findByActivityId(activityId);
  }
}
