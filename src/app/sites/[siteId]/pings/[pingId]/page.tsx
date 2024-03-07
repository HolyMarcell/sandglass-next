import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import { getPingById } from '~/app/sites/[siteId]/pings/controller/getPingById';
import { PingCard } from '~/app/sites/[siteId]/pings/[pingId]/PingCard';
import Page from '~/app/components/Layout/Page';


export default async function PingPage({params}: { params: { siteId: string, pingId: string } }) {

  const site = await getSiteById(params.siteId);
  if (isNil(site)) {
    notFound();
  }
  const ping = await getPingById(params.pingId);
  if (isNil(ping)) {
    notFound();
  }

  return (
    <Page>
      <div className={'w-1/2'}>
        <PingCard ping={ping}/>
      </div>
    </Page>
  )
}
