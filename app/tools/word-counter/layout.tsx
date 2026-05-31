import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Word Counter — Count Words, Characters & Reading Time Free',
  'Free online word counter. Instantly count words, characters, sentences, paragraphs and reading time. No ads, no signup. Works in your browser.',
  '/tools/word-counter',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Word Counter"
        description="Count words, characters, sentences and reading time instantly."
        path="/tools/word-counter"
      />
      {children}
    </>
  );
}
