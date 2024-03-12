import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

    let cookie = request.cookies.get('nextjs')
    console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
    const allCookies = request.cookies.getAll()
    console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
    
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')
 
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
 
  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}