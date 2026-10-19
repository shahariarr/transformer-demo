import ETSAboutPage from '@/components/ETSAboutPage';

export const metadata = {
  title: 'About Emirates Transformer & Switchgear | Dubai Since 1987',
  description: 'Emirates Transformer & Switchgear (ETS) — Dubai\'s most experienced transformer manufacturer. Founded 1987, four manufacturing facilities across the UAE and Europe, DEWA, ADNOC and ARAMCO approved.',
  openGraph: {
    title: 'About Emirates Transformer & Switchgear | Dubai Since 1987',
    description: 'Emirates Transformer & Switchgear (ETS) — Dubai\'s most experienced transformer manufacturer. Founded 1987, four manufacturing facilities across the UAE and Europe, DEWA, ADNOC and ARAMCO approved.',
    images: ['/assets/images/about-campus.jpg']
  }
};

export default function Page() {
  return <ETSAboutPage />;
}
