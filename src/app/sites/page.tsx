import { SitesTable } from '~/app/sites/SitesTable';
import PageHeader from '~/app/components/Layout/PageHeader';
import { getSites } from '~/app/sites/controller/getSites';


export default async function SitesPage() {
  const sites = await getSites();

  return (
    <div>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
        ]}/>
      <SitesTable sites={sites} />
    </div>
  )
}
