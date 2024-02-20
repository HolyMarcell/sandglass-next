'use server'
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { isNil } from 'ramda';
import { notFound, redirect } from 'next/navigation';

export const serverAuthOr404 = async () => {
  const session = await getServerSession(authOptions);
  if(isNil(session)) {
    notFound();
  }
  return session;
}
