import { SitesTable } from '~/app/sites/SitesTable';
import PageHeader from '~/app/components/PageHeader';
import { getSites } from '~/app/sites/getSites';


export default async function SitesPage() {
  const sites = await getSites();

  return (
    <div>
      <PageHeader>Sites</PageHeader>
      <SitesTable sites={sites} />
    </div>
  )
}
