import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'CSS Gradient Generator — Create Linear, Radial & Conic Gradients',
  'Build beautiful CSS gradients visually. Linear, radial and conic gradients with live preview, custom color stops and preset angles. Copy CSS code instantly.',
  '/tools/css-gradient',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="CSS Gradient Generator"
        description="Create linear, radial and conic CSS gradients visually. Copy the CSS code instantly."
        path="/tools/css-gradient"
      />
      {children}
    </>
  );
}
