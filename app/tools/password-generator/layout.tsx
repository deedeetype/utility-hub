import { toolMeta } from '@/lib/seo';
import ToolJsonLd from '@/components/ToolJsonLd';

export const metadata = toolMeta(
  'Password Generator — Create Strong Passwords Online Free',
  'Generate strong, secure passwords instantly. Custom length, uppercase, lowercase, numbers and symbols. 100% local — nothing is ever sent anywhere.',
  '/tools/password-generator',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd
        name="Password Generator"
        description="Generate strong, secure passwords instantly. Custom length, uppercase, lowercase, numbers and symbols. 100% local — nothing is ever sent anywhere."
        path="/tools/password-generator"
      />
      {children}
    </>
  );
}
