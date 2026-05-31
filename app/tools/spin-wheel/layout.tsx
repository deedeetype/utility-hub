import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Spin the Wheel — Free Online Random Picker Wheel',
  'Free online spin the wheel random picker. Add your own list of names or options and spin to pick a winner. Perfect for giveaways, classroom activities and decisions.',
  '/tools/spin-wheel',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Spin the Wheel"
        description="Free online spin the wheel random picker. Add any list of options and spin to decide."
        path="/tools/spin-wheel"
      />
      {children}
    </>
  );
}
