// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development'
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['sysqvbodqpcnrhjkptsx.supabase.co'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // Não exponha a chave de serviço no frontend
    // SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  webpack: (config, { dev, isServer }) => {
    // Aqui podemos adicionar regras webpack adicionais
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    
    return config
  },
  // Configurações de cabeçalhos de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Cabeçalhos CORS apenas em desenvolvimento
          ...(process.env.NODE_ENV === 'development' 
            ? [{ key: 'Access-Control-Allow-Origin', value: '*' }] 
            : []),
          // Cabeçalhos de segurança
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://*.supabase.co; frame-ancestors 'self';" }
        ],
      },
    ]
  },
  // Configurar para modo standalone, melhor para deploy na Vercel
  output: 'standalone',
  // COMPLETAMENTE DESABILITAR PRÉ-RENDERIZAÇÃO
  // Isso é crucial para evitar erros com useLocation durante a build
  compiler: {
    // Remover código de desenvolvimento no build
    removeConsole: process.env.NODE_ENV === 'production',
  }
}

// module.exports = withPWA(nextConfig);
module.exports = nextConfig; // Exportar a config normal sem o PWA wrapper 
