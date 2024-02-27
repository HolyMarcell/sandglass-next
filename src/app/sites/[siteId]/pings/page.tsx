import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import PageHeader from '~/app/components/Layout/PageHeader';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import { getBySiteId } from '~/app/sites/[siteId]/pings/controller/getBySiteId';
import { PingsTable } from '~/app/sites/[siteId]/pings/PingsTable';
import Page from '~/app/components/Layout/Page';


export default async function PingsPage({params}: { params: { siteId: string } }) {

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
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
          {label: site.name, link: `/sites/${params.siteId}`},
          {label: 'Pings', }, // link: `/sites/${params.siteId}/pings`
        ]}/>
      <PingsTable pings={pings} />
    </Page>
  )
}
