import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Percentage Calculator — Calculate Discounts, Tax & Changes',
  'Calculate percentages in three ways: X% of Y, X is what % of Y, and percentage change. Free online percentage calculator.',
  '/tools/percentage-calculator',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Percentage Calculator"
        description="Calculate percentages in three ways: X% of Y, X is what % of Y, and percentage change. Free online percentage calculator."
        path="/tools/percentage-calculator"
      />
      {children}
    </>
  );
}
