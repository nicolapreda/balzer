import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin
  const passwordHash = await bcrypt.hash('balzer2024!', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@balzer.it' },
    update: {},
    create: { name: 'Admin', email: 'admin@balzer.it', passwordHash },
  });

  // Categories
  const categories = [
    { name: 'Colazione', slug: 'colazione', sortOrder: 1 },
    { name: 'Pasticceria', slug: 'pasticceria', sortOrder: 2 },
    { name: 'Pranzo', slug: 'pranzo', sortOrder: 3 },
    { name: 'Aperitivo', slug: 'aperitivo', sortOrder: 4 },
    { name: 'Cocktail', slug: 'cocktail', sortOrder: 5 },
  ];

  for (const cat of categories) {
    await prisma.menuCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Site settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      siteName: 'Balzer 1850',
      tagline: 'Caffetteria, Pasticceria e Ristorante dal 1850',
      address: 'Via Portici, Sentierone 41, 24121 Bergamo BG',
      phone: '+39 035 086 8549',
      googleMapsUrl: 'https://maps.google.com/?q=Balzer+Bergamo+Sentierone+41',
      openingHoursJson: JSON.stringify({
        lunedi: '7:00–23:00', martedi: '7:00–22:00', mercoledi: '7:00–22:00',
        giovedi: '7:00–23:00', venerdi: '7:00–02:00', sabato: '7:30–02:00', domenica: '8:00–23:00',
      }),
      socialLinksJson: JSON.stringify({ instagram: 'https://instagram.com/balzer1850' }),
    },
  });

  console.log('Seed completato. Admin: admin@balzer.it / balzer2024!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
