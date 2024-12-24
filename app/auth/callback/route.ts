import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server';
import { supabase } from '@/utils/supabase/article';
import { cookies } from 'next/headers';
import Token from '@/model/Token';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase_user = createClient()
    const { data, error } = await supabase_user.auth.exchangeCodeForSession(code)
    if (!error) {
      await supabase.from('newsletter').update({ user_id: data.user.id }).eq('email', data.user.email);
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (data.user.app_metadata.twofa === 'true') {
        const token = jwt.sign({
          id: data.user.id.toString(),
        },
          process.env.TwoFA_URI!,
          { expiresIn: '2m' }
        )

        const newToken = new Token({ token })

        await newToken.save()
        cookies().set({ name: 'singTwoFA', value: token, httpOnly: true, sameSite: 'strict', path: '/', secure: true, maxAge: 2 * 60 });
        if (isLocalEnv) {
          // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
          return NextResponse.redirect(`${origin}${next}/signin/twofa`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}/signin/twofa`)
        } else {
          return NextResponse.redirect(`${origin}${next}/signin/twofa`)
        }
      }

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}