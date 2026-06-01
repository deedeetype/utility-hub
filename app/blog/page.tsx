
import { POSTS } from '@/lib/posts';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Blog — Free Tools Tips & Guides | ${SITE_NAME}`,
  description: 'Tips, guides and tutorials on productivity, security and everyday web tools. Learn how to get more done online — for free.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description: 'Tips and guides on free online tools for productivity, security and everyday tasks.',
    url: `${SITE_URL}/blog`,
  },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="1001FreeTools" width="28" height="28" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-white text-sm hidden sm:block">1001<span className="text-indigo-400">FreeTools</span></span>
          </a>
          <div className="w-px h-4 bg-slate-700" />
          <span className="text-sm font-medium text-white">Blog</span>
          <div className="flex-1" />
          <a href="/" className="text-sm text-slate-400 hover:text-white transition">← All Tools</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-5">
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Tips, Guides & Tutorials
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Practical guides on productivity, security and the best free tools to simplify your digital life.
          </p>
        </header>

        {/* Post grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map(post => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-slate-800/30 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:bg-slate-800/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width="600"
                  height="300"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/90 text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {post.description}
                </p>
                <div className="mt-4 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Read article →
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
