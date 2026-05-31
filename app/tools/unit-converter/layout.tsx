import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Unit Converter — Length, Weight, Temperature, Volume & Area',
  'Convert between metric and imperial units instantly. Length (km, miles), weight (kg, lbs), temperature (°C, °F, K), volume (liters, gallons) and area. Free online unit converter.',
  '/tools/unit-converter',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Unit Converter"
        description="Convert length, weight, temperature, volume and area between metric and imperial units."
        path="/tools/unit-converter"
      />
      {children}
    </>
  );
}
