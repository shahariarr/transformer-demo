import { PageHero } from '@/components/PageParts';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <PageHero crumbs={[{ label: 'Not found' }]} label="404" title="Page Not Found"
      desc="The page you are looking for has moved or does not exist.">
      <a className="btn btn--primary" href="/">Back to Home</a>
      <a className="btn btn--ghost" href="/sitemap/">View Sitemap</a>
    </PageHero>
  );
}
