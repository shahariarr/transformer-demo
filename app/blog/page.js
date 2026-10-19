import BlogDirectory from '@/components/BlogDirectory';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog & Insights | IEC 60076 & High-Voltage Transformer Articles | BPEL',
  description: 'Technical deep-dives, IEC 60076 standards analysis, substation installation insights, and power engineering articles from Basic Power Engineering Ltd. (BPEL).',
  openGraph: {
    title: 'Blog & Insights | BPEL Engineering Articles',
    description: 'Technical deep-dives, IEC 60076 standards analysis, and substation installation insights from BPEL engineers.',
    images: ['/assets/images/about-campus.jpg']
  }
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogDirectory posts={posts} />;
}
