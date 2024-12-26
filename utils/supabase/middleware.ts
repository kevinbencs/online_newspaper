import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    (
      request.nextUrl.pathname.startsWith('/about')
    )
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  const Cookie = cookies().get('user-log-2fa')
  const TWOFA = cookies().get('singTwoFA')

  if (user && !TWOFA && !Cookie && user.app_metadata.twofa === 'true') {
    if (request.nextUrl.pathname.startsWith('/signin/twofa')) {
      const search = request.nextUrl.searchParams.get('linkToken');
      if (search) {

        const res = await fetch(`${request.nextUrl.origin}/auth/provider/twofa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ search })
        })

        const resJSON: { res: string } = await res.json()
        if (resJSON.res === 'false') {
          await supabase.auth.signOut()
        }
      }
      else {
        await supabase.auth.signOut();
      }
    }
    else {
      if ((request.nextUrl.pathname !== '/resetpassword') && 
      (!request.nextUrl.pathname.startsWith('/auth/confirm/resetpassword')) && 
      (request.nextUrl.pathname !== '/api/category') && 
      (request.nextUrl.pathname !== '/api/search')
    ){
        await supabase.auth.signOut();
      }
    }
  }

  if (
    user && (user.app_metadata.twofa === 'false' || !user.app_metadata.twofa) &&
    (
      request.nextUrl.pathname.startsWith('/signin') ||
      request.nextUrl.pathname.startsWith('/signup') ||
      request.nextUrl.pathname === '/dhdhdhsefgsgerhtrherwgerhagfws'
    )
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }



  if (user && user.app_metadata.twofa === 'true' &&
    (
      request.nextUrl.pathname.startsWith('/about')
    )) {
    if (!Cookie) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    else {
      const res = await fetch(`${request.nextUrl.origin}/auth/provider/twofa/twofausercookie`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: Cookie.value, id: user.id })
      })

      const resJSON: { res: string } = await res.json()
      if (resJSON.res === 'false') {

        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }
    }
  }


  if (TWOFA && request.nextUrl.pathname.startsWith('/signin/twofa')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }

    const res = await fetch(`${request.nextUrl.origin}/auth/provider/twofa/twofasingincookie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: TWOFA.value, id: user.id })
    })

    const resJSON: { res: string } = await res.json();

    if (resJSON.res === 'false') {
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }

  }


  if ((!TWOFA) &&
    request.nextUrl.pathname.startsWith('/signin/twofa')
  ) {
    const search = request.nextUrl.searchParams.get('linkToken');
    if (search) {

      const res = await fetch(`${request.nextUrl.origin}/auth/provider/twofa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search })
      })

      const resJSON: { res: string } = await res.json()
      if (resJSON.res === 'false') {
        const url = request.nextUrl.clone()
        url.pathname = '/signin'
        return NextResponse.redirect(url)
      }

    }
    else {
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }
  }

  if (user && user.app_metadata.twofa === 'true' && TWOFA &&
    (
      request.nextUrl.pathname === '/signin'
    )) {
    const res = await fetch(`${request.nextUrl.origin}/auth/provider/twofa/twofasingincookie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: TWOFA.value, id: user.id })
    })

    const resJSON: { res: string } = await res.json();

    if (resJSON.res === 'false') {
      const url = request.nextUrl.clone()
      url.pathname = '/signin/twofa'
      return NextResponse.redirect(url)
    }
  }



  if (user && user.app_metadata.twofa === 'true' && Cookie && (
    request.nextUrl.pathname.startsWith('/signin') ||
    request.nextUrl.pathname.startsWith('/signup') ||
    request.nextUrl.pathname === '/dhdhdhsefgsgerhtrherwgerhagfws'
  )) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}