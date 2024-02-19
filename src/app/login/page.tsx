import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { isNil } from 'ramda';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default async function LoginPage() {

  const session = await getServerSession(authOptions);

  if(!isNil(session)) {
    redirect('/dashboard');
  }

  if(isNil(session)) {
    redirect('/api/auth/signin')
  }

  // this should not ever be shown
  return (
    <div>
      Sign In
    </div>
  )
}
