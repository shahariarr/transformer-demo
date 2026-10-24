import Products from '@/components/Products';
import { PageHero } from '@/components/PageParts';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Products',
  description: 'Oil-immersed power and distribution transformers from 4,000 to 16,000 kVA, built for utility and industrial networks.'
};

const ServiceIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export default function ProductsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Products' }]} label="OUR PRODUCTS" title="Transformers Engineered for Critical Power"
        desc="Oil-immersed power and distribution transformers designed, built and tested in-house, from 4,000 to 16,000 kVA."
        image="/assets/images/factory-bg.png">
        <a className="btn btn--primary" href="/contact/">Request a Quote</a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      <section className="sec sec--alt" aria-label="Product range">
        <Products viewAll={false} />

        <div className="wrap">
          <div className="faq__footer-help fade-in-up" data-delay="160" style={{ marginTop: '4rem' }}>
            <div className="faq-help__main">
              <span className="faq-help__eyebrow">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Engineering Support
              </span>
              <h4>Still have questions about your project requirements?</h4>
              <p>Our power engineering team can assist with custom kVA sizing, Guaranteed Technical Particulars (GTP), and tailored manufacturing specifications.</p>
              <ul className="faq-help__services">
                <li>
                  <ServiceIcon>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </ServiceIcon>
                  <span>Custom kVA & Voltage</span>
                </li>
                <li>
                  <ServiceIcon>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </ServiceIcon>
                  <span>Technical Datasheets (GTP)</span>
                </li>
                <li>
                  <ServiceIcon>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </ServiceIcon>
                  <span>Factory Testing & Lead Times</span>
                </li>
              </ul>
            </div>
            <div className="faq-help__aside">
              <p className="faq-help__aside-title">Talk to our engineers</p>
              <p className="faq-help__aside-text">Share your requirement and get a clear technical answer.</p>
              <div className="faq-help__actions">
                <a
                  href="/contact/"
                  className="btn btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span>Ask an Engineer</span>
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--wa facility-wa-btn"
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d={WA_PATH} />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
