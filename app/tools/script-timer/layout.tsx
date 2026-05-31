import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Script Timer — Calibrate Your Speech for TikTok, Reels & Shorts',
  'Free online script timer. Paste your script, choose your speaking speed and get the exact duration for TikTok, Instagram Reels and YouTube Shorts. No signup required.',
  '/tools/script-timer',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Script Timer"
        description="Calibrate your speech duration for TikTok, Reels and YouTube Shorts."
        path="/tools/script-timer"
      />
      {children}
    </>
  );
}
