import { SitesTable } from '~/app/sites/SitesTable';
import PageHeader from '~/app/components/Layout/PageHeader';
import { getSites } from '~/app/sites/controller/getSites';
import Page from '~/app/components/Layout/Page';


export default async function SitesPage() {
  const sites = await getSites();

  return (
    <Page>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
        ]}/>
      <SitesTable sites={sites} />
    </Page>
  )
}
