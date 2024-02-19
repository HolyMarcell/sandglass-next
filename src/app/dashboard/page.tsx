import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';

export default async function DashboardPage() {

  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <div>
      Hello Dashboard
    </div>
  )
}
