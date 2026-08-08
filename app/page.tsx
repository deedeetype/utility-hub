import HomeClient from './HomeClient';
import SiteJsonLd from '@/components/SiteJsonLd';

export default function Page() {
  return (
    <>
      <SiteJsonLd />
      <HomeClient />
    </>
  );
}