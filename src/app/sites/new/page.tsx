import { NewSiteForm } from '~/app/sites/new/NewSiteForm';
import Page from '~/app/components/Layout/Page';

export default async function NewSitesPage() {
  return (
    <Page>
      <NewSiteForm />
    </Page>
  )
}
