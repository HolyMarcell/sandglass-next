'use server'
import { Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { revalidatePath } from 'next/cache';
import { prisma } from '~/app/prisma';


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
