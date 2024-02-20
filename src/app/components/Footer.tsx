import Link from 'next/link';


export async function Footer() {


  return (
    <div className={'bg-footerBg w-screen flex border-box h-[65px] mt-12 ' +
      'color-white text-green-100 justify-between items-center max-w-full'}>
      <div className={'flex-row items-center flex border-box'}>
        <div className={'ml-5'}>
          &copy; 2024 <Link href={'https://sandglass.it'} target={'_blank'}>Sandglass.it</Link>
        </div>

      </div>
      <div className={'mr-6'}>

        <div>
          See also: <Link href={'https://holy-mail.de'} target={'_blank'}>Tristan Döhl</Link>
        </div>
        <div>
          <Link href={'https://teetrack.it'} target={'_blank'}>Time Tracking Software</Link>
        </div>
      </div>
    </div>
  )
}
