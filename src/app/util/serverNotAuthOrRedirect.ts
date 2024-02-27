'use server'
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { isNil } from 'ramda';
import { redirect } from 'next/navigation';


// Redirect, to "to" when authenticated.
export const serverNotAuthOrRediect = async (to: string) => {
  const session = await getServerSession(authOptions);
  if(!isNil(session)) {
    redirect(to);
  }
  return session;
}
