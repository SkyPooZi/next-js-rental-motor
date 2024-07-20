import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const role = request.cookies.get('role');

  if (token == null) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (role === 'user' && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if(role === 'admin' && request.nextUrl.pathname.startsWith('/')){
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

export const config = {
  matcher: ['/admin', '/catalog', '/form', '/', '/about', '/detail'],
};