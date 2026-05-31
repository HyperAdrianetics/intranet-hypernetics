import 'dotenv/config';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Cliente Prisma con adaptador seleccionable:
 *  - `DB_ADAPTER=pg`   → node-postgres (Postgres local en Docker, para pruebas)
 *  - por defecto       → Neon (Postgres serverless, producción)
 * Las queries son idénticas; solo cambia el driver de conexión.
 */
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  const adapter =
    process.env.DB_ADAPTER === 'pg'
      ? new PrismaPg({ connectionString })
      : new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
