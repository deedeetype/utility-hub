import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { POSTS } from '@/lib/posts';

/**
 * Blog structured data — a Blog + ItemList of posts, with BreadcrumbList.
 * Rendered on /blog so Google can build a rich result for the blog index.
 */
export default function BlogJsonLd() {
  const blogData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: `${SITE_NAME} Blog`,
        url: `${SITE_URL}/blog`,
        description:
          'Tips, guides and tutorials on productivity, security and everyday web tools.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: POSTS.map(p => ({
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.description,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
          image: p.image,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: SITE_NAME,
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/blog`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogData) }}
    />
  );
}