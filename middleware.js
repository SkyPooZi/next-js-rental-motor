// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  if(token == null){
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ['/admin', '/catalog', '/form', '/'], // List all paths that need protection
};