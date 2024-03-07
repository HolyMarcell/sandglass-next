import { SiteWithPing } from '~/app/sites/controller/getSites';
import OnlineStausIcon from '~/app/components/Icons/OnlineStatusIcon';
import PingIcon from '~/app/components/Icons/PingIcon';
import Link from 'next/link';

export default async function SiteListCard({site}: { site: SiteWithPing }) {


  return (
    <Link href={`/sites/${site.id}`} className={'border rounded-lg px-4 py-3 grid grid-cols-[30px,1fr,30px,1fr] gap-4 ' +
      ' hover:bg-gray-300 bg-card transition-all duration-100 cursor-pointer'}>
      <div className={'items-center justify-center flex'}>
        <OnlineStausIcon size={24}  className={'p-0 fill-onlineIcon'}/>
      </div>

      <div className={''}>
        <div className={'font-bold text-lg'}>{site.name}</div>
        <div className={'italic text-sm mt-[-4px]'}>- {site.pingStatus}</div>
      </div>

      <div className={'items-center justify-center flex'}>
        <PingIcon size={24} color={'green'}/>
      </div>

      <div className={'flex items-center'}>
        <div className={'italic text-sm'}><span className={'font-bold'}>{site.pings.length}</span> registered pings</div>
      </div>
    </Link>
  )
}
