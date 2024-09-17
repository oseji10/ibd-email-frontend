/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript type errors during build
  },
  images: { unoptimized: true }, 
  trailingSlash: true, // This adds a trailing slash to every URL
  output: 'export' // This tells Next.js to export as static files
};

module.exports = nextConfig;
