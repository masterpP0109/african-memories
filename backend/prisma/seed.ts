import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const activity = await prisma.activity.upsert({
    where: { slug: 'zambezi-boat-cruise' },
    update: {}, // Preserve changes made by the content editor on subsequent runs.
    create: {
      name: 'Zambezi Boat Cruise',
      slug: 'zambezi-boat-cruise',
      category: 'SCENIC',
      status: 'PUBLISHED',
      description:
        'Immerse yourself in the beauty and majesty of the falls during the sunset cruise, sailing the tranquil and mighty Zambezi river.',
      image:
        'https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/caption.jpg?updatedAt=1778971937767',
      prices: {
        create: {
          amount: 150.0,
          currency: 'USD',
          validFrom: new Date('2025-01-01T00:00:00Z'),
          validTo: new Date('2026-12-31T23:59:59Z'),
          isActive: true,
        },
      },
      availabilities: {
        create: {
          startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
          capacity: 12,
          remaining: 8,
        },
      },
    },
    include: {
      prices: true,
      availabilities: true,
    },
  });

  console.log('Seeded activity:', JSON.stringify(activity, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
