import { SITE_URL, SITE_NAME } from '@/lib/seo';

interface Crumb {
  name: string;
  path: string;
}

interface Props {
  items: Crumb[];
}

/**
 * BreadcrumbList structured data — lets Google show breadcrumb trails in SERPs.
 */
export default function BreadcrumbJsonLd({ items }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      ...items.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}