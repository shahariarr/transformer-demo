import { PageHero } from '@/components/PageParts';
import { DATA } from '@/lib/data';
import { SERVICES } from '@/lib/services';

export const metadata = { title: 'Sitemap' };

const GROUPS = [
  ['Company', [['/', 'Home'], ['/about/', 'About Us'], ['/engineering/', 'Engineering & Manufacturing'], ['/certifications/', 'Certifications'], ['/careers/', 'Careers'], ['/contact/', 'Contact']]],
  ['Products', [['/products/', 'All Products'], ...DATA.products.map(p => [`/products/${p.slug}/`, p.name])]],
  ['Services', [['/services/', 'All Services'], ...SERVICES.map(s => [`/services/${s.slug}/`, s.title])]],
  ['Industries', [['/industries/', 'All Industries'], ...DATA.industries.map(i => [`/industries/${i.slug}/`, i.name])]],
  ['Projects', [['/projects/', 'All Projects'], ...DATA.projects.map(p => [`/projects/${p.slug}/`, p.title])]],
  ['Resources', [['/resources/', 'Resources'], ['/resources/sizing-guide/', 'Sizing Guide'], ['/resources/faq/', 'FAQ'], ['/resources/glossary/', 'Glossary'], ['/resources/standards/', 'Standards'], ['/privacy/', 'Privacy Policy'], ['/terms/', 'Terms of Use']]]
];

export default function SitemapPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Sitemap' }]} label="SITEMAP" title="All Pages" />
      <section className="sec" aria-label="Sitemap">
        <div className="wrap sitemap-cols">
          {GROUPS.map(([h, links]) => (
            <div key={h}>
              <h2>{h}</h2>
              <ul>{links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
