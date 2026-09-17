import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service.js';
import { AvailabilityController } from './availability.controller.js';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}
