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
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'djangifybackend.up.railway.app',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'djangify.up.railway.app',
        pathname: '/media/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['res.cloudinary.com'],
    formats: ['image/webp'],
    unoptimized: process.env.NODE_ENV === 'production',
  },

  // Experimental features
  experimental: {
    typedRoutes: true,
    serverComponentsExternalPackages: [],
    scrollRestoration: true,
  },

  // Font configuration (serve fonts from the public folder)
  async rewrites() {
    return [
      {
        source: '/fonts/:path*',
        destination: '/public/fonts/:path*', // Adjust path as needed
      },
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_DJANGO_URL || 'http://localhost:8000'}/api/:path*`,
      },
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
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
