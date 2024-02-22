import { PrismaClient, Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';

const prisma = new PrismaClient();

export async function getSiteById(id: Site['id']): Promise<Site | null> {
  const session = await serverAuthOr404();

  const site = prisma.site.findUnique({
    where: {
      userId: session.user.id,
      id: id,
    }
  });

  return site;
}