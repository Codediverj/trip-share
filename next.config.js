/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
    images: {
      domains: ['loremflickr.com', 'picsum.photos', 'images.unsplash.com', 'visionz-upload-07e1217f1104513b7d9dc240b45787b20a9aeadd.s3.us-west-2.amazonaws.com'],
    },
    redirects: async () => [{source: "/", destination: "/home", permanent: true}]
  //   experimental: {
  //     fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
  //  },
  };
  
  module.exports = nextConfig;