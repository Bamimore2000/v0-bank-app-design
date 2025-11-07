import "dotenv/config"; // <--- add this first
import prisma from "../lib/prisma";

async function main() {
  const users = [
    {
      email: "rvsanchez255@gmail.com",
      phone: "+1 (555) 123-4567",
      password: "Roberto99",
      otp: "287753",
    },
    {
      email: "anthonygurrie@gmail.com",
      phone: "+1 (929) 542-7566",
      password: "securepass456",
      otp: "654321",
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  console.log("✅ Users pre-added successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
