import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ActivitiesService } from "./activities.service.js";
import { CreateActivityDto } from "./dto/create-activity.dto.js";
import { UpdateActivityDto } from "./dto/update-activity.dto.js";
import { ListActivitiesDto } from "./dto/list-activities.dto.js";
import { AdminApiKeyGuard } from "../auth/admin-api-key.guard.js";

@Controller("activities")
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findPublished(@Query() query: ListActivitiesDto) {
    return this.activitiesService.findPublished(query.category);
  }

  @Post()
  @UseGuards(AdminApiKeyGuard)
  create(@Body() dto: CreateActivityDto) {
    return this.activitiesService.create(dto);
  }

  @Patch(":id")
  @UseGuards(AdminApiKeyGuard)
  update(@Param("id") id: string, @Body() dto: UpdateActivityDto) {
    return this.activitiesService.update(id, dto);
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.activitiesService.findBySlug(slug);
  }
}
