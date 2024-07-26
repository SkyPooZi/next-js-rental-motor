import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const role = request.cookies.get('role');

  if (token == null) {
    return NextResponse.redirect(new URL("/login", request.url));
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
}

export const config = {
  matcher: ['/admin', '/settings', '/form'],
};