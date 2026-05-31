import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Lorem Ipsum Generator — Free Placeholder Text Generator Online',
  'Generate lorem ipsum placeholder text instantly. Choose paragraphs, sentences or words. Start with "Lorem ipsum" or random text. Free and instant.',
  '/tools/lorem-ipsum',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Lorem Ipsum Generator"
        description="Generate placeholder lorem ipsum text instantly — paragraphs, sentences or words."
        path="/tools/lorem-ipsum"
      />
      {children}
    </>
  );
}
