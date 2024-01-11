import { envUtil } from 'src/utils';

import type { MetadataRoute } from 'next';

const baseUrl = envUtil.getEnv().frontendUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const routesMap = ['/', '/dummy-data'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return routesMap;
}
