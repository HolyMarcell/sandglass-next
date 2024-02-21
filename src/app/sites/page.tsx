import { SitesTable } from '~/app/sites/SitesTable';
import { PrismaClient, Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import PageHeader from '~/app/components/PageHeader';


const prisma = new PrismaClient();

async function getData(): Promise<Site[]> {
  const session = await serverAuthOr404();

  const sites = prisma.site.findMany({
    where: {
      userId: session.user.id
    }
  });

  return sites;
}

export default async function SitesPage() {
  const sites = await getData();

  return (
    <div>
      <PageHeader>Sites</PageHeader>
      <SitesTable sites={sites} />
    </div>
  )
}
