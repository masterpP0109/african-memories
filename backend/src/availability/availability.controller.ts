import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { AvailabilityService } from "./availability.service.js";
import { CreateAvailabilityDto } from "./dto/create-availability.dto.js";

@Controller("availability")
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(dto);
  }

  @Get("activity/:activityId")
  findByActivity(@Param("activityId") activityId: string) {
    return this.availabilityService.findByActivityId(activityId);
  }
}
