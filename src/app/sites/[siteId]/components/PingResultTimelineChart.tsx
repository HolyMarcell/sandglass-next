import { Site } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { TimelineChart } from '~/app/sites/[siteId]/components/charts/TimelineChart';
import { getSiteRequestTimeChartData } from '~/app/sites/controller/getSiteRequestTimeChartData';


export default async function PingResultTimelineChart({site}: { site: Site }) {

  const data = await getSiteRequestTimeChartData(site.id, 'last24h');

  return (
    <Card>
      <CardHeader className={''}>
        <CardTitle className={'flex items-center'}>
          Chart bart
        </CardTitle>
      </CardHeader>
      <CardContent className={'h-48'}>
        <TimelineChart data={data} />

      </CardContent>
      <CardFooter className={'justify-end'}>

      </CardFooter>

    </Card>
  )
}
