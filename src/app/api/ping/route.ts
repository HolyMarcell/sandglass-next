import { NextRequest, NextResponse } from 'next/server';
import { runPings } from '~/app/api/ping/runPings';

export const POST = (req: NextRequest, res: NextResponse) => {
  const authString = req.headers.get('authorization');
  if(authString === `Bearer ${process.env.PING_CALL_SECRET}`) {
    runPings();
  }
  return NextResponse.json({});
}

export const GET = (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({});
}
