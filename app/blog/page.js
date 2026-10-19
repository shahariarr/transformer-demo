import { PageHero } from '@/components/PageParts';
import BlogDirectory from '@/components/BlogDirectory';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Engineering Knowledge & Technical Insights | BPEL Transformer Articles',
  description: 'Technical deep-dives, IEC 60076 standards analysis, substation installation insights, and power engineering articles from Basic Power Engineering Ltd. (BPEL).',
  openGraph: {
    title: 'Engineering Knowledge & Technical Insights | BPEL Blog',
    description: 'Technical deep-dives, IEC 60076 standards analysis, and substation installation insights from BPEL engineers.',
    images: ['/assets/images/about-campus.jpg']
  }
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources', href: '/resources/' }, { label: 'Blog' }]}
        label="Engineering Knowledge & Insights"
        title="Engineering Knowledge, Shared"
        desc="Technical deep-dives, IEC standards analysis, and operational field notes from our high-voltage design and substation commissioning teams."
        image="/assets/images/about-campus.jpg"
      />

      <BlogDirectory posts={posts} />
    </>
  );
}
