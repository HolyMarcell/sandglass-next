'use client'
import { Site } from '@prisma/client';
import { ColumnDef } from '@tanstack/table-core';
import Link from 'next/link';
import { DataTable } from '~/components/ui/dataTable';
import { Button } from '~/components/ui/button';


const columns: ColumnDef<Site>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'pingStatus',
    header: 'Status',
  },
  {
    id: 'actions',
    header: () => (
      <div className={'flex justify-end'}>
        <Button asChild variant={'link'} className={'ml-auto'}>
          <Link href={'/sites/new'}>+ New</Link>
        </Button>
      </div>
    ),
    cell: ({row}) => {
      return (
        <div className={'flex justify-end'}>
          <Link href={`/sites/${row.original.id}`}>See</Link>
        </div>
      )
    }
  }
]


export function SitesTable({sites}: { sites: Site[] }) {


  return (
    <div className={'border-bggrad2 border rounded-lg'}>
      <DataTable data={sites} columns={columns}/>
    </div>
  )
}
