import { envUtil } from 'src/utils';

const baseUrl = envUtil.getEnv().frontendUrl;

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/profile/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
