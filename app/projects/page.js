import Projects from '@/components/Projects';
import { PageHero } from '@/components/PageParts';
import styles from './page.module.css';

export const metadata = {
  title: 'Projects',
  description: 'Substation, transformer, switchgear and infrastructure project examples from planning to energisation.'
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Projects' }]}
        label="PROJECT PORTFOLIO"
        title="Engineering Delivered on Site"
        desc="Examples of substation, transformer and switchgear work, from planning and delivery to energisation."
        image="/assets/images/projects/substation-installation.jpg"
      />
      <section id="projects" className={`sec ${styles.projectsSec}`} aria-label="Projects">
        <Projects viewAll={false} isGrid={true} />
      </section>
    </>
  );
}
