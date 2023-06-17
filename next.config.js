/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['loremflickr.com', 'picsum.photos'],
    },
    experimental: {
      fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
   },
  };
  
  module.exports = nextConfig;