import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Regex Tester — Test Regular Expressions Online with Live Highlighting',
  'Test and debug regular expressions online with live match highlighting and detailed match info. Supports g, i, m, s flags. Free online regex tester.',
  '/tools/regex-tester',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Regex Tester"
        description="Test regular expressions with live match highlighting. Free online regex debugger."
        path="/tools/regex-tester"
      />
      {children}
    </>
  );
}
