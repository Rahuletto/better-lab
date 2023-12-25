import { NextRequest, NextResponse } from 'next/server';

// Ratelimits
import { Ratelimit } from '@upstash/ratelimit';
import redis from './utils/redis';

const cache = new Map();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(30, '30 s'),
  prefix: '@ratelimit/betterlab',
  ephemeralCache: cache,
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const head = req.headers.get('authorization');

  const ip = getIp(req);
  const uid = head && atob(head?.replace('Basic ', ''));

  const { success, limit, remaining, reset } = await ratelimit.blockUntilReady(
    uid || ip || '0.0.0.0',
    10_000
  );

  res.headers.set('RateLimit-Limit', limit.toString());
  res.headers.set('RateLimit-Remaining', remaining.toString());

  return success
    ? res
    : new NextResponse(
        JSON.stringify({
          message: 'Ratelimited !',
          warning:
            'Repeating this periodically may result of blacklisting of your ip',
          status: 429,
        }),
        {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'RateLimit-Limit': limit.toString(),
            'Retry-After': reset.toString(),
          },
        }
      );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

function generateUUID() {
  var d = new Date().getTime();

  var uuid = 'codeboard_api.xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
}

function getIp(request: NextRequest) {
  let ip = request.ip ?? request.headers.get('x-real-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? 'Unknown';
  }

  return ip
}
