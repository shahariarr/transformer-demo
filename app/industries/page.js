import Industries from '@/components/Industries';
import { PageHero } from '@/components/PageParts';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Industries',
  description: 'Transformers, substations and switchgear for utilities, industry, commercial buildings, healthcare, water, transport and renewable energy.'
};

const ServiceIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Industries' }]} label="INDUSTRIES WE SERVE" title="Power for the Sectors That Keep Things Running"
        desc="Each sector puts different demands on its electrical equipment. We design around them."
        image="/assets/images/industries-bg.jpg">
        <a className="btn btn--primary" href="/contact/">Discuss Your Sector</a>
      </PageHero>

      <section id="industries" className="sec" style={{ background: '#fff' }} aria-label="Industries">
        <Industries viewAll={false} />

        <div className="wrap">
          <div className="faq__footer-help fade-in-up" data-delay="160" style={{ marginTop: '4rem' }}>
            <div className="faq-help__main">
              <span className="faq-help__eyebrow">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Engineering Support
              </span>
              <h4>Still have questions about your project requirements?</h4>
              <p>Our power engineering team can provide application sizing, single-line diagram (SLD) reviews, and turnkey sector feasibility studies.</p>
              <ul className="faq-help__services">
                <li>
                  <ServiceIcon>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </ServiceIcon>
                  <span>Sector Sizing & Duty Cycle</span>
                </li>
                <li>
                  <ServiceIcon>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </ServiceIcon>
                  <span>Single-Line Diagram (SLD)</span>
                </li>
                <li>
                  <ServiceIcon>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </ServiceIcon>
                  <span>Grid Compliance & FAT</span>
                </li>
              </ul>
            </div>
            <div className="faq-help__aside">
              <p className="faq-help__aside-title">Talk to our engineers</p>
              <p className="faq-help__aside-text">Share your requirement and get a clear technical answer.</p>
              <a href="/contact/" className="faq-help__btn faq-help__btn--primary">
                <span>Ask an Engineer</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="faq-help__btn faq-help__btn--wa">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d={WA_PATH} />
                </svg>
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
