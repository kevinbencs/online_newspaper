import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import { supabase } from './article';
import { PostgrestSingleResponse } from '@supabase/supabase-js';


interface Art {
  title: string,
  author: string,
}


export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUser = createServerClient(
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
  } = await supabaseUser.auth.getUser()

  const adminCookei = cookies().get('admin-log')
  const url: string = request.nextUrl.pathname;

  if (adminCookei) {

    try {
      const resFetch = await fetch(`${request.nextUrl.origin}/auth/mongomiddleware/paywall`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie: adminCookei.value })
      })

      const resJson = await resFetch.json() as { res: { role: string, email: string, name: string } }

      if (resJson.res.role === '' && (
        url === '/createdadmin' ||
        url.startsWith('/dashboard') ||
        url === '/delete_data' ||
        url.startsWith('/editarticle') ||
        url === '/newarticle' ||
        url === '/writenewsletter' ||
        url.startsWith('/lockedarticle') ||
        url === '/writecarrier'
      )) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }





      if (resJson.res.role !== '' && url.split('/').length === 6) {
        const res = await fetch(`${request.nextUrl.origin}/api/article/ispaywall/${url}`);
        const resJSON: { res: boolean } = await res.json();

        if (resJSON.res) {
          const newUrl = request.nextUrl.clone();
          newUrl.pathname = `${url}/paywall`;
          return NextResponse.redirect(newUrl)
        }
      }


      if ((resJson.res.role !== 'Admin' && resJson.res.role !== 'Editor') && url === '/dashboard/category_image_audio_video') {
        const newUrl = request.nextUrl.clone()
        newUrl.pathname = '/'
        return NextResponse.redirect(newUrl)
      }

      if (resJson.res.role !== 'Admin' && (url === '/createdadmin' || url === '/writecarrier' || url === '/dashboard/delete_user_article_colleague_carrier')) {
        const newUrl = request.nextUrl.clone()
        newUrl.pathname = '/'
        return NextResponse.redirect(newUrl)
      }

      if ((resJson.res.role !== 'Admin' && resJson.res.role !== 'Editor') && url.startsWith('/lockedarticle')) {
        const newUrl = request.nextUrl.clone()
        newUrl.pathname = '/'
        return NextResponse.redirect(newUrl)
      }

      if (url.startsWith('/editarticle') && resJson.res.role === 'Author') {
        const first_slash_index = url.indexOf("/", 13);
        const second_slash_index = url.indexOf("/", first_slash_index + 1);
        const third_slash_index = url.indexOf("/", second_slash_index + 1);
        const fourth_slash_index = url.indexOf("/", third_slash_index + 1);
        const category = url.slice(13, first_slash_index);
        const year = url.slice(first_slash_index + 1, second_slash_index)
        const moth = url.slice(second_slash_index + 1, third_slash_index);
        const day = url.slice(third_slash_index + 1, fourth_slash_index);
        const title = url.slice(fourth_slash_index + 1, url.length);
        const date = year + '. ' + moth + '. ' + day + '.'
        const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select().eq('title', title.replaceAll('_', ' ')).eq('date', date);

        if (article.data) {
          if (resJson.res.name !== article.data[0].author) {
            const newUrl = request.nextUrl.clone()
            newUrl.pathname = '/'
            return NextResponse.redirect(newUrl)
          }
        }
        else {
          const newUrl = request.nextUrl.clone()
          newUrl.pathname = '/'
          return NextResponse.redirect(newUrl)
        }


      }

      if (resJson.res.role !== '' && (
        url.startsWith('/signin') ||
        url === '/signup' ||
        url === '/dhdhdhsefgsgerhtrherwgerhagfws'
      )) {

        const newUrl = request.nextUrl.clone()
        newUrl.pathname = '/'
        return NextResponse.redirect(newUrl)
      }

      if (
        (!user && resJson.res.role === '') &&
        (
          request.nextUrl.pathname.split('/')[6] === 'paywall'
        )
      ) {
        const lastUrl: string[] = request.nextUrl.pathname.split('/');
        lastUrl.pop();
        const url = request.nextUrl.clone()
        url.pathname = lastUrl.join('/');
        return NextResponse.redirect(url)
      }

    } catch (error) {
      console.log(error)
    }
  }

  if (
    (!user && !adminCookei) &&
    (
      request.nextUrl.pathname.split('/')[6] === 'paywall'
    )
  ) {
    const lastUrl: string[] = request.nextUrl.pathname.split('/');
    lastUrl.pop();
    const url = request.nextUrl.clone()
    url.pathname = lastUrl.join('/');
    return NextResponse.redirect(url)
  }

  if (!adminCookei && (
    url === '/createdadmin' ||
    url.startsWith('/dashboard') ||
    url === '/delete_data' ||
    url.startsWith('/editarticle') ||
    url === '/newarticle' ||
    url === '/writenewsletter' ||
    url.startsWith('/lockedarticle') ||
    url === '/writecarrier'
  )) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }



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

  if (
    (user && user.app_metadata.twofa === true && !Cookie) &&
    (
      request.nextUrl.pathname.split('/')[6] === 'paywall'
    )
  ) {
    const lastUrl: string[] = request.nextUrl.pathname.split('/');
    lastUrl.pop();
    const url = request.nextUrl.clone()
    url.pathname = '/' + lastUrl.join('/');
    return NextResponse.redirect(url)
  }


  if ((user && user.app_metadata.twofa === 'false') &&
    request.nextUrl.pathname.split('/').length === 6
  ) {
    const newUrl = request.nextUrl.pathname;
    const res = await fetch(`${request.nextUrl.origin}/api/article/ispaywall/${newUrl}`);
    const resJSON: { res: boolean } = await res.json();

    if (resJSON.res) {
      const url = request.nextUrl.clone()
      url.pathname = `${newUrl}/paywall`
      return NextResponse.redirect(url)
    }
  }


  if ((user && user.app_metadata.twofa === 'true' && Cookie) &&
    request.nextUrl.pathname.split('/').length === 6
  ) {

    const resCookie = await fetch(`${request.nextUrl.origin}/auth/provider/twofa/twofausercookie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: Cookie.value, id: user.id })
    })

    const resCookieJson: { res: boolean } = await resCookie.json()

    if (resCookieJson.res) {
      const newUrl = request.nextUrl.pathname;
      const res = await fetch(`${request.nextUrl.origin}/api/article/ispaywall/${newUrl}`);
      const resJSON: { res: boolean } = await res.json();

      if (resJSON.res) {
        const url = request.nextUrl.clone()
        url.pathname = `${newUrl}/paywall`
        return NextResponse.redirect(url)
      }
    }
  }

  /*if (user && user.app_metadata.twofa === 'true' &&
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
  }*/





  if (user && !TWOFA && !Cookie && user.app_metadata.twofa === 'true') {
    if (request.nextUrl.pathname.startsWith('/signin/twofa')) {
      //The browser gets the cookie slowly 
      const token = request.nextUrl.searchParams.get('linkToken');
      if (token) {
        const res = await fetch(`${request.nextUrl.origin}/auth/provider/twofa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })

        const resJSON: { res: string } = await res.json()
        if (resJSON.res === 'false') {
          await supabaseUser.auth.signOut()
        }
      }
      else {
        await supabaseUser.auth.signOut();
      }
    }
    else {
      if ((request.nextUrl.pathname !== '/resetpassword') &&
        (!request.nextUrl.pathname.startsWith('/auth/confirm/resetpassword')) &&
        (request.nextUrl.pathname !== '/api/category') &&
        (request.nextUrl.pathname !== '/api/search')
      ) {
        await supabaseUser.auth.signOut();
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

      const resJSON: { res: boolean } = await res.json()
      if (resJSON.res === false) {

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
    console.log(30)
    const search = request.nextUrl.searchParams.get('linkToken');
    if (search) {

      const res = await fetch(`${request.nextUrl.origin}/auth/provider/twofa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: search })
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
    request.nextUrl.pathname === '/admin_login'
  )) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }


  return supabaseResponse
}