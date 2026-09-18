import { Module } from "@nestjs/common";
import { ActivitiesController } from "./activities.controller.js";
import { ActivitiesService } from "./activities.service.js";
import { AdminApiKeyGuard } from "../auth/admin-api-key.guard.js";

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, AdminApiKeyGuard],
})
export class ActivitiesModule {}
