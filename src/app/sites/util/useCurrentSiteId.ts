import { notFound, usePathname } from 'next/navigation';
import { isNil } from 'ramda';
import { Site } from '@prisma/client';

export const useCurrentSiteId = (): Site['id'] => {
  const siteId = usePathname().split('/')[2];
  if(isNil(siteId)) {
    notFound();
  }
  return siteId;
}
