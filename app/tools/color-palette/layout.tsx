import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Color Palette Generator — Create Harmonious Color Palettes',
  'Generate complementary, analogous, triadic, tetradic and monochromatic color palettes from any base color. Copy colors and CSS variables.',
  '/tools/color-palette',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Color Palette"
        description="Generate complementary, analogous, triadic, tetradic and monochromatic color palettes from any base color. Copy colors and CSS variables."
        path="/tools/color-palette"
      />
      {children}
    </>
  );
}
