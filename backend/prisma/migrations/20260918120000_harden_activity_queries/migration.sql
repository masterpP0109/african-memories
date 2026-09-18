CREATE INDEX "Activity_status_category_name_idx" ON "Activity"("status", "category", "name");
CREATE INDEX "Price_activityId_isActive_validFrom_idx" ON "Price"("activityId", "isActive", "validFrom");
CREATE INDEX "Availability_activityId_startsAt_idx" ON "Availability"("activityId", "startsAt");

-- Enforce new writes without failing migration on potential legacy rows.
ALTER TABLE "Price" ADD CONSTRAINT "Price_valid_dates_check" CHECK ("validTo" > "validFrom") NOT VALID;
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_dates_check" CHECK ("endsAt" > "startsAt") NOT VALID;
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_capacity_check" CHECK ("capacity" >= 1 AND "remaining" >= 0 AND "remaining" <= "capacity") NOT VALID;
