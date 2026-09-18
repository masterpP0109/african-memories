import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ActivitiesModule } from "./activities/activities.module.js";
import { AvailabilityModule } from "./availability/availability.module.js";
import { PricingModule } from "./pricing/pricing.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";

function validateEnvironment(config: Record<string, unknown>) {
  const databaseUrl = String(config.DATABASE_URL ?? "");
  if (
    !databaseUrl.startsWith("postgresql://") &&
    !databaseUrl.startsWith("postgres://")
  ) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection URL");
  }

  const adminApiKey = String(config.ADMIN_API_KEY ?? "");
  if (adminApiKey.length < 16) {
    throw new Error("ADMIN_API_KEY must contain at least 16 characters");
  }

  return config;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnvironment }),
    PrismaModule,
    ActivitiesModule,
    AvailabilityModule,
    PricingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
