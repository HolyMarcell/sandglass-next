import { Ping, Site } from '@prisma/client';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { getPingById } from '~/app/sites/[siteId]/pings/controller/getPingById';
import Page from '~/app/components/Layout/Page';
import PageHeader from '~/app/components/Layout/PageHeader';
import { getDomain } from '~/app/sites/util/getDomain';
import { EditPingForm } from '~/app/sites/[siteId]/pings/edit/[pingId]/EditPingForm';


export default async function EditPingPage({params}: {params: {siteId: Site['id'], pingId: Ping['id']}}) {
  const site = await getSiteById(params.siteId);
  const ping = await getPingById(params.pingId);

  if(isNil(site) || isNil(ping)) {
    notFound();
  }

  return(
    <Page>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
          {label: site.name, link: `/sites/${site.id}`},
          {label: 'Pings', link: `/sites/${params.siteId}/pings`},
          {label: getDomain(ping.url)},
        ]}/>
      <EditPingForm ping={ping} />
    </Page>
  )

}
