import Link from 'next/link';


export function Topnav() {
  return (
    <div className={"bg-topnavBg w-4/5 max-w-screen-xl mx-auto flex " +
      "rounded-b-lg h-[65px] color-white text-green-900 sticky top-0 space-x-5 items-center"}>
      <div>
        <img src='/sandglass_logo.png' alt="Sandglass - Logo" className={"w-[200px]"}/>
      </div>
      <div>
        <Link href={'/'}>Home</Link>
      </div>
      <div>
        <Link href={'/login'}>Login</Link>
      </div>
    </div>
  )
}
