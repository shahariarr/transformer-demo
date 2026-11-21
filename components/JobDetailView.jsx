'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JobCard, {
  BriefcaseIcon,
  PinIcon,
  CashIcon,
  CalendarIcon
} from './JobCard';
import styles from '@/app/careers/[slug]/page.module.css';

// Hourglass icon for expiration date
const HourglassIcon = ({ width = 20, height = 20 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </svg>
);

// User icon for experience
const UserIcon = ({ width = 20, height = 20 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Gender / Team icon
const GenderIcon = ({ width = 20, height = 20 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Qualification / Grad icon
const GradCapIcon = ({ width = 20, height = 20 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// Career Level / Award badge icon
const CareerLevelIcon = ({ width = 20, height = 20 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

// Close (X) icon for modal
const CloseIcon = ({ width = 18, height = 18 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Google Map Embed URLs for BPEL strategic facilities
const MAP_EMBEDS = {
  dhaka: 'https://www.google.com/maps?q=Gulshan-1+Dhaka+Bangladesh&output=embed',
  gazipur: 'https://www.google.com/maps?q=Gazipur+Bangladesh&output=embed',
  chittagong: 'https://www.google.com/maps?q=Agrabad+Chittagong+Bangladesh&output=embed'
};

function getMapEmbedUrl(job) {
  if (job?.locationCode && MAP_EMBEDS[job.locationCode]) {
    return MAP_EMBEDS[job.locationCode];
  }
  const loc = (job?.location || '').toLowerCase();
  if (loc.includes('gazipur')) return MAP_EMBEDS.gazipur;
  if (loc.includes('chittagong') || loc.includes('chattogram')) return MAP_EMBEDS.chittagong;
  return MAP_EMBEDS.dhaka;
}

export default function JobDetailView({ job, relatedJobs = [] }) {
  const [showMapModal, setShowMapModal] = useState(false);
  const mapEmbedUrl = getMapEmbedUrl(job);

  // Close map modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showMapModal) {
        setShowMapModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMapModal]);

  return (
    <div className={styles.singleJobSection}>
      <div className="wrap">
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.crumbSep}>/</span>
          <Link href="/careers/">Careers</Link>
          <span className={styles.crumbSep}>/</span>
          <span className={styles.crumbActive}>{job.title}</span>
        </nav>

        {/* 1. TOP HERO CARD */}
        <div className={styles.heroCard}>
          <div className={styles.heroLeft}>
            {/* Logo Square */}
            <div
              className={styles.heroLogo}
              style={{ backgroundColor: job.logoBg || '#006db8' }}
              aria-hidden="true"
            >
              <span>{job.logoLetter || job.title.charAt(0)}</span>
            </div>

            {/* Title & Meta Details */}
            <div className={styles.heroInfo}>
              <div className={styles.heroTitleRow}>
                <h1 className={styles.heroTitle}>{job.title}</h1>
                <span className={styles.verifiedCheck} title="Verified Active Opportunity">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="#10b981" />
                    <path d="m8.5 12 2.5 2.5 5-5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              {/* Meta Row: Dept, Location, Date Posted, Salary */}
              <div className={styles.heroMetaRow}>
                <div className={styles.heroMetaItem} title="Department">
                  <BriefcaseIcon />
                  <span>{job.dept}</span>
                </div>
                <div className={styles.heroMetaItem} title="Location">
                  <PinIcon />
                  <span>{job.location}</span>
                </div>
                <div className={styles.heroMetaItem} title="Date Posted">
                  <CalendarIcon />
                  <span>{job.postedDate}</span>
                </div>
                <div className={styles.heroMetaItem} title="Compensation">
                  <CashIcon />
                  <span>{job.salary}</span>
                </div>
              </div>

              {/* Badges Row */}
              <div className={styles.heroTagsRow}>
                <span className={styles.pillBlue}>Full Time</span>
                {job.badge && (
                  <span className={styles.pillAmber}>{job.badge}</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Section */}
          <div className={styles.heroRight}>
            <div className={styles.heroDeadline}>
              Application ends: <span className={styles.deadlineHighlight}>{job.deadline}</span>
            </div>
            <div className={styles.heroBtnGroup}>
              <Link
                href={`/careers/apply?job=${job.slug}`}
                className={styles.applyBtn}
              >
                <span>Apply Now</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. TWO-COLUMN LAYOUT */}
        <div className={styles.jobMainLayout}>
          {/* Left Column (Main Details & Related Jobs) */}
          <div className={styles.leftColumn}>
            {/* Job Description Block */}
            <section className={styles.contentBlock} aria-labelledby="heading-job-desc">
              <h2 id="heading-job-desc" className={styles.blockTitle}>Job Description</h2>
              <p className={styles.descriptionText}>{job.summary}</p>
              <p className={styles.descriptionText}>
                As part of Basic Power Engineering Ltd. (BPEL), you will collaborate directly with seasoned high-voltage electrical engineers, utility inspection consultants (DESCO, BREB, DPDC, PGCB), and advanced manufacturing teams to design and build durable, high-efficiency power infrastructure that energizes industries across Bangladesh.
              </p>
            </section>

            {/* Key Responsibilities Block */}
            <section className={styles.contentBlock} aria-labelledby="heading-responsibilities">
              <h2 id="heading-responsibilities" className={styles.blockTitle}>Key Responsibilities</h2>
              <ul className={styles.bulletList}>
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className={styles.bulletItem}>
                    {resp}
                  </li>
                ))}
              </ul>
            </section>

            {/* Skill & Experience Block */}
            <section className={styles.contentBlock} aria-labelledby="heading-skills-exp">
              <h2 id="heading-skills-exp" className={styles.blockTitle}>Skill &amp; Experience</h2>
              <ul className={styles.bulletList}>
                {job.requirements.map((req, idx) => (
                  <li key={idx} className={styles.bulletItem}>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Related Jobs Section */}
            {relatedJobs.length > 0 && (
              <section className={styles.contentBlock} aria-labelledby="heading-related-jobs">
                <div className={styles.relatedJobsHeader}>
                  <h2 id="heading-related-jobs" className={styles.relatedJobsTitle}>Related Jobs</h2>
                </div>
                <div className={styles.relatedCardsList}>
                  {relatedJobs.map((relJob) => (
                    <JobCard key={relJob.slug} job={relJob} />
                  ))}
                </div>
              </section>
            )}

            {/* Bottom Call-To-Action Banner */}
            <div className={styles.bottomApplyCta}>
              <div className={styles.bottomApplyCopy}>
                <h3 className={styles.bottomApplyTitle}>Interested in this Opportunity?</h3>
                <p className={styles.bottomApplyDesc}>
                  Submit your formal application and CV directly to the BPEL technical recruitment team.
                </p>
              </div>
              <Link
                href={`/careers/apply?job=${job.slug}`}
                className={styles.applyBtn}
              >
                <span>Apply for this Position</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column (Sidebar Cards) */}
          <aside className={styles.rightSidebar} aria-label="Job Overview and Details">
            {/* Card 1: Job Overview */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Job Overview</h3>
              <div className={styles.overviewList}>
                {/* 1. Date Posted */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <CalendarIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Date Posted</span>
                    <span className={styles.overviewValue}>{job.postedDate}</span>
                  </div>
                </div>

                {/* 2. Location */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <PinIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Location</span>
                    <span className={styles.overviewValue}>{job.location}</span>
                  </div>
                </div>

                {/* 3. Offered Salary */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <CashIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Offered Salary:</span>
                    <span className={styles.overviewValue}>{job.salary}</span>
                  </div>
                </div>

                {/* 4. Expiration date */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <HourglassIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Expiration date</span>
                    <span className={styles.overviewValue}>{job.deadline}</span>
                  </div>
                </div>

                {/* 5. Experience */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <UserIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Experience</span>
                    <span className={styles.overviewValue}>{job.experience}</span>
                  </div>
                </div>

                {/* 6. Gender */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <GenderIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Gender</span>
                    <span className={styles.overviewValue}>{job.gender || 'Both'}</span>
                  </div>
                </div>

                {/* 7. Qualification */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <GradCapIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Qualification</span>
                    <span className={styles.overviewValue}>{job.education.split('(')[0].trim()}</span>
                  </div>
                </div>

                {/* 8. Career Level */}
                <div className={styles.overviewItem}>
                  <div className={styles.overviewIconBox}>
                    <CareerLevelIcon width={20} height={20} />
                  </div>
                  <div className={styles.overviewTexts}>
                    <span className={styles.overviewLabel}>Career Level</span>
                    <span className={styles.overviewValue}>{job.careerLevel || 'Lead Engineer'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Job Location Direct Google Map (Click to Expand in Modal) */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Job Location</h3>
              <div
                className={styles.mapCardInteractive}
                onClick={() => setShowMapModal(true)}
                title="Click to view full map in popup"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowMapModal(true);
                  }
                }}
              >
                <iframe
                  title={`Google Map for ${job.location}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block', pointerEvents: 'none' }}
                  tabIndex={-1}
                  loading="lazy"
                />
                <div className={styles.mapClickOverlay}>
                  <span className={styles.mapExpandPill}>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span>Click to Enlarge</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Job Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Job Skills</h3>
                <div className={styles.skillsCluster}>
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* 3. FULL GOOGLE MAP MODAL POPUP */}
        {showMapModal && (
          <div
            className={styles.mapModalOverlay}
            onClick={() => setShowMapModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-modal-title"
          >
            <div
              className={styles.mapModalContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mapModalHeader}>
                <div className={styles.mapModalTitleBox}>
                  <h3 id="map-modal-title" className={styles.mapModalTitle}>
                    {job.location}
                  </h3>
                  <p className={styles.mapModalSubtitle}>
                    Basic Power Engineering Ltd. Strategic Facility
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.modalCloseBtn}
                  onClick={() => setShowMapModal(false)}
                  aria-label="Close map"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className={styles.mapModalBody}>
                <iframe
                  title={`Full Google Map for ${job.location}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className={styles.mapModalFooter}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Basic Power Engineering Ltd ' + job.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openInGoogleBtn}
                >
                  <span>Open in Google Maps App</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
