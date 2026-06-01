import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Calorie Calculator — Find Your Daily Calorie Needs (TDEE)',
  'Calculate your daily calorie needs (TDEE) using the Mifflin-St Jeor formula. Includes goals for weight loss, maintenance and gain.',
  '/tools/calorie-calculator',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Calorie Calculator"
        description="Calculate your daily calorie needs (TDEE) using the Mifflin-St Jeor formula. Includes goals for weight loss, maintenance and gain."
        path="/tools/calorie-calculator"
      />
      {children}
    </>
  );
}
