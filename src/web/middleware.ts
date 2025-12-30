import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Configuration for services
  const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
  const PRODUCT_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';
  const ORDER_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

  // Rewrites
  if (pathname.startsWith('/api/v1/auth/')) {
    const targetUrl = new URL(pathname.replace('/api/v1/auth', ''), AUTH_URL);
    targetUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(targetUrl);
  }

  if (pathname.startsWith('/api/v1/products')) {
    const targetUrl = new URL(pathname.replace('/api/v1/products', '/products'), PRODUCT_URL);
    targetUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(targetUrl);
  }

  if (pathname.startsWith('/api/v1/orders')) {
    const targetUrl = new URL(pathname.replace('/api/v1/orders', '/orders'), ORDER_URL);
    targetUrl.search = request.nextUrl.search;
    return NextResponse.rewrite(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
