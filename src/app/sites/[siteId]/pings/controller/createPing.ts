'use server'

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { revalidatePath } from 'next/cache';
import { NewPingFormProps } from '~/app/sites/[siteId]/pings/new/NewPingForm';

const newPingFormSchema = z.object({
  siteId: z.string().min(10, 'This needs a parent site!'),
  method: z.enum(["GET", "OPTIONS"]),
  url: z.string().url('Your need to give a valid URL'),
  expectStatus: z.number(),
  timer: z.string().min(1, 'The timer cannot be empty')
});


const prisma = new PrismaClient();

export default async function createPing(values: NewPingFormProps) {
  const session = await serverAuthOr404();
  const userId = session.user.id;

  const {success} = newPingFormSchema.safeParse(values);
  if (!success || !session) {
    return Promise.reject("Something went wrong");
  }

  const ping = await prisma.ping.create({
    data: {
      userId: userId,
      siteId: values.siteId,
      method: values.method,
      url: values.url,
      expectStatus: values.expectStatus,
      timer: values.timer
    }
  });

  revalidatePath('/sites');
  return ping;
}
