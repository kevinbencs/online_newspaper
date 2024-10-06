import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})