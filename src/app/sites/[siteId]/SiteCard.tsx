'use client'
import { Ping, Site as SiteType } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import DeleteConfirm from '~/app/components/Confirm/DeleteConfirm';
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '~/app/components/Toast/notify';
import { deleteSite } from '~/app/sites/controller/deleteSite';
import { PingsTable } from '~/app/sites/[siteId]/pings/PingsTable';

export async function SiteCard({site, pings}: { site: SiteType, pings: Ping[] }) {
  const r = useRouter();

  const handleDelete = () => {
    deleteSite(site.id)
      .then(() => {
        notifySuccess({title: `Site ${site.name} deleted successfully`})
        r.push('/sites');
      })
      .catch((e) => {
        console.log(e);
        notifyError({title: 'Could not delete site.'})
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {site.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PingsTable pings={pings} />
      </CardContent>
      <CardFooter className={'justify-end'}>
        <Button variant={'link'} asChild>
          <Link href={`/sites/edit/${site.id}`}>Edit</Link>
        </Button>
        <DeleteConfirm
          message={'Do you really want to delete this Site?'}
          title={`Delete Site: ${site.name}`}
          buttonLabel={'Delete'}
        >
          <Button onClick={handleDelete} variant={'destructive'}>Delete</Button>
        </DeleteConfirm>
      </CardFooter>

    </Card>
  )
}
