const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({
        enabled: true,
      })
    : (x) => x;

const backendProxyPath = process.env.NEXT_PUBLIC_BACKEND_PROXY_PATH;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const backendProxyRewrites = backendProxyPath
  ? {
      // Apply reverse proxy after all dynamic routes are checked
      // including `/api/auth/[...nextauth]`
      fallback: [
        {
          source: `${backendProxyPath}/:path*`,
          destination: `${backendUrl}/:path*`,
        },
      ],
    }
  : [];

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  poweredByHeader: false,
  rewrites: async () => backendProxyRewrites,
  transpilePackages: ['api-client'],
  images: {
    remotePatterns: [
      //TODO: Save google account images to S3 to rely only on application bucket hostname
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
});
