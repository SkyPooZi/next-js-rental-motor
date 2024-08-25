import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const isAdmin = request.cookies.get('isAdmin');
  const motorId = request.cookies.get('motorId');

  const { pathname } = request.nextUrl;

  // Redirect to login if not authenticated
  if (!token) {
    const returnUrl = pathname;
    return NextResponse.redirect(new URL(`/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url));
  }

  // Redirect to home if not an admin and trying to access any /admin route
  if (pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to specific motor form if motorId is present
  if (pathname === '/form') {
    if (motorId) {
      const newUrl = new URL(`/form/${motorId}`, request.url);
      return NextResponse.redirect(newUrl);
    }
  }

  // Ensure authenticated access to '/form/:motorId'
  if (pathname.startsWith('/form/') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/setting', '/form', '/form/:path*'],
};
