import { envUtil } from 'src/utils';

import type { MetadataRoute } from 'next';

const baseUrl = envUtil.getEnv().frontendUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/dummy-data`,
      lastModified: new Date().toISOString(),
    },
  ];
}
