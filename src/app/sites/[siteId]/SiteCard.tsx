import { Site as SiteType } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

export async function SiteCard({site}: { site: SiteType }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {site.name}
        </CardTitle>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className={'justify-end'}>
          <Button variant={'link'} asChild>
            <Link href={`/sites/edit/${site.id}`}>Edit</Link>
          </Button>
      </CardFooter>

    </Card>
  )
}
