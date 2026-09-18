import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { PricingService } from "./pricing.service.js";
import { CreatePriceDto } from "./dto/create-price.dto.js";

@Controller("pricing")
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  create(@Body() dto: CreatePriceDto) {
    return this.pricingService.create(dto);
  }

  @Get("activity/:activityId")
  findByActivity(@Param("activityId") activityId: string) {
    return this.pricingService.findByActivityId(activityId);
  }
}
