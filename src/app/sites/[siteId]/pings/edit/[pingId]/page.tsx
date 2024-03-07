import { Ping, Site } from '@prisma/client';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { getPingById } from '~/app/sites/[siteId]/pings/controller/getPingById';
import Page from '~/app/components/Layout/Page';
import { EditPingForm } from '~/app/sites/[siteId]/pings/edit/[pingId]/EditPingForm';


export default async function EditPingPage({params}: {params: {siteId: Site['id'], pingId: Ping['id']}}) {
  const site = await getSiteById(params.siteId);
  const ping = await getPingById(params.pingId);

  if(isNil(site) || isNil(ping)) {
    notFound();
  }

  return(
    <Page>

      <EditPingForm ping={ping} />
    </Page>
  )

}
