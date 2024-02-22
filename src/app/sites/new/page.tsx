import { NewSiteForm } from '~/app/sites/new/NewSiteForm';
import PageHeader from '~/app/components/Layout/PageHeader';

export default async function NewSitesPage() {
  return (
    <div>
      <PageHeader
        segments={[
          {label: 'Sites', link: '/sites'},
          {label: 'New'}
        ]}/>
      <NewSiteForm />
    </div>
  )
}
