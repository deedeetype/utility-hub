import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Random Number Generator — Pick Random Numbers Online Free',
  'Generate random numbers with a custom range, count and no-duplicates option. Perfect for lotteries, raffles and games. Free random number generator online.',
  '/tools/random-number',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Random Number Generator"
        description="Generate random numbers with custom range, count and no-duplicates option."
        path="/tools/random-number"
      />
      {children}
    </>
  );
}
