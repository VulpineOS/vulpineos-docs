import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // foxbridge.vulpineos.com → serve /foxbridge/* content at root
  if (hostname.startsWith('foxbridge.')) {
    const url = request.nextUrl.clone()

    // Don't rewrite static assets or API routes
    if (
      url.pathname.startsWith('/_next') ||
      url.pathname.startsWith('/api') ||
      url.pathname.startsWith('/favicon')
    ) {
      return NextResponse.next()
    }

    // Rewrite / → /foxbridge, /quick-start → /foxbridge/quick-start, etc.
    url.pathname = '/foxbridge' + (url.pathname === '/' ? '' : url.pathname)
    const response = NextResponse.rewrite(url)
    // Set header so layout can detect foxbridge subdomain
    response.headers.set('x-foxbridge', '1')
    return response
  }

  return NextResponse.next()
}

export const config = {
  // Match all paths except static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
