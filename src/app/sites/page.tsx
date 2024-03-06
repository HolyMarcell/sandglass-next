import PageHeader from '~/app/components/Layout/PageHeader';
import { getSites } from '~/app/sites/controller/getSites';
import Page from '~/app/components/Layout/Page';
import SiteListCard from '~/app/sites/components/SiteListCard';


export default async function SitesPage() {
  const sites = await getSites();
  console.log(sites)

  return (
    <Page>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
        ]}/>
      {sites.map((site) => {
        return (
          <SiteListCard key={site.id} site={site} />
        )
      })}
    </Page>
  )
}
