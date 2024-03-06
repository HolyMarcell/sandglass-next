import { prisma } from '~/app/prisma';
import { Ping, PingResultStatus } from '@prisma/client';
import { differenceInMilliseconds } from 'date-fns';
import { isNil } from 'ramda';

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
  const diff = !isNil(lastPing?.createdAt) ? differenceInMilliseconds(new Date(), new Date(lastPing.createdAt)) : 2000000;

  // Spam prevention: If less than 9 seconds elapsed since last call, we dont call now
  if (diff < 9000) {
    return;
  }

  // Do the ping
  let pingStatus: PingResultStatus;
  try {

    const request = await fetch(ping.url, {
      method: ping.method
    });
    pingStatus = request.status === ping.expectStatus ? 'Online' : 'Offline';
  } catch (_) {
    pingStatus = 'Offline';
  }

  // Update the "Site" to the newest ping status
  await prisma.site.update({
    where: {
      id: ping.siteId
    },
    data: {
      pingStatus: pingStatus
    }
  })

  return prisma.pingResult.create({
    data: {
      status: pingStatus,
      userId: ping.userId,
      pingId: ping.id,
    }
  });

}
