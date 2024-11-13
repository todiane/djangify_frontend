import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ["lucide-react"],
  typescript: {
    // !! WARN !!
    // If you want to use TypeScript with strict mode, uncomment this line
    // strict: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'localhost',
      'djangify-backend.onrender.com',
      'djangify-frontend.onrender.com',
      'djangify.com'
    ],
    // Optimize image handling
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  experimental: {
    typedRoutes: true,
    serverComponentsExternalPackages: [],
    scrollRestoration: true,
  },
  // Add build cache configuration
  distDir: '.next',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Add rewrite rules for API proxying
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_DJANGO_URL}/api/v1/:path*`
      }
    ]
  },
  // Compression and performance optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  // Add headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
};

export default withBundleAnalyzer(nextConfig);
