import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build output configuration for Docker
  output: 'standalone',

  // Core configurations
  reactStrictMode: true,
  transpilePackages: ["lucide-react"],
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  compress: true,
  distDir: '.next',
  productionBrowserSourceMaps: false,

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'djangifybackend.up.railway.app',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'djangify.up.railway.app',
        pathname: '/media/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },

  // Experimental features
  experimental: {
    typedRoutes: true,
    serverComponentsExternalPackages: [],
    scrollRestoration: true,
  },

  // Build ID generation
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  // API rewrites configuration
  async rewrites() {
    const djangoUrl = process.env.NEXT_PUBLIC_DJANGO_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: `${djangoUrl}/api/:path*`
      }
    ];
  },

  // Security headers
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
    ];
  }
};

export default withBundleAnalyzer(nextConfig);
