const { spawnSync } = require('node:child_process');

const url = process.env.TEST_DATABASE_URL;
if (!url) {
  console.error('TEST_DATABASE_URL is required. Refusing to use DATABASE_URL.');
  process.exit(1);
}
const parsed = new URL(url);
if (!parsed.pathname.toLowerCase().includes('test')) {
  console.error('TEST_DATABASE_URL database name must contain "test".');
  process.exit(1);
}
const result = spawnSync(
  process.execPath,
  [require.resolve('prisma/build/index.js'), ...process.argv.slice(2)],
  { stdio: 'inherit', env: { ...process.env, DATABASE_URL: url } },
);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
