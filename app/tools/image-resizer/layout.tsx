import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Image Resizer — Resize & Compress Images Online Free (No Upload)',
  'Resize and compress images directly in your browser. No file uploads, no servers, complete privacy. Supports JPG, PNG and WebP. Free online image resizer.',
  '/tools/image-resizer',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Image Resizer"
        description="Resize and compress images in your browser. No uploads needed — complete privacy."
        path="/tools/image-resizer"
      />
      {children}
    </>
  );
}
