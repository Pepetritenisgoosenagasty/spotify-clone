import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(req) {
//   Token will exist if user is logged in
const token = await getToken({ req, secret: process.env.JWT_SECRET})

const { pathname } = req.nextUrl.clone();

// Allow request if the following is true...
// 1. It`s a request for next-auth session and provider fetching
// 2. the token exist

if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
}

// Redirect them to login page if the user dont have token & are requesting a protected route
if (!token && pathname !== '/login') {
   return NextResponse.redirect(new URL('/login', req.url))
}
}