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
      },
      {
        source: '/:slug-product/',
        destination: '/products/:slug-product/'
      },
      {
        source: '/:slug-product',
        destination: '/products/:slug-product/'
      }
    ];
  }
};

export default nextConfig;

