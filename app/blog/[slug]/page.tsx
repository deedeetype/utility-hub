import React from 'react';
import { notFound } from 'next/navigation';
import { getPost, getAllSlugs, POSTS } from '@/lib/posts';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import ContentTools from '../content/top-free-online-tools-productivity';
import ContentPassword from '../content/how-to-create-strong-password';
import ContentQr from '../content/what-is-a-qr-code';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

const CONTENT_MAP: Record<string, () => React.ReactElement> = {
  'top-free-online-tools-productivity': ContentTools,
  'how-to-create-strong-password':      ContentPassword,
  'what-is-a-qr-code':                  ContentQr,
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Content = CONTENT_MAP[slug];
  if (!Content) notFound();

  const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    keywords: post.keywords.join(', '),
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <BreadcrumbJsonLd items={[{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]} />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="1001FreeTools" width="28" height="28" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-white text-sm hidden sm:block">1001<span className="text-indigo-400">FreeTools</span></span>
          </a>
          <div className="w-px h-4 bg-slate-700" />
          <a href="/blog" className="text-sm text-slate-400 hover:text-white transition">Blog</a>
          <div className="flex-1" />
          <a href="/" className="text-sm text-slate-400 hover:text-white transition hidden sm:block">← All Tools</a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
          <a href="/blog" className="hover:text-indigo-400 transition">Blog</a>
          <span>/</span>
          <span className="text-indigo-400">{post.category}</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
          <span>·</span>
          <span>By {post.author}</span>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden border border-slate-700/50 mb-10">
          <img
            src={post.image}
            alt={post.imageAlt}
            width="800"
            height="450"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Article content */}
        <Content />

        {/* CTA */}
        <div className="mt-14 p-8 rounded-2xl bg-indigo-600/5 border border-indigo-500/15 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Try our free tools</h2>
          <p className="text-slate-400 text-sm mb-5">32+ free tools. No signup. No ads.</p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-indigo-500/20 text-sm">
            Browse all tools →
          </a>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-bold text-white mb-5">More from the blog</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map(r => (
                <a key={r.slug} href={`/blog/${r.slug}`}
                  className="flex gap-4 p-4 bg-slate-800/30 border border-slate-700/40 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-800/50 transition-all group">
                  <img src={r.image} alt={r.imageAlt} width="80" height="80" loading="lazy"
                    className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 mb-1">{r.category} · {r.readingTime}</div>
                    <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug">{r.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
