import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Color Picker — HEX, RGB, HSL Converter & Shade Palette Generator',
  'Pick any color and instantly get HEX, RGB and HSL values. Generate a full shade palette. Copy any format with one click. Free online color picker.',
  '/tools/color-picker',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Color Picker"
        description="Pick colors and convert between HEX, RGB and HSL. Generate shade palettes."
        path="/tools/color-picker"
      />
      {children}
    </>
  );
}
