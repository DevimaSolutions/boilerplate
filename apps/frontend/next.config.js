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

const getCdnImagePattern = () => {
  try {
    const url = new URL(process.env.CDN_BASE_URL);
    return [
      {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port,
        pathname: `${url.pathname}/**`,
      },
    ];
  } catch {
    return [];
  }
};

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  poweredByHeader: false,
  rewrites: async () => backendProxyRewrites,
  transpilePackages: ['api-client'],
  images: {
    remotePatterns: [
      ...getCdnImagePattern(),
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      //for dummy data generated avatar usage
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname: '/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/**',
      },
    ],
  },
});
