import { prisma } from '~/app/prisma';
import { Ping } from '@prisma/client';
import { differenceInMilliseconds } from 'date-fns';

export const runPings = async () => {
  const pings = await prisma.ping.findMany();
  const waitfor = pings.map(runPing);
  return Promise.all(waitfor);
}


const runPing = async (ping: Ping) => {

  const lastPing = await prisma.pingResult.findFirst({
    where: {
      userId: ping.userId,
      pingId: ping.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  const diff = differenceInMilliseconds(new Date(), new Date(lastPing?.createdAt ?? new Date()));

  // Spam prevention: If less than 9 seconds elapsed since last call, we dont call now
  if(diff < 9000) {
    return;
  }

  const request = await  fetch(ping.url, {
    method: ping.method
  });
  const pingStatus = request.status === ping.expectStatus ? 'Online' : 'Offline';

  return prisma.pingResult.create({
    data: {
      status: pingStatus,
      userId: ping.userId,
      pingId: ping.id,
    }
  });

}
