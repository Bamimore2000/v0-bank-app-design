import { PrismaClient } from "./generated/prisma/client";

declare global {
  // allow global `prisma` in dev so it doesn't recreate on hot reload
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

// in development, attach to global to avoid multiple instances
if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
