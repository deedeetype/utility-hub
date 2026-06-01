import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Countdown Timer — Count Down to Any Date or Event',
  'Create a countdown to any future date or event. Live days, hours, minutes and seconds display. Perfect for birthdays, holidays and deadlines.',
  '/tools/countdown',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Countdown"
        description="Create a countdown to any future date or event. Live days, hours, minutes and seconds display. Perfect for birthdays, holidays and deadlines."
        path="/tools/countdown"
      />
      {children}
    </>
  );
}
