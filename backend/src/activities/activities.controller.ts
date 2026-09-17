import { Controller, Get, Param } from '@nestjs/common';
import { ActivitiesService } from './activities.service.js';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findPublished() {
    return this.activitiesService.findPublished();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.activitiesService.findBySlug(slug);
  }
}
