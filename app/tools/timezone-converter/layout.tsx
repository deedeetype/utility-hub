import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Timezone Converter — Convert Time Between World Timezones',
  'Convert any date and time between world timezones instantly. Add multiple target timezones. Uses your local timezone by default.',
  '/tools/timezone-converter',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Timezone Converter"
        description="Convert any date and time between world timezones instantly. Add multiple target timezones. Uses your local timezone by default."
        path="/tools/timezone-converter"
      />
      {children}
    </>
  );
}
