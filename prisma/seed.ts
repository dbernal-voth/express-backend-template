import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import PERMISSIONS from "constants/permissions";

const prisma = new PrismaClient();

async function seed() {
  await createDefaultUsers();
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function createDefaultUsers() {
  const name = "admin";
  const username = "admin";
  const password = "asd123";
  const permissions = Object.values(PERMISSIONS).map((id) => [id, 2]);

  await prisma.user.delete({ where: { username } }).catch();
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      name,
      permissions,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  console.log(`- Default user created. 👤`);
}
