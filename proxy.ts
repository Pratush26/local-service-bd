import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function proxy(request: NextRequest) {
  const token = await getToken({
          req: request,
          secret: process.env.AUTH_SECRET,
      });
      if(!token) return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: ['/dashboard/:path*']
}