'use server'
import { Ping } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { revalidatePath } from 'next/cache';
import { prisma } from '~/app/prisma';


export async function deletePing(id: Ping['id']): Promise<boolean> {
  const session = await serverAuthOr404();

  await prisma.ping.delete({
    where: {
      userId: session.user.id,
      id: id,
    }
  });

  revalidatePath('/sites');
  return true;
}
