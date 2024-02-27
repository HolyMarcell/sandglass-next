'use client'
import { Ping } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import DeleteConfirm from '~/app/components/Confirm/DeleteConfirm';
import { useRouter } from 'next/navigation';
import { useCurrentSiteId } from '~/app/sites/util/useCurrentSiteId';
import { deletePing } from '~/app/sites/[siteId]/pings/controller/deletePing';
import { notifyError, notifySuccess } from '~/app/components/Toast/notify';
import { LabelList } from '~/components/ui/labelList';

export async function PingCard({ping}: { ping: Ping }) {
  const r = useRouter();
  const siteId = useCurrentSiteId();

  const handleDelete = () => {
    deletePing(ping.id)
      .then(() => {
        notifySuccess({title: `Ping ${ping.url} was deleted successfully`})
        r.push(`/sites/${siteId}/pings`);
      })
      .catch((e) => {
        console.log(e);
        notifyError({title: 'Could not delete ping.'})
      })
  }

  const data = [
    {label: 'Url', data: <Link href={ping.url} target={'_blank'}>{ping.url}</Link> },
    {label: 'Method', data: ping.method},
    {label: 'Expect Status', data: ping.expectStatus},
    {label: 'Timer', data: ping.timer},
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {ping.url}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LabelList list={data} />
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
