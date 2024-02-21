import { NewSiteForm } from '~/app/sites/new/NewSiteForm';
import PageHeader from '~/app/components/PageHeader';

export default async function NewSitesPage() {
  return (
    <div>
      <PageHeader>Create new Site</PageHeader>
      <NewSiteForm />
    </div>
  )
}
