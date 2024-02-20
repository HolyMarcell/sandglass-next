import { serverAuthOr404 } from '~/app/util/serverAuthOr404';

export default async function DashboardPage() {

  void serverAuthOr404();


  return (
    <div>
      Hello Dashboard
    </div>
  )
}
