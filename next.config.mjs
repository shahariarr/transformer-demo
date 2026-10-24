/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/products/transformers/:slug/',
        destination: '/products/:slug/'
      },
      {
        source: '/products/transformers/:slug',
        destination: '/products/:slug/'
      }
    ];
  }
};

export default nextConfig;

