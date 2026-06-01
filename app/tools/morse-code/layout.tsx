import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Morse Code Converter — Text to Morse Code & Back',
  'Convert text to Morse code and Morse code to text instantly. Play the audio with real beeps directly in your browser.',
  '/tools/morse-code',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Morse Code"
        description="Convert text to Morse code and Morse code to text instantly. Play the audio with real beeps directly in your browser."
        path="/tools/morse-code"
      />
      {children}
    </>
  );
}
