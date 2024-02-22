import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { SiteCard } from '~/app/sites/[siteId]/SiteCard';
import PageHeader from '~/app/components/Layout/PageHeader';
import { getSiteById } from '~/app/sites/controller/getSiteById';




export default async function SitePage({params}: {params: {siteId: string}}) {

  const site = await getSiteById(params.siteId);
  if(isNil(site)) {
    notFound();
  }

  return(
    <div>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
          {label: site.name, link: `/sites/${site.id}`}
        ]}/>
      <SiteCard site={site} />
    </div>
  )
}
