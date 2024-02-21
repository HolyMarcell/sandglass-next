import { PrismaClient, Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { isNil } from 'ramda';
import { notFound } from 'next/navigation';


const prisma = new PrismaClient();

async function getData(id: Site['id']): Promise<Site | null> {
  const session = await serverAuthOr404();

  const site = prisma.site.findUnique({
    where: {
      userId: session.user.id,
      id: id,
    }
  });

  return site;
}


export default async function SitePage({params}: {params: {siteId: string}}) {

  const data = await getData(params.siteId);
  if(isNil(data)) {
    notFound();
  }

  return(
    <div>
      Hello Site {data.name}
    </div>
  )
}
