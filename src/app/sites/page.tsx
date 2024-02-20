import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { SitesTable } from '~/app/sites/SitesTable';

export default async function SitesPage() {
  return (
    <div>
      hello sites

      <Button asChild>
        <Link href={'/sites/new'}>+ New</Link>
      </Button>


      <SitesTable />
    </div>
  )
}
