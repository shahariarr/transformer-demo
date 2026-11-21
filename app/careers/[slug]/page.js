import { notFound } from 'next/navigation';
import { VACANCIES, getVacancyBySlug } from '@/lib/careers';
import JobDetailView from '@/components/JobDetailView';

export function generateStaticParams() {
  return VACANCIES.map((job) => ({
    slug: job.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = getVacancyBySlug(slug);

  if (!job) {
    return {
      title: 'Position Not Found | Careers | Basic Power Engineering Ltd.',
      description: 'The requested engineering vacancy could not be found.'
    };
  }

  return {
    title: `${job.title} | Careers at BPEL`,
    description: job.summary,
    openGraph: {
      title: `${job.title} | Careers at Basic Power Engineering Ltd.`,
      description: job.summary,
      images: [
        {
          url: job.image || '/assets/images/lifecycle/04-manufacturing-fat.jpg',
          width: 1200,
          height: 630,
          alt: job.title
        }
      ]
    }
  };
}

export default async function SingleJobPage({ params }) {
  const { slug } = await params;
  const job = getVacancyBySlug(slug);

  if (!job) {
    notFound();
  }

  // Pick up to 3 related jobs from other vacancies
  const relatedJobs = VACANCIES.filter((v) => v.slug !== job.slug).slice(0, 3);

  return <JobDetailView job={job} relatedJobs={relatedJobs} />;
}
