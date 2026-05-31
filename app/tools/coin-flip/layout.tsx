import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Coin Flipper — Flip a Coin Online — Heads or Tails',
  'Flip a virtual coin online. Get heads or tails with a satisfying animation. Tracks your flip history and statistics. Free online coin flip tool.',
  '/tools/coin-flip',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Coin Flipper"
        description="Flip a virtual coin online. Heads or tails with animation and history tracking."
        path="/tools/coin-flip"
      />
      {children}
    </>
  );
}
