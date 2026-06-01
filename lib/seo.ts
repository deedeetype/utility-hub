import type { Metadata } from 'next';

export const SITE_URL = 'https://www.1001freetools.com';
export const SITE_NAME = '1001FreeTools';

export function toolMeta(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@1001webtools',
    },
  };
}
