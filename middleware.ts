/*import { auth  } from "@/auth";

export default auth((req) => {
  const isLogged = !!req.auth;
})*/


import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
  };


/*import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){

    const token = request.cookies.get('token');
    console.log(token);
    const pathName= request.nextUrl.pathname;
    if(!token && (pathName.startsWith("/about") || pathName.startsWith("/admin") || pathName === "/newarticle" || pathName.startsWith("/edit") )) return NextResponse.redirect(new URL("/", request.url));
    if(token && (pathName === '/signin' || pathName === '/signup')) return NextResponse.redirect(new URL("/", request.url));
}

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