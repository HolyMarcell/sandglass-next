'use client'

import { FWC } from '~/types';
import { usePathname } from 'next/navigation';
import BreadCrumb from '~/app/components/Layout/BreadCrumb';


const pathNameTobc = (pathname: string) => {
  const els = pathname.substring(1).split('/');
  const res = [];

  if(els[0] === 'sites') {
    res.push({
      label: 'Sites',
      href: '/sites'
    });
  }

  if(els[2] === 'pings') {
    res.push({
      label: 'Pings',
      href: ['', els[0], els[1], els[2]].join('/')
    })
  }

  return [...res];
}

const BreadCrumbs = () => {
  const p = usePathname();
  const crumbs = pathNameTobc(p);

  return (
    <div className={'flex '}>
      {crumbs.map((crumb, i) => {
        return <BreadCrumb key={i} {...crumb} />
      })}
    </div>
  )
}



export default function Page({children}: FWC) {


  return (
    <>
      <div>{/* leftnav */}</div>
      <div className={'mt-5 min-h-48'}>
        <BreadCrumbs />
        <div className={'min-h-48 rounded-lg  mt-5 '}>
          {children}
        </div>
      </div>


      <div>{/* right */}</div>
    </>
  )
}
