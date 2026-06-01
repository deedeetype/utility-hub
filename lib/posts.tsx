export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  imageAlt: string;
  author: string;
  keywords: string[];
}

export const POSTS: PostMeta[] = [
  {
    slug: 'top-free-online-tools-productivity',
    title: '10 Free Online Tools That Will Save You Hours Every Week',
    description: 'Discover the best free online tools for productivity, design, coding and everyday tasks — no registration, no ads, no clutter. All you need, right in your browser.',
    date: '2026-05-28',
    readingTime: '6 min read',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Person working on a laptop with a cup of coffee on a clean desk',
    author: '1001FreeTools',
    keywords: ['free online tools', 'productivity tools', 'best web tools', 'free tools no registration'],
  },
  {
    slug: 'how-to-create-strong-password',
    title: 'How to Create a Strong Password (And Why Most People Get It Wrong)',
    description: 'Learn what makes a password truly secure, the most common mistakes people make, and how to generate strong passwords instantly with our free online tool.',
    date: '2026-05-20',
    readingTime: '5 min read',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Digital security concept with lock and code on dark background',
    author: '1001FreeTools',
    keywords: ['strong password', 'how to create secure password', 'password security', 'free password generator'],
  },
  {
    slug: 'what-is-a-qr-code',
    title: 'What Is a QR Code? How to Create One Free in Seconds',
    description: "Everything you need to know about QR codes — how they work, what they're used for, and how to generate your own free QR code online without any software.",
    date: '2026-05-12',
    readingTime: '5 min read',
    category: 'Guide',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Smartphone scanning a QR code',
    author: '1001FreeTools',
    keywords: ['what is QR code', 'free QR code generator', 'create QR code', 'QR code maker online'],
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return POSTS.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map(p => p.slug);
}
