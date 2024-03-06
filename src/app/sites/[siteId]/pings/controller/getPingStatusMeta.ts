import { Ping, PingResult } from '@prisma/client';
import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import { prisma } from '~/app/prisma';


export interface PingStatusMeta {
  onlineSince: PingResult['createdAt'] | false;
}

interface OnlineSinceQueryRes {
  createdAt: PingResult['createdAt'];
}

export async function getPingStatusMeta(id: Ping['id']): Promise<PingStatusMeta> {
  const session = await serverAuthOr404();

  const onlineSinceRes = await prisma.$queryRaw<OnlineSinceQueryRes[]>`
      SELECT "createdAt"
      FROM "PingResult"
      WHERE status = 'Online'
        AND "pingId" = '${id}'
        AND "userId" = '${session.user.id}'
        AND "createdAt" > COALESCE(
              (
                  SELECT MAX("createdAt")
                  FROM "PingResult"
                  WHERE status = 'Offline'
              ),
              '1900-01-01'::timestamp
        )
      ORDER BY "createdAt"
      LIMIT 1
  `





  return {
    onlineSince: onlineSinceRes.length > 0 ? onlineSinceRes[0]!.createdAt : false,
  };
}
