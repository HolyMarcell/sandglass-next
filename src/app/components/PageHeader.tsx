import { FWC } from '~/types';

export default async function PageHeader({children}: FWC) {
  return (
    <div className={" mt-[-1.25rem] ml-[-1.25rem] mb-5 w-2/5 text-2xl py-1 border-2 border-green-700 " +
      "border-t-0 border-l-0 rounded-br-xl text-center tracking-widest font-bold"}>
      {children}
    </div>
  )
}
