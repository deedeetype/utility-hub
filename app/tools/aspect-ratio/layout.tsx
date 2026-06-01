import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Aspect Ratio Calculator — Calculate Dimensions for Any Ratio',
  'Calculate width and height for any aspect ratio. Includes common presets (16:9, 4:3, 1:1, 9:16) and social media size reference.',
  '/tools/aspect-ratio',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Aspect Ratio"
        description="Calculate width and height for any aspect ratio. Includes common presets (16:9, 4:3, 1:1, 9:16) and social media size reference."
        path="/tools/aspect-ratio"
      />
      {children}
    </>
  );
}
