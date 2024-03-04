import { prisma } from '~/app/prisma';
import { Ping } from '@prisma/client';

export const runPings = async () => {
  const pings = await prisma.ping.findMany();
  pings.map(runPing);
}


const runPing = (ping: Ping) => {

  return fetch(ping.url, {
    method: ping.method
  })
    .then((res) => {
      const pingStatus = res.status === ping.expectStatus ? 'Online' : 'Offline';
      return prisma.pingResult.create({
        data: {
          status: pingStatus,
          userId: ping.userId,
          pingId: ping.id,
        }
      });
    });

}
