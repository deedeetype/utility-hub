import { SITE_URL, SITE_NAME, SITE_EMAIL } from '@/lib/seo';
import { TOOLS } from '@/lib/tools';

/**
 * Organization + WebSite structured data for the homepage.
 * Gives Google a clear entity to build a rich result / knowledge panel from.
 */
export default function SiteJsonLd() {
  const liveTools = TOOLS.filter(t => t.status === 'live');

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: SITE_EMAIL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          width: 1024,
          height: 1024,
        },
        sameAs: ['https://github.com/deedeetype'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          '32+ free online tools for creators, developers and makers. No ads, no registration.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#tools-list`,
        name: `${SITE_NAME} — All Tools`,
        itemListElement: liveTools.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.name,
          url: `${SITE_URL}/tools/${t.slug}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}