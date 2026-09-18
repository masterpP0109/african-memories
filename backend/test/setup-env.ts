const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl)
  throw new Error("TEST_DATABASE_URL is required for integration tests");
const parsed = new URL(testDatabaseUrl);
if (!parsed.pathname.toLowerCase().includes("test")) {
  throw new Error('TEST_DATABASE_URL database name must contain "test"');
}
process.env.DATABASE_URL = testDatabaseUrl;
process.env.ADMIN_API_KEY = "integration-test-admin-key";
