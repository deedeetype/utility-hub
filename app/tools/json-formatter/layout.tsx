import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'JSON Formatter & Validator — Prettify and Minify JSON Online',
  'Format, validate and minify JSON online for free. Syntax error detection, prettify with 2 or 4 spaces, copy minified JSON. Your data never leaves the browser.',
  '/tools/json-formatter',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="JSON Formatter"
        description="Prettify, validate and minify JSON online. Your data stays in your browser."
        path="/tools/json-formatter"
      />
      {children}
    </>
  );
}
