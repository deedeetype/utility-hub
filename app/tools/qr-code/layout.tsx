import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'QR Code Generator — Create Free QR Codes Online Instantly',
  'Generate QR codes for any URL, text, email, phone number or WiFi network. Custom colors and sizes. Download as PNG. Free, instant and runs in your browser.',
  '/tools/qr-code',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="QR Code Generator"
        description="Generate free QR codes for URLs, text, email, phone and WiFi. Download as PNG."
        path="/tools/qr-code"
      />
      {children}
    </>
  );
}
