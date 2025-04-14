import { NextRequest, NextResponse } from 'next/server';
import { logger } from './lib/logger';

// Lista de rotas protegidas que exigem autenticação
const protectedRoutes = ['/dashboard', '/profile', '/workout'];
// Lista de rotas públicas que não redirecionam para dashboard quando logado
const publicOnlyRoutes = ['/login', '/register', '/reset-password'];

export async function middleware(request: NextRequest) {
  // Forçar HTTPS em produção
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }

  // Rotas protegidas que requerem autenticação
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Verificar token de autenticação
    const token = request.cookies.get('sb-auth-token')?.value;
    
    if (!token) {
      // Redireciona para login se não estiver autenticado
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Adicione cabeçalhos de segurança extras para rotas protegidas
    const response = NextResponse.next();
    response.headers.set('X-Protected-Route', 'true');
    return response;
  }

  return NextResponse.next();
}

// Configurar em quais caminhos o middleware deve ser executado
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 