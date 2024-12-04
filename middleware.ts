import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-forwarded-host', 'readaton.netlify.app');

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}