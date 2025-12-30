import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Configuration for services
  const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
  const PRODUCT_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
  const ORDER_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

  // Rewrites
  if (pathname.startsWith('/api/auth/')) {
    const targetUrl = new URL(pathname.replace('/api/auth', ''), AUTH_URL);
    targetUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(targetUrl);
  }

  if (pathname.startsWith('/api/products')) {
    const targetUrl = new URL(pathname.replace('/api/products', '/products'), PRODUCT_URL);
    targetUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(targetUrl);
  }

  if (pathname.startsWith('/api/orders')) {
    const targetUrl = new URL(pathname.replace('/api/orders', '/orders'), ORDER_URL);
    targetUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
