import { NextResponse } from 'next/server'

export function middleware(request) {
  const session = request.cookies.get('admin_session')
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (pathname === '/admin/login' && session) {
      return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
