'use server'
import { PrismaClient, Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deleteSite(id: Site['id']): Promise<boolean> {
  const session = await serverAuthOr404();

  await prisma.site.delete({
    where: {
      userId: session.user.id,
      id: id,
    }
  });

  revalidatePath('/sites');
  return true;
}
