import PageHeader from '~/app/components/PageHeader';
import { EditSiteForm } from '~/app/sites/edit/[siteId]/EditSiteForm';
import { getSiteById } from '~/app/sites/getSiteById';
import { isNil } from 'ramda';
import { notFound } from 'next/navigation';

export default async function EditPage({params}: {params: {siteId: string}}) {

  const site = await getSiteById(params.siteId);
  if(isNil(site)) {
    notFound();
  }

  return (
    <div>
      <PageHeader>Edit Site</PageHeader>
      <EditSiteForm site={site} />
    </div>
  )
}
