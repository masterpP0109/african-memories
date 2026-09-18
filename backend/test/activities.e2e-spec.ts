import { Test, TestingModule } from "@nestjs/testing";
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { randomUUID } from "node:crypto";

describe("Activities API with PostgreSQL (e2e)", () => {
  let app: INestApplication;
  const apiKey = "integration-test-admin-key";

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("reports liveness and database readiness separately", async () => {
    await request(app.getHttpServer())
      .get("/api/v1")
      .expect(200, { status: "ok" });
    await request(app.getHttpServer()).get("/api/v1/ready").expect(200, {
      status: "ready",
      database: "connected",
    });
  });

  it("validates, authorizes, creates, reads, updates and filters an activity", async () => {
    const slug = `e2e-${randomUUID()}`;
    await request(app.getHttpServer())
      .post("/api/v1/activities")
      .set("x-api-key", apiKey)
      .send({ name: "", slug: "Not Valid", category: "Safari" })
      .expect(400);
    await request(app.getHttpServer())
      .post("/api/v1/activities")
      .send({ name: "Unauthorized", slug, category: "Safari" })
      .expect(401);

    const created = await request(app.getHttpServer())
      .post("/api/v1/activities")
      .set("x-api-key", apiKey)
      .send({
        name: "Zambezi Walk",
        slug,
        category: "E2E Safari",
        status: "PUBLISHED",
      })
      .expect(201);
    const read = await request(app.getHttpServer())
      .get(`/api/v1/activities/${slug}`)
      .expect(200);
    expect(read.body.id).toBe(created.body.id);

    const updated = await request(app.getHttpServer())
      .patch(`/api/v1/activities/${created.body.id}`)
      .set("x-api-key", apiKey)
      .send({ name: "Updated Zambezi Walk" })
      .expect(200);
    expect(updated.body.name).toBe("Updated Zambezi Walk");

    const listed = await request(app.getHttpServer())
      .get("/api/v1/activities")
      .query({ category: "E2E Safari" })
      .expect(200);
    expect(listed.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: created.body.id }),
      ]),
    );
  });
});
