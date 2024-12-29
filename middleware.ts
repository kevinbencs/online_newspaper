import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

interface Data {
  res: string
}

export async function middleware(request: NextRequest) {

  const url: string = request.nextUrl.pathname;
  const cookie = request.cookies.get('admin-log');

  if (!cookie && (
    url === '/createdadmin' ||
    url.startsWith('/dashboard') ||
    url === '/delete_data' ||
    url.startsWith('/editarticle') ||
    url === '/newarticle' ||
    url === '/writenewsletter' ||
    url.startsWith('/lockedarticle')
  )) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }


  if (cookie) {
    const response = await fetch(`${request.nextUrl.origin}/auth/mongomiddleware`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, cookie: cookie.value })
    });
    const data = await response.json() as Data;
    const s: string = data.res;

    if (s === 'error') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
