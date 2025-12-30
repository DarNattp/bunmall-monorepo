/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:3001/:path*',
      },
      {
        source: '/api/products',
        destination: 'http://localhost:3002/products',
      },
      {
        source: '/api/products/:path*',
        destination: 'http://localhost:3002/products/:path*',
      },
      {
        source: '/api/orders',
        destination: 'http://localhost:3003/orders',
      },
      {
        source: '/api/orders/:path*',
        destination: 'http://localhost:3003/orders/:path*',
      },
    ];
  },
};

export default nextConfig;
