import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreatePriceDto } from "./dto/create-price.dto";
import { CreateAvailabilityDto } from "../availability/dto/create-availability.dto";

describe("HTTP date validation", () => {
  const activityId = "123e4567-e89b-42d3-a456-426614174000";
  it("accepts ISO strings submitted as JSON for prices and availability", async () => {
    expect(await validate(plainToInstance(CreatePriceDto, { activityId, amount: 150, currency: "USD", validFrom: "2026-01-01T00:00:00Z", validTo: "2027-01-01T00:00:00Z" }))).toHaveLength(0);
    expect(await validate(plainToInstance(CreateAvailabilityDto, { activityId, capacity: 12, remaining: 8, startsAt: "2026-12-01T08:00:00Z", endsAt: "2026-12-01T10:00:00Z" }))).toHaveLength(0);
  });
  it("rejects reversed and invalid date ranges", async () => {
    for (const validTo of ["2025-01-01T00:00:00Z", "invalid"]) {
      expect((await validate(plainToInstance(CreatePriceDto, { activityId, amount: 150, currency: "USD", validFrom: "2026-01-01T00:00:00Z", validTo }))).length).toBeGreaterThan(0);
    }
  });
});
