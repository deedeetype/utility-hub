import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Tip Calculator — Calculate Tip & Split Bill Between Friends',
  'Calculate the tip and split the bill between any number of people. Choose from preset tip percentages or enter a custom amount. See the per-person total instantly.',
  '/tools/tip-calculator',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Tip Calculator"
        description="Calculate tip and split the bill between multiple people instantly."
        path="/tools/tip-calculator"
      />
      {children}
    </>
  );
}
