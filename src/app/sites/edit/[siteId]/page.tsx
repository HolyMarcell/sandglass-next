import { EditSiteForm } from '~/app/sites/edit/[siteId]/EditSiteForm';
import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import Page from '~/app/components/Layout/Page';

export default async function EditPage({params}: {params: {siteId: string}}) {

  const site = await getSiteById(params.siteId);
  if(isNil(site)) {
    notFound();
  }

  return (
    <Page>
      <EditSiteForm site={site} />
    </Page>
  )
}
