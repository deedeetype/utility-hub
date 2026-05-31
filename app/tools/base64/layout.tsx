import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Base64 Encoder & Decoder — Encode and Decode Online Free',
  'Encode and decode Base64 strings online for free. Runs entirely in your browser — your data never leaves your device. Instant, no signup required.',
  '/tools/base64',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Base64 Encoder / Decoder"
        description="Encode and decode Base64 strings instantly, entirely in your browser."
        path="/tools/base64"
      />
      {children}
    </>
  );
}
