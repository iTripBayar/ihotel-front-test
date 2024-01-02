/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["ahooks"],
  compress: true,
  reactStrictMode: false,
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sandbox.api.myhotel.mn",
      },
      {
        protocol: "https",
        hostname: "ihotel.mn",
      },
    ],
    domains: [
      "myhotel-images.s3.ap-east-1.amazonaws.com",
      "pms-images.s3.ap-southeast-1.amazonaws.com",
      "sandbox.api.myhotel.mn",
      "localhost",
      "api.myhotel.mn",
      "ihotel.mn",
    ],
    // These are the default device/image sizes provided by Next.js.  Leaving them here for easier experimentation.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 100,
    disableStaticImages: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    WEB_URL: process.env.WEB_URL,
    IMAGE_URL: process.env.IMAGE_URL,
    TEMPORARY_URL: process.env.TEMPORARY_URL,
    TEMPORARY_URL1: process.env.TEMPORARY_URL1,
    NEXT_PUBLIC_GOLOMT_URL: process.env.NEXT_PUBLIC_GOLOMT_URL,
    NEXT_PUBLIC_GOLOMT_KEY_NUMBER: process.env.NEXT_PUBLIC_GOLOMT_KEY_NUMBER,
  },
};
