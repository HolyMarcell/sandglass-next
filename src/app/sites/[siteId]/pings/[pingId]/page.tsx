import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import PageHeader from '~/app/components/Layout/PageHeader';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import { getPingById } from '~/app/sites/[siteId]/pings/controller/getPingById';
import { PingCard } from '~/app/sites/[siteId]/pings/[pingId]/PingCard';
import { getDomain } from '~/app/sites/util/getDomain';


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
    <div>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
          {label: site.name, link: `/sites/${site.id}`},
          {label: 'Pings', link: `/sites/${params.siteId}/pings`},
          {label: getDomain(ping.url)},
        ]}/>
      <PingCard ping={ping} />
    </div>
  )
}
