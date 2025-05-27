import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings'
];

// Paths that are only accessible to non-authenticated users
const authPaths = [
  '/signin',
  '/signup'
];

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // Check if the path is auth-only
  const isAuthPath = authPaths.some(authPath => 
    path.startsWith(authPath)
  );

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && isProtectedPath) {
    const searchParams = new URLSearchParams({
      callbackUrl: path
    });
    return NextResponse.redirect(
      new URL(`/signin?${searchParams}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /images (inside /public)
     * 5. /models (inside /public)
     * 6. all files inside /public (e.g. favicon.ico)
     */
    '/((?!api|_next|fonts|images|models|[\\w-]+\\.\\w+).*)',
  ],
}; 