import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { updateSession } from "@/lib/supabaseProxy"


export async function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl

  const { supabase } = updateSession(req)
  const { data: { user } } = await supabase.auth.getUser()


  if (pathname.startsWith('/bandas') && !user) {
    return NextResponse.redirect(new URL('/', req.url))
  }
 
  if (pathname.startsWith('/distribuciones') && !user) {
    return NextResponse.redirect(new URL('/', req.url))
  }



  return NextResponse.next()
}

export const config = {
  matcher: [
    '/bandas/:path*',
    '/distribuciones/:path*',
   
  ]
};