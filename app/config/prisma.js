const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }

  prisma = globalThis.prisma;
}

export default prisma;