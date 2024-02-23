import { Separator } from '~/components/ui/separator';
import { Fragment } from 'react';
import Link from 'next/link';

interface PageHeader {
  segments: { label: string, link?: string }[];
}

export default async function PageHeader({segments}: PageHeader) {


  return (
    <div className={' mt-[-1.25rem] ml-[-1.25rem] text-lg mb-5 min-w-2/5 w-fit  px-5 py-1 border-2 border-green-700 ' +
      'border-t-0 border-l-0 rounded-br-xl flex items-center space-x-4 justify-center tracking-widest ' +
      'font-bold h-[38px]'}>
      {segments.map(({label, link}, index) => {
        return (
          <Fragment key={label+link}>
            {index >0 && <Separator orientation={'vertical'}/>}
            {link && <Link className={'underline decoration-1 decoration-gray-400'} href={link}>{label}</Link>}
            {!link && <div>{label}</div>}
          </Fragment>
        )
      })}
    </div>
  )
}
