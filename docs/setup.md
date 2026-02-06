## Using guide with websocket


1. Run `npm run websocket` and `npm run comment`
2. Install the dependencies with `npm install`.
3. Make the .env.local file in the root directory, which contains the following:
```
#Website url:
 URL
#MongoDB:
 MONGODB_URI
#Supabase:
 NEXT_PUBLIC_SUPABASE_ANON_KEY
 NEXT_PUBLIC_SUPABASE_URL
 NEXT_PUBLIC_SUPABASE_SEBASE_ROLE
#Resend:
 RESEND_API_KEY
#Email address:
 EMAIL
#Have to generate:
 TwoFA_URI
 TwoFaSingIn_Uri
 Link_Code
 SECRET_CODE
 ```

4. Make the database (sql) and functions in Supabase.
5. Run `npm run build` and `npm run start`.

## Using guide without websocket

1. Run `npm run api` and `npm run comment`
2. Install the dependencies with `npm install`.
3. Make the .env.local file in the root directory, which contains the following:
```
#Website url:
 URL
#MongoDB:
 MONGODB_URI
#Supabase:
 NEXT_PUBLIC_SUPABASE_ANON_KEY
 NEXT_PUBLIC_SUPABASE_URL
 NEXT_PUBLIC_SUPABASE_SEBASE_ROLE
#Sendgrid:
 SENDGRID_API_KEY
#Email address:
 EMAIL
#Have to generate:
 TwoFA_URI
 TwoFaSingIn_Uri
 Link_Code
 SECRET_CODE
 ```

4. Make the database (sql) and functions in Supabase.
5. Run `npm run build` and `npm run start`.