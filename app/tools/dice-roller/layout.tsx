import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Dice Roller — Roll D4, D6, D8, D10, D12, D20 Online Free',
  'Roll any dice online — D4, D6, D8, D10, D12, D20 and D100. Roll multiple dice at once and get the total. Free online dice roller for RPG, DnD and board games.',
  '/tools/dice-roller',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Dice Roller"
        description="Roll D4, D6, D8, D10, D12, D20 and D100 online. Free virtual dice for RPG and board games."
        path="/tools/dice-roller"
      />
      {children}
    </>
  );
}
