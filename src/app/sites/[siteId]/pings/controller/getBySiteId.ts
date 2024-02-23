import { Ping, PrismaClient, Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';

const prisma = new PrismaClient();

export async function getBySiteId(id: Site['id']): Promise<Ping[] | null> {
  const session = await serverAuthOr404();

  const pings = prisma.ping.findMany({
    where: {
      userId: session.user.id,
      siteId: id,
    }
  });

  return pings;
}
