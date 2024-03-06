import { PrismaClient } from '@prisma/client';
import { isNil } from 'ramda';





// This stores a Prisma in global.prisma because HMR re-creates prisma clients
// and we run into "too many clients" errors -.-
const genGlobalPrisma = () => {
    // @ts-expect-error fuck you
  if(isNil(global.prisma)) {
    // @ts-expect-error and you
    global.prisma = new PrismaClient();
  }
    // @ts-expect-error and you especially
  return global.prisma as PrismaClient;
}

export const prisma = process.env.NODE_ENV === "production" ? new PrismaClient() : genGlobalPrisma();
