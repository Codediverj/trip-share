/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
    images: {
      domains: ['loremflickr.com', 'picsum.photos', 'images.unsplash.com'],
    },
    redirects: async () => [{source: "/", destination: "/home", permanent: true}]
  //   experimental: {
  //     fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
  //  },
  };
  
  module.exports = nextConfig;