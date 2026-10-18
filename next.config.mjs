/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `npm run build` writes a plain HTML/CSS/JS site to out/
  output: 'export',
  // /about/ -> out/about/index.html, so pages work on any static host
  trailingSlash: true
};

export default nextConfig;
