import { Suspense } from 'react';
import { PageHero } from '@/components/PageParts';
import JobApplicationForm from '@/components/JobApplicationForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Apply For Job | Career Opportunities at BPEL',
  description: 'Submit your formal engineering job application to Basic Power Engineering Ltd. Positions across design, testing, plant manufacturing, and substation commissioning.'
};

export default function JobApplyPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'About', href: '/about/' },
          { label: 'Careers', href: '/careers/' },
          { label: 'Apply Online' }
        ]}
        label="RECRUITMENT APPLICATION"
        title="Submit Your Career Application"
        desc="Join Bangladesh's premier transformer and electrical substation engineering team. Please provide your professional credentials and target facility preferences."
        image="/assets/images/lifecycle/04-manufacturing-fat.jpg"
      />

      <section className="sec" aria-label="Job Application Form">
        <div className="wrap">
          <Suspense fallback={
            <div className="job-app-loading" style={{ padding: '60px 0', textAlign: 'center' }}>
              <p>Loading application form...</p>
            </div>
          }>
            <JobApplicationForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
