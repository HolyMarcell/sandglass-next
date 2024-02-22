import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { SiteCard } from '~/app/sites/[siteId]/SiteCard';
import PageHeader from '~/app/components/PageHeader';
import { getSiteById } from '~/app/sites/getSiteById';


export default async function SitePage({params}: {params: {siteId: string}}) {

  const data = await getSiteById(params.siteId);
  if(isNil(data)) {
    notFound();
  }

  return(
    <div>
      <PageHeader>Site</PageHeader>
      <SiteCard site={data} />
    </div>
  )
}
