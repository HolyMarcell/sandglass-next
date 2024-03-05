import { NextRequest, NextResponse } from 'next/server';
import { runPings } from '~/app/api/ping/runPings';

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const authString = req.headers.get('authorization');
  if(authString === `Bearer ${process.env.PING_CALL_SECRET}`) {
    void runPings();
  }
  return NextResponse.json({});
}

export const GET = (_req: NextRequest, _res: NextResponse) => {
  return NextResponse.json({});
}
