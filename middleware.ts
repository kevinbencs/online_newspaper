import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'


export async function middleware(request: NextRequest) {

  if(!request.cookies.get('admin-log') && (
    request.nextUrl.pathname === '/createdadmin' || 
    request.nextUrl.pathname === '/dashboard' ||
    request.nextUrl.pathname === '/delete_data' ||
    request.nextUrl.pathname.startsWith('/editarticle') ||
    request.nextUrl.pathname === '/newarticle'
  )) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if(request.cookies.get('admin-log') && (
    request.nextUrl.pathname === '/signin' ||
    request.nextUrl.pathname === '/signup' ||
    request.nextUrl.pathname === '/dhdhdhsefgsgerhtrherwgerhagfws'
  )) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return await updateSession(request)
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
  };


/*
export const config = {
    matcher: [
        "/about/:path*",
        "/admin:path*",
        "/newarticle",
        "/edit/:path*",
        "/signin",
        "/signup"
    ]
};*/