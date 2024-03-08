import { Ping } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { prisma } from '~/app/prisma';
import { sub } from 'date-fns';
import { getPingById } from '~/app/sites/[siteId]/pings/controller/getPingById';


export interface TimeChartData {
  data: { pingUrl: Ping['url'], pingId: Ping['id'], createdAt: Date, requestTime: number }[];
}

export type LastEnum = 'last24h' | 'lastMonth';

export async function getPingRequestTimeChartData(id: Ping['id'], last: LastEnum): Promise<TimeChartData> {
  const session = await serverAuthOr404();

  const gt = {
    'last24h': sub(new Date(), {hours: 24}),
    'lastMonth': sub(new Date(), {days: 30}),
  }

  const res = await prisma.pingResult.findMany({
    select: {
      requestTime: true,
      createdAt: true,
    },
    where: {
      userId: session.user.id,
      pingId: id,
      createdAt: {
        gt: gt[last]
      }
    }
  });
  const ping = await getPingById(id);


  return {
    data: res.map(e => ({...e, pingId: id, pingUrl: ping!.url})),
  };
}
