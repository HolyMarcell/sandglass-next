'use server'
import { Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { prisma } from '~/app/prisma';


export async function getSites(): Promise<Site[]> {
  const session = await serverAuthOr404();

  const sites = prisma.site.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return sites;
}
