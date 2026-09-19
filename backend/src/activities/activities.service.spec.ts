import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";
import { PrismaService } from "../prisma/prisma.service";

describe("ActivitiesService", () => {
  let service: ActivitiesService;
  let prisma: {
    activity: {
      create: jest.Mock;
      update: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      activity: {
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  describe("mutations", () => {
    it("creates an activity without supplying database-owned defaults", async () => {
      const dto = {
        name: "River Walk",
        slug: "river-walk",
        category: "Walking",
      };
      const stored = { id: "activity-1", status: "DRAFT", ...dto };
      prisma.activity.create.mockResolvedValue(stored);

      await expect(service.create(dto)).resolves.toEqual(stored);
      expect(prisma.activity.create).toHaveBeenCalledWith({ data: dto });
    });

    it("updates only the explicitly supplied fields", async () => {
      prisma.activity.update.mockResolvedValue({
        id: "activity-1",
        name: "Updated River Walk",
        status: "PUBLISHED",
      });

      await service.update("activity-1", { name: "Updated River Walk" });

      expect(prisma.activity.update).toHaveBeenCalledWith({
        where: { id: "activity-1" },
        data: { name: "Updated River Walk" },
      });
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findPublished", () => {
    it("should return published activities with prices and availability", async () => {
      const mockActivities = [
        {
          id: "1",
          name: "Test Activity",
          slug: "test-activity",
          status: "PUBLISHED",
          prices: [{ id: "p1", amount: 100, currency: "USD" }],
          availabilities: [
            { id: "a1", startsAt: new Date(), endsAt: new Date() },
          ],
        },
      ];
      prisma.activity.findMany.mockResolvedValue(mockActivities);

      const result = await service.findPublished();

      expect(prisma.activity.findMany).toHaveBeenCalledWith({
        where: { status: "PUBLISHED" },
        include: {
          prices: { where: { isActive: true } },
          availabilities: true,
        },
        orderBy: { name: "asc" },
      });
      expect(result).toEqual(mockActivities);
    });
  });

  describe("findBySlug", () => {
    it("does not expose a draft through its public slug", async () => {
      prisma.activity.findUnique.mockResolvedValue({ status: "DRAFT" });
      await expect(service.findBySlug("draft")).rejects.toThrow(NotFoundException);
    });
    it("should return the activity when slug exists", async () => {
      const mockActivity = {
        id: "1",
        name: "Test Activity",
        slug: "test-activity",
        status: "PUBLISHED",
        prices: [{ id: "p1", amount: 100, currency: "USD" }],
        availabilities: [
          { id: "a1", startsAt: new Date(), endsAt: new Date() },
        ],
      };
      prisma.activity.findUnique.mockResolvedValue(mockActivity);

      const result = await service.findBySlug("test-activity");

      expect(prisma.activity.findUnique).toHaveBeenCalledWith({
        where: { slug: "test-activity" },
        include: { prices: true, availabilities: true },
      });
      expect(result).toEqual(mockActivity);
    });

    it("should throw NotFoundException when slug does not exist", async () => {
      prisma.activity.findUnique.mockResolvedValue(null);

      await expect(service.findBySlug("nonexistent")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
