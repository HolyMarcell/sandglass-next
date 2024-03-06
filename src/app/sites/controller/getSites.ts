'use server'
import { Prisma } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { prisma } from '~/app/prisma';

export type SiteWithPing = Prisma.SiteGetPayload<{ include: { pings: true } }>

export async function getSites(): Promise<SiteWithPing[]> {
  const session = await serverAuthOr404();

  const sites = prisma.site.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      pings: true
    }
  });

  return sites;
}
