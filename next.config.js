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
