import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Case Converter — UPPERCASE, lowercase, camelCase & More',
  'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case and kebab-case. Free online text case converter.',
  '/tools/case-converter',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Case Converter"
        description="Convert text between UPPERCASE, lowercase, camelCase, snake_case and more."
        path="/tools/case-converter"
      />
      {children}
    </>
  );
}
