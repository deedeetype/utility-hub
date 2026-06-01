import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Loan Calculator — Monthly Payments & Total Interest',
  'Calculate monthly loan or mortgage payments, total interest and total cost. Enter amount, rate and term for instant results.',
  '/tools/loan-calculator',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Loan Calculator"
        description="Calculate monthly loan or mortgage payments, total interest and total cost. Enter amount, rate and term for instant results."
        path="/tools/loan-calculator"
      />
      {children}
    </>
  );
}
