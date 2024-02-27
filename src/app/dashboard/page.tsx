import { serverAuthOr404 } from '~/app/util/serverAuthOr404';
import Page from '~/app/components/Layout/Page';

export default async function DashboardPage() {

  void serverAuthOr404();


  return (
    <Page>
      Hello Dashboard
    </Page>
  )
}
