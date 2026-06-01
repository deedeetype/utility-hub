import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Text Diff — Compare Two Texts and Highlight Differences',
  'Compare two texts side by side with line-by-line diff. Additions highlighted in green, deletions in red. No data leaves your browser.',
  '/tools/text-diff',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Text Diff"
        description="Compare two texts side by side with line-by-line diff. Additions highlighted in green, deletions in red. No data leaves your browser."
        path="/tools/text-diff"
      />
      {children}
    </>
  );
}
