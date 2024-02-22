import PageHeader from '~/app/components/Layout/PageHeader';
import { EditSiteForm } from '~/app/sites/edit/[siteId]/EditSiteForm';
import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { getSiteById } from '~/app/sites/controller/getSiteById';

export default async function EditPage({params}: {params: {siteId: string}}) {

  const site = await getSiteById(params.siteId);
  if(isNil(site)) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
          {label: site.name, link: `/sites/${site.id}`},
          {label: 'Edit'}
        ]}/>
      <EditSiteForm site={site} />
    </div>
  )
}
