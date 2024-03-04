import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { runPings } from '~/app/api/ping/runPings';

export const POST = (req: NextApiRequest, res: NextApiRequest) => {
  runPings();
  return NextResponse.json({});
}

export const GET = (req: NextApiRequest, res: NextApiRequest) => {
  return NextResponse.json({});
}
