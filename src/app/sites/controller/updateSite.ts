'use server'

import { z } from 'zod';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { revalidatePath } from 'next/cache';
import { EditSiteFormProps } from '~/app/sites/edit/[siteId]/EditSiteForm';
import { prisma } from '~/app/prisma';

const editSiteFormSchema = z.object({
  name: z.string().min(1, 'The name cannot be empty'),
  id: z.string().min(4),
});


export default async function updateSite(values: EditSiteFormProps) {
  const session = await serverAuthOr404();
  const userId = session.user.id;

  const {success} = editSiteFormSchema.safeParse(values);
  if (!success || !session) {
    return Promise.reject('Something went wrong');
  }

  const site = await prisma.site.update({
    where: {
      id: values.id,
      userId: userId // Implicit AND
    },
    data: {
      name: values.name,
    }
  });

  revalidatePath('/sites');
  return site;
}
