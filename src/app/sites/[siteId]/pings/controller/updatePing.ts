'use server'

import { z } from 'zod';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { revalidatePath } from 'next/cache';
import { prisma } from '~/app/prisma';
import { EditPingFormProps } from '~/app/sites/[siteId]/pings/edit/[pingId]/EditPingForm';

const editPingFormSchema = z.object({
  id: z.string(),
  siteId: z.string().min(10, 'This needs a parent site!'),
  method: z.enum(['GET', 'OPTIONS']),
  url: z.string().min(5, 'The URL cannot be empty'),
  expectStatus: z.number(),
  timer: z.string().min(1, 'The timer cannot be empty')
});


export default async function updatePing(values: EditPingFormProps) {
  const session = await serverAuthOr404();
  const userId = session.user.id;

  const {success} = editPingFormSchema.safeParse(values);
  if (!success || !session) {
    return Promise.reject('Something went wrong');
  }

  const ping = await prisma.ping.update({
    where: {
      id: values.id,
      userId: userId, // Implicit AND
      siteId: values.siteId, // Implicit AND
    },
    data: {
      method: values.method,
      url: values.url,
      timer: values.timer,
      expectStatus: values.expectStatus
    }
  });

  revalidatePath('/sites');
  return ping;
}
