'use server'
import { PrismaClient, Site } from '@prisma/client';
import { ColumnDef } from '@tanstack/table-core';
import { DataTable } from '~/components/ui/dataTable';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';

const columns: ColumnDef<Site>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "pingStatus",
    header: "Status",
  },
]


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

export async function SitesTable() {

  const data = await getData();

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
