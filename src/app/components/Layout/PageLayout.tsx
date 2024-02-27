import { FWC } from '~/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { isNil } from 'ramda';

export default async function PageLayout({children}: FWC) {
  const session = await getServerSession(authOptions);
  const loggedIn = !isNil(session);

  const authClasses = 'grid grid-cols-mainlayout gap-0 w-4/5 max-w-screen-xl mx-auto min-h-[calc(100vh-178px)]';

  const unauthClasses = 'min-h-[calc(100vh-195px)]';

  return (
    <div className={loggedIn ? authClasses : unauthClasses}>
      {children}
    </div>
  )
}
