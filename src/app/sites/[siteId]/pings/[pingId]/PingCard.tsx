'use client'
import { Ping } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import DeleteConfirm from '~/app/components/Confirm/DeleteConfirm';
import { useRouter } from 'next/navigation';
import { useCurrentSiteId } from '~/app/sites/util/useCurrentSiteId';

export async function PingCard({ping}: { ping: Ping }) {
  const r = useRouter();
  const siteId = useCurrentSiteId();

  // const handleDelete = () => {
  //   deleteSite(site.id)
  //     .then(() => {
  //       notifySuccess({title: `Site ${site.name} deleted successfully`})
  //       r.push('/sites');
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       notifyError({title: 'Could not delete site.'})
  //     })
  // }

  const handleDelete = () => {
    console.log('del del del')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {ping.url}
        </CardTitle>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className={'justify-end'}>
        <Button variant={'link'} asChild>
          <Link href={`/sites/${siteId}/pings/edit/${ping.id}`}>Edit</Link>
        </Button>
        <DeleteConfirm
          message={'Do you really want to delete this Ping?'}
          title={`Delete Ping: ${ping.url}`}
          buttonLabel={'Delete'}
        >
          <Button onClick={handleDelete} variant={'destructive'}>Delete</Button>
        </DeleteConfirm>
      </CardFooter>

    </Card>
  )
}
