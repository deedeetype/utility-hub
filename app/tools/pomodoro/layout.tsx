import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Pomodoro Timer — Free Online Focus Timer with Breaks',
  'Free online Pomodoro timer. 25-minute focus sessions with 5-minute short breaks and 15-minute long breaks. Audio alerts included. Track your productivity sessions.',
  '/tools/pomodoro',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Pomodoro Timer"
        description="Online Pomodoro timer with 25-min focus, short and long breaks, and audio alerts."
        path="/tools/pomodoro"
      />
      {children}
    </>
  );
}
