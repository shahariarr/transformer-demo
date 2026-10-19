import { PageHero, LinkCard, Icon } from '@/components/PageParts';

export const metadata = {
  title: 'Resources',
  description: 'Transformer sizing guide, technical FAQ, glossary, standards and project references.'
};

const ITEMS = [
  { href: '/blog/', title: 'Engineering Blog & Insights', text: 'Technical deep-dives, IEC 60076 standards, and operational field notes.', icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>' },
  { href: '/resources/sizing-guide/', title: 'Sizing Guide', text: 'Estimate the kVA rating you need from your load, with standard ratings.', icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/><line x1="16" y1="15" x2="16" y2="18"/>' },
  { href: '/resources/faq/', title: 'Technical FAQ', text: 'Answers about products, quotations, engineering and commissioning.', icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>' },
  { href: '/resources/glossary/', title: 'Glossary', text: 'Plain-language definitions of common transformer terms.', icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
  { href: '/resources/standards/', title: 'Standards', text: 'The IEC, IEEE and ISO standards our equipment and systems follow.', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
  { href: '/certifications/', title: 'Certifications', text: 'Certificates and laboratory test reports to inspect.', icon: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>' },
  { href: '/projects/', title: 'Project Showcase', text: 'Examples of substation, transformer and switchgear projects.', icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' }
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources' }]} label="RESOURCES" title="Technical Resources"
        desc="Tools and references to help you specify, size and compare transformers." />
      <section className="sec" aria-label="Resources">
        <div className="wrap">
          <div className="lgrid">
            {ITEMS.map((it, i) => <LinkCard key={it.href} href={it.href} icon={<Icon d={it.icon} />} title={it.title} text={it.text} more="Open" delay={(i % 3) * 80} />)}
          </div>
        </div>
      </section>
    </>
  );
}
