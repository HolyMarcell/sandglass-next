import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { isNil } from 'ramda';
import { SignOutButton } from '~/app/components/SignOutButton';


export async function Topnav() {
  const session = await getServerSession(authOptions);
  const loggedIn = !isNil(session);


  return (
    <div className={'bg-topnavBg w-4/5 max-w-screen-xl mx-auto flex ' +
      'rounded-b-lg h-[65px] ' +
      'color-white text-green-900 sticky top-0 justify-between items-center'}>
      <div className={'flex-row items-center flex'}>
        <div>
          <Link href={'/'}>
            <img src="/sandglass_logo.png" alt="Sandglass - Logo" className={'w-[200px]'}/>
          </Link>
        </div>
        {!loggedIn &&
          <div>
            <Link href={'/'}>Home</Link>
          </div>
        }
        {loggedIn &&
          <div>
            <Link href={'/dashboard'}>Dashboard</Link>
          </div>
        }

      </div>

      <div className={'flex-row items-center flex mr-6'}>
      {!loggedIn &&
        <div>
          <Link href={'/login'}>Login</Link>
        </div>
      }
      {loggedIn &&
        <SignOutButton/>
      }
      </div>
    </div>
  )
}
