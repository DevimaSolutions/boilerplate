const backendProxyPath = process.env.BACKEND_PROXY_PATH;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const backendProxyRewrites = backendProxyPath
  ? [
      {
        source: `${backendProxyPath}/:path*`,
        destination: `${backendUrl}/:path*`,
      },
    ]
  : [];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [...backendProxyRewrites];
  },
  // TODO
  // transpilePackages: ["api-client"],
};
