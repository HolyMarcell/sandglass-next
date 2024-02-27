import { NewSiteForm } from '~/app/sites/new/NewSiteForm';
import PageHeader from '~/app/components/Layout/PageHeader';
import Page from '~/app/components/Layout/Page';

export default async function NewSitesPage() {
  return (
    <Page>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
          {label: 'New'}
        ]}/>
      <NewSiteForm />
    </Page>
  )
}
