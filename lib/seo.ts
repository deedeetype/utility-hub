import type { Metadata } from 'next';

// IMPORTANT: This must match the canonical/primary host that actually serves
// the site (the origin Googlebot lands on after any redirects). The live site
// serves at the non-www host (www 301-redirects here), so the canonical must
// be non-www to avoid a canonical->redirect loop that suppresses indexing.
export const SITE_URL = 'https://1001freetools.com';
export const SITE_NAME = '1001FreeTools';
export const SITE_TWITTER = '@1001freetools';
export const SITE_EMAIL = 'info@1001freetools.com';

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
      site: SITE_TWITTER,
    },
  };
}
