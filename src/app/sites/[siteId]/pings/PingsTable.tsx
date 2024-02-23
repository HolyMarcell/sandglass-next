'use client'
import { Ping, Site } from '@prisma/client';
import { ColumnDef } from '@tanstack/table-core';
import Link from 'next/link';
import { DataTable } from '~/components/ui/dataTable';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { useCurrentSiteId } from '~/app/sites/util/useCurrentSiteId';


const makeColumns = (siteId: Site['id']): ColumnDef<Ping>[] => [
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    accessorKey: 'method',
    header: 'Method',
  },
  {
    accessorKey: 'expectStatus',
    header: 'Expected Status',
  },
  {
    accessorKey: 'timer',
    header: 'Timer',
  },
  {
    id: 'actions',
    header: () => (
      <div className={'flex justify-end'}>
        <Button asChild variant={'link'} className={'ml-auto'}>
          <Link href={`/sites/${siteId}/pings/new`}>+ New</Link>
        </Button>
      </div>
    ),
    cell: () => {
      return (
        <div className={'flex justify-end'}>
        </div>
      )
    }
  }
]


export function PingsTable({pings}: { pings: Ping[] }) {
  const r = useRouter();
  const siteId = useCurrentSiteId();

  const onRowClick = (ping: Ping) => {
    r.push(`/sites/${siteId}/pings/${ping.id}`)
  }

  const columns = makeColumns(siteId);

  return (
    <div className={''}>
      <DataTable data={pings} columns={columns} onRowClick={onRowClick}/>
    </div>
  )
}
