import { Site } from '@prisma/client';
import { isNil } from 'ramda';
import { notFound } from 'next/navigation';
import { getSiteById } from '~/app/sites/controller/getSiteById';
import { NewPingForm } from '~/app/sites/[siteId]/pings/new/NewPingForm';
import Page from '~/app/components/Layout/Page';

export default async function NewPingPage({params}: {params: {siteId: Site['id']}}) {

  const site = await getSiteById(params.siteId);
  if(isNil(site)) {
    notFound();
  }

  return (
    <Page>
      <NewPingForm />
    </Page>
  )
}
