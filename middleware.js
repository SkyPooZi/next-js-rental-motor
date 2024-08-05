import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const role = request.cookies.get('role');
  const motorId = request.cookies.get('motorId');

  if (!token) {
    const returnUrl = request.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/pages/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url));
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/settings')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === '/form') {
    if (motorId) {
      const newUrl = new URL(`/form/${motorId}`, request.url);
      return NextResponse.redirect(newUrl);
    }
  }

  if (request.nextUrl.pathname.startsWith('/form/') && !token) {
    return NextResponse.redirect(new URL('/pages/login', request.url));
  }
}

export const config = {
  matcher: ['/admin', '/settings', '/form', '/form/:path*'],
};