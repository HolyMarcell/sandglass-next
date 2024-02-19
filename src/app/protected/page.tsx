import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';

export default async function ProtectedPage() {

  // Server
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <div>
      Hello Dashboard
    </div>
  )
}
