import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { isNil } from 'ramda';
import { SignOutButton } from '~/app/components/SignOutButton';
import Image from 'next/image';


export async function Topnav() {
  const session = await getServerSession(authOptions);
  const loggedIn = !isNil(session);

  const authClasses = 'bg-topnavBg w-4/5 max-w-screen-xl mx-auto flex rounded-b-lg h-[65px] text-green-900 sticky top-0 justify-between items-center'
  const unauthClasses = 'bg-topnavBg w-full flex text-white items-center justify-between';

  return (
    <div className={loggedIn ? authClasses : unauthClasses}>
      <div className={'flex-row items-center flex'}>
        <div>
          <Link href={'/'}>
            <Image
              priority={true}
              placeholder={'empty'}
              src="/sandglass_logo.png" alt="Sandglass - Logo"
              width={200}
              height={62}
              style={{width: '200px', height: '62px'}}
            />
          </Link>
        </div>
        {!loggedIn &&
          <div>
            <Link href={'/'}>Home</Link>
          </div>
        }
        {loggedIn &&
          <>
            <div className={'mr-3'}>
              <Link href={'/dashboard'}>Dashboard</Link>
            </div>
            <div className={'mr-3'}>
              <Link href={'/sites'}>Sites</Link>
            </div>
          </>
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
