# News Portal – Next.js Full-Stack Application.

## Overview
A content-driven web application built with Next.js, featuring a `public and protected (login-based) news platform` with a `role-based admin dashboard`.

The project focuses on `SEO, performance, and real-world content workflows,` demonstrating Next.js full-stack capabilities in a production-oriented architecture.

## Key Features

- Public and protected news pages (login-based access & paywall-style content)
- User authentication (sign up, password change, account deletion)
- Role-based access: `admin, editor, author`
- Admin dashboard with article management and readership analytics
- Newsletter subscription and email notifications
- Article sharing and engagement tracking


## Tech Stack

Frontend:
- Next.js - SSR, SSG, ISR and routing 
- TypeScript - type-safe frontend and backend logic
- TailwindCSS - utility-first styling
- Chart.js - admin analytics visualization
- SWR - client-side data fetching and caching
- Socket.io-client - real-time update (optional)


Backend:
- Node.js (Next.js REST API routes)
- Jsonwebtoken - authentication and authorization
- Zod - request validation
- Socket.io - real-time communication (optional)
- RSS generation
- Speakeasy + QRcode - 2FA implementation

Data & Services:
- Supabase - authentication and database services
- MongoDB, Mongoose - content storage
- Resend - transactional email delivery

## Rendering Strategy

Rendering strategies used:
- `ISR` for articles and homepage (revalidated every minute)
- `SSG` for static pages (e.g. imprint)
- `SSR` for search functionality
- `CSR` for user-facing and admin dashboards

## Getting Started
The using guide (`setup.md`) is available in the `/docs` folder.


## Live Demo

Page: https://online-newspaper.vercel.app/

Admin login: https://online-newspaper.vercel.app/admin_login




## Notes
The project supports both `WebSocket-based real-time updates` and `polling-based API refresh`. Due to Vercel limitations, polling is used in production, while the WebSocket implementation is kept to demonstrate both approaches.

#### Why this project matters
This project was built to explore and compare `Next.js rendering strategies in real-world scenarios`, including SEO-sensitive pages, authenticated dashboards, and content-heavy workflows.

## Documentation

Detailed technical documentation is available in the `/docs` folder.






