/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/safevault", // Use your GitHub repo name if deploying to GitHub Pages
}

module.exports = nextConfig;
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});
module.exports = withPWA({
  reactStrictMode: true,
});
// next.config.js
module.exports = {
  env: {
    CUSTOM_BACKEND_SECRET: process.env.CUSTOM_BACKEND_SECRET,
  },
};
