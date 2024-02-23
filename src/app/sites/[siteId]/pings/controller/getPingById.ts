import { PrismaClient, Ping } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';

const prisma = new PrismaClient();

export async function getPingById(id: Ping['id']): Promise<Ping | null> {
  const session = await serverAuthOr404();

  const ping = prisma.ping.findUnique({
    where: {
      userId: session.user.id,
      id: id,
    }
  });

  return ping;
}
