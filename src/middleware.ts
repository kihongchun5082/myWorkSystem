/* // src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { authConfig } from "./auth"; // 경로는 실제 위치에 따라 조정
export default withAuth(authConfig);

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});


// middleware가 적용될 경로 설정 🔸 matcher는 보호할 경로입니다. 예: 로그인한 사용자만 접근 허용할 페이지
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/visits/:path*"],
};
 */

// export { auth as middleware } from "@/auth"
/* 
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/new',
    // '/',
  ],
};
 */
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // 인증 실패 시 처리
  if (!token) {
    const { pathname } = req.nextUrl;

    // API 요청이면 401 응답
    if (pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }

    // 페이지 접근이면 로그인 페이지로 리다이렉트
    const signInUrl = new URL('/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // 인증 성공 시 다음 단계로
  return NextResponse.next();
}

// ✅ 인증을 요구할 경로들 설정
export const config = {
  matcher: [
    '/new',
    '/new/:path*',
    '/',
    '/visit',
    '/visit/:path*',
  ],
};

