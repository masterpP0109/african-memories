import { AdminApiKeyGuard } from "../auth/admin-api-key.guard.js";
import { Controller, Get, Param, Post, Body, UseGuards } from "@nestjs/common";
import { PricingService } from "./pricing.service.js";
import { CreatePriceDto } from "./dto/create-price.dto.js";

@Controller("pricing")
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  @UseGuards(AdminApiKeyGuard)
  create(@Body() dto: CreatePriceDto) {
    return this.pricingService.create(dto);
  }

  @Get("activity/:activityId")
  findByActivity(@Param("activityId") activityId: string) {
    return this.pricingService.findByActivityId(activityId);
  }
}
