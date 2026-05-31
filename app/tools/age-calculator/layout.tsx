import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Age Calculator — Calculate Your Exact Age in Years, Months & Days',
  'Calculate your exact age from your date of birth. Get years, months, days, total weeks and hours. Find out how many days until your next birthday. Free age calculator.',
  '/tools/age-calculator',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Age Calculator"
        description="Calculate your exact age in years, months and days. Find your next birthday countdown."
        path="/tools/age-calculator"
      />
      {children}
    </>
  );
}
