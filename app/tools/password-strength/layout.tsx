import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Password Strength Checker — Test Your Password Security',
  'Check how strong your password is with a detailed security checklist. Runs entirely in your browser — your password is never transmitted.',
  '/tools/password-strength',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Password Strength"
        description="Check how strong your password is with a detailed security checklist. Runs entirely in your browser — your password is never transmitted."
        path="/tools/password-strength"
      />
      {children}
    </>
  );
}
