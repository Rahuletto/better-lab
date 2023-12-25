import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

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

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const res = NextResponse.next();

  const head = req.headers.get('authorization');

  const ip = getIp(req);
  const uid = head && atob(head?.replace('Basic ', ''));

  const { success, limit, remaining, reset, pending } =
    await ratelimit.blockUntilReady(uid || ip || '0.0.0.0', 5000);

  if (remaining <= 0) {
    if (req.headers.get('content-type') == 'application/json')
      return Response.json(
        {
          message: 'Ratelimited !',
          warning:
            'Repeating this periodically may result of blacklisting of your ip',
          status: 429,
        },
        {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'RateLimit-Limit': limit.toString(),
            'Retry-After': reset.toString(),
          },
        }
      );
    else NextResponse.redirect(new URL('/ratelimit', req.url));
  } else {
    event.waitUntil(pending);

    res.headers.set('RateLimit-Limit', limit.toString());
    res.headers.set('RateLimit-Remaining', remaining.toString());

    if (!success)
      return Response.json(
        {
          message: 'Ratelimited !',
          warning:
            'Repeating this periodically may result of blacklisting of your ip',
          status: 429,
        },
        {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'RateLimit-Limit': limit.toString(),
            'Retry-After': reset.toString(),
          },
        }
      );

    return res;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

function getIp(request: NextRequest) {
  let ip = request.ip ?? request.headers.get('x-real-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? 'Unknown';
  }

  return ip;
}
