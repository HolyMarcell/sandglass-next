import { Site } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { prisma } from '~/app/prisma';
import { SiteWithPing } from '~/app/sites/controller/getSites';


interface GetSiteByIdOptionsWP {
  withPings?: boolean;
}

export async function getSiteById<B extends GetSiteByIdOptionsWP>(id: Site['id'], opts?: B):
  Promise<B['withPings'] extends true ? SiteWithPing | null : Site | null> {
  const session = await serverAuthOr404();



  const site = await prisma.site.findUnique({
    where: {
      userId: session.user.id,
      id: id,
    },
    include: {
      pings: opts?.withPings ?? false,
    }
  });

  return site;
}
