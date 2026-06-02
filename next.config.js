/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: false },
  turbopack: {
    root: __dirname,
  },
};
module.exports = nextConfig;
