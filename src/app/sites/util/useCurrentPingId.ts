import { notFound, usePathname } from 'next/navigation';
import { isNil } from 'ramda';
import { Ping } from '@prisma/client';

export const useCurrentPingId = (): Ping['id'] => {
  const pingId = usePathname().split('/')[5];
  if(isNil(pingId)) {
    notFound();
  }
  return pingId;
}
