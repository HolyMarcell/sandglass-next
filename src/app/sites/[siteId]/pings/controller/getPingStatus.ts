import { Ping, PingResult, PingResultStatus } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { prisma } from '~/app/prisma';
import { cache } from 'react';


export interface PingStatus {
  status: PingResultStatus,
  onlineSince: PingResult['createdAt'] | false;
  offlineSince: PingResult['createdAt'] | false;
}

interface OnlineSinceQueryRes {
  createdAt: PingResult['createdAt'];
}

async function getPingStatusFn(id: Ping['id']): Promise<PingStatus> {
  const session = await serverAuthOr404();

  const statQuery = prisma.pingResult.findFirst({
    where: {
      userId: session.user.id,
      pingId: id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });


  const onlineSinceQuery = prisma.$queryRaw<OnlineSinceQueryRes[]>`
      SELECT "createdAt"
      FROM "PingResult"
      WHERE status = 'Online'
        AND "pingId" = ${id}
        AND "userId" = ${session.user.id}
        AND "createdAt" > COALESCE(
              (
                  SELECT MAX("createdAt")
                  FROM "PingResult"
                  WHERE status = 'Offline'
                    AND "pingId" = ${id}
                    AND "userId" = ${session.user.id}
              ),
              '1900-01-01'::timestamp
                          )
      ORDER BY "createdAt"
      LIMIT 1
  `

  const offlineSinceQuery = prisma.$queryRaw<OnlineSinceQueryRes[]>`
      SELECT "createdAt"
      FROM "PingResult"
      WHERE status = 'Offline'
        AND "pingId" = ${id}
        AND "userId" = ${session.user.id}
        AND "createdAt" > COALESCE(
              (
                  SELECT MAX("createdAt")
                  FROM "PingResult"
                  WHERE status = 'Online'
                    AND "pingId" = ${id}
                    AND "userId" = ${session.user.id}
              ),
              '1900-01-01'::timestamp
        )
      ORDER BY "createdAt"
      LIMIT 1
  `

  return Promise.all([statQuery, onlineSinceQuery, offlineSinceQuery])
    .then(([statRes, onlineSinceRes, offlineSinceRes]) => {
      return {
        status: statRes?.status ?? 'Unknown',
        onlineSince: onlineSinceRes.length > 0 ? onlineSinceRes[0]!.createdAt : false,
        offlineSince: offlineSinceRes.length > 0 ? offlineSinceRes[0]!.createdAt : false,
      }
    })
}


export const getPingStatus = cache(getPingStatusFn);
