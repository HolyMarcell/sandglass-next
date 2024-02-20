'use server'

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { NewSiteFormProps } from '~/app/sites/new/NewSiteForm';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { revalidatePath } from 'next/cache';

const newSiteFormSchema = z.object({
  name: z.string().min(1, 'The name cannot be empty')
});


const prisma = new PrismaClient();

export default async function createSite(values: NewSiteFormProps) {
  const session = await serverAuthOr404();
  const userId = session.user.id;

  const {success} = newSiteFormSchema.safeParse(values);
  if (!success || !session) {
    return Promise.reject("Something went wrong");
  }

  const site = await prisma.site.create({
    data: {
      name: values.name,
      pingStatus: 'unknown',
      userId: userId
    }
  });

  revalidatePath('/sites');
  return site;
}
