import { Site } from '@prisma/client';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import {
  getPingRequestTimeChartData,
  LastEnum,
  TimeChartData
} from '~/app/sites/[siteId]/pings/controller/getPingRequestTimeChartData';
import { isNil } from 'ramda';


export async function getSiteRequestTimeChartData(id: Site['id'], last: LastEnum): Promise<TimeChartData[]> {

  const site = await getSiteById(id, {withPings: true});

  const dats = site?.pings.map(({id}) => {
    return getPingRequestTimeChartData(id, last);
  });

  if(isNil(dats)) {
    return []
  }

  return Promise.all(dats);
}
