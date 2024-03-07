import { getSites } from '~/app/sites/controller/getSites';
import Page from '~/app/components/Layout/Page';
import SiteListCard from '~/app/sites/components/SiteListCard';
import NewSiteButtonRow from '~/app/sites/components/NewSiteButtonRow';


export default async function SitesPage() {
  const sites = await getSites();

  return (
    <Page>

      <div className={'mb-10'}>
        {sites.map((site) => {
          return (
            <SiteListCard key={site.id} site={site}/>
          )
        })}
      </div>

      <NewSiteButtonRow/>
    </Page>
  )
}
