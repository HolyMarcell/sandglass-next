import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { SiteCard } from '~/app/sites/[siteId]/components/SiteCard';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import { getBySiteId } from '~/app/sites/[siteId]/pings/controller/getBySiteId';
import Page from '~/app/components/Layout/Page';
import PingStatusGrid from '~/app/sites/[siteId]/components/PingStatusGrid';
import PingStatusCard from '~/app/sites/[siteId]/components/PingStatusCard';


export default async function SitePage({params}: { params: { siteId: string } }) {

  const site = await getSiteById(params.siteId);
  if (isNil(site)) {
    notFound();
  }
  const pings = await getBySiteId(params.siteId);
  if (isNil(pings)) {
    notFound();
  }

  return (
    <Page>

      <PingStatusGrid>
        {pings.map((ping) => {
          return (
            <PingStatusCard ping={ping} key={ping.id} />
          )
        })}
      </PingStatusGrid>


      <SiteCard site={site} pings={pings}/>
    </Page>
  )
}
