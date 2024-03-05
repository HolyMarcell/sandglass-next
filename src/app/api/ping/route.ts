import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { runPings } from '~/app/api/ping/runPings';

export const POST = (req: Request, res: Response) => {
  const authString = req.headers.get('authorization');
  if(authString === `Bearer ${process.env.PING_CALL_SECRET}`) {
    runPings();
  }
  return NextResponse.json({});
}

export const GET = (req: NextApiRequest, res: NextApiRequest) => {
  return NextResponse.json({});
}
