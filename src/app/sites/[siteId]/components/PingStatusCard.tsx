import { Ping } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import Link from 'next/link';
import { H4 } from '~/components/ui/typography';
import OnlineStausIcon from '~/app/components/Icons/OnlineStatusIcon';
import { formatDistanceToNowStrict } from 'date-fns';
import { getPingStatus, PingStatus } from '~/app/sites/[siteId]/pings/controller/getPingStatus';



function OnlineStatus({status, onlineSince, offlineSince}: PingStatus) {


  if (status === 'Online' && onlineSince) {
    const upFor = formatDistanceToNowStrict(new Date(onlineSince));
    return (
      <div className={'flex items-center'}>
        <OnlineStausIcon size={32} className={'fill-onlineIcon'}/>
        <div className={'flex flex-col ml-2 '}>
          <H4 className={'text-onlineText py-0'}>
            Online
          </H4>
          <div className={'italic text-sm mt-[-3px]'}>
            - {upFor}
          </div>
        </div>
      </div>
    )
  }
  if (status === 'Offline' && offlineSince) {
    const downFor = formatDistanceToNowStrict(new Date(offlineSince));
    return (
      <div className={'flex items-center'}>
        <OnlineStausIcon size={25} className={'fill-offlineIcon'}/>
        <div className={'flex flex-col ml-2 '}>
          <H4 className={'text-offlineText py-0'}>
            Offline
          </H4>
          <div className={'italic text-sm mt-[-3px]'}>
            - {downFor}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={'flex items-center'}>
      <OnlineStausIcon size={25} className={'fill-orange-400'}/>
      <div className={'flex flex-col ml-2 '}>
        <H4 className={' py-0'}>
          Unknown
        </H4>
        <div className={'italic text-sm mt-[-3px]'}>
          - unknown
        </div>
      </div>
    </div>
  );
}


export default async function PingStatusCard({ping}: { ping: Ping }) {
  const status = await getPingStatus(ping.id);

  return (
    <Card>
      <CardHeader className={''}>
        <CardTitle className={'flex items-center'}>
          <Link
            href={ping.url}
            title={ping.url}
            className={'text-ellipsis overflow-hidden whitespace-nowrap max-w-full inline-block'}
            target={'_blank'}>
            {ping.url}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OnlineStatus {...status} />

      </CardContent>
      <CardFooter className={'justify-end'}>

      </CardFooter>

    </Card>
  )
}
