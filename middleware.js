import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const isAdmin = request.cookies.get('isAdmin');
  const motorId = request.cookies.get('motorId');

  if (!token) {
    const returnUrl = request.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url));
  }

  if (request.nextUrl.pathname === '/admin') {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect to specific motor form if motorId is present
  if (request.nextUrl.pathname === '/form') {
    if (motorId) {
      const newUrl = new URL(`/form/${motorId}`, request.url);
      return NextResponse.redirect(newUrl);
    }
  }

  // Ensure authenticated access to '/form/:motorId'
  if (request.nextUrl.pathname.startsWith('/form/') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // No need to check '/setting' again if token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/setting', '/form', '/form/:path*'],
};
