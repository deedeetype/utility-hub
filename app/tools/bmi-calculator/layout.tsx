import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'BMI Calculator — Calculate Body Mass Index Online Free',
  'Calculate your Body Mass Index (BMI) in metric or imperial units. Visual gauge with weight category interpretation. Free online BMI calculator — no signup required.',
  '/tools/bmi-calculator',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="BMI Calculator"
        description="Calculate Body Mass Index in metric or imperial units with visual category gauge."
        path="/tools/bmi-calculator"
      />
      {children}
    </>
  );
}
