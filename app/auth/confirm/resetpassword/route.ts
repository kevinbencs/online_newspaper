import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    const Cookie = cookies();
    try {
        
        const { searchParams, origin } = new URL(request.url)
        const token_hash = searchParams.get('token_hash')
        const supabase = createClient()
        if (token_hash) {

          const { data, error } = await supabase.auth.verifyOtp({
            type: 'recovery',
            token_hash,
          })
          if (error) {
            console.log(error)
            return NextResponse.redirect(`${origin}/auth/auth-code-error`)
          }
    
          return NextResponse.redirect(`${origin}/resetpassword`)
    
        }
        else { return NextResponse.redirect(`${origin}/auth/auth-code-error`)}
    
      }
      catch (err) {
        console.log(err)
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }
    
}