import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'URL Encoder & Decoder — Encode and Decode URLs Online',
  'Encode and decode URLs and query strings instantly. Handles special characters, spaces and percent-encoding. Free online URL encoder.',
  '/tools/url-encoder',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Url Encoder"
        description="Encode and decode URLs and query strings instantly. Handles special characters, spaces and percent-encoding. Free online URL encoder."
        path="/tools/url-encoder"
      />
      {children}
    </>
  );
}
