import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { AppService } from "./app.service.js";
import { PrismaService } from "./prisma/prisma.service.js";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }

  @Get("ready")
  async getReadiness() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: "ready", database: "connected" };
    } catch {
      throw new ServiceUnavailableException({
        status: "not_ready",
        database: "disconnected",
      });
    }
  }
}
