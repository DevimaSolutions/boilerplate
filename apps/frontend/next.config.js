const backendProxyPath = process.env.NEXT_PUBLIC_BACKEND_PROXY_PATH;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const backendProxyRewrites = backendProxyPath
  ? [
      {
        source: `${backendProxyPath}/:path*`,
        destination: `${backendUrl}/:path*`,
      },
    ]
  : [];
const backendProxyHeaders = backendProxyPath
  ? [
      {
        source: `${backendProxyPath}/:path*`,
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  : [];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: async () => [...backendProxyRewrites],
  headers: () => [...backendProxyHeaders],
  // TODO
  // transpilePackages: ["api-client"],
};
