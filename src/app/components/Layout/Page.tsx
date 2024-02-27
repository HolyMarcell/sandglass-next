import { FWC } from '~/types';

export default async function Page({children}: FWC){
  return (
    <>
      <div>{/* leftnav */}</div>
      <div className={'min-h-48 rounded-lg bg-gray-200 mt-5 p-5'}>
        {children}
      </div>
      <div>{/* right */}</div>
    </>
  )
}
