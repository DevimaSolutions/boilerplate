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
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  rewrites: async () => backendProxyRewrites,
  // transpilePackages: ['api-client'],
};
