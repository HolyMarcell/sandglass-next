import { FWC } from '~/types';

export default function PingStatusGrid({children}: FWC) {

  return (
    <div className={'grid grid-cols-3 gap-5 mb-5'}>
      {children}
    </div>
  )
}
