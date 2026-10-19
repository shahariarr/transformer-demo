'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { VACANCIES } from '@/lib/careers';
import { mailLink } from '@/lib/data';

export default function JobApplicationForm() {
  const searchParams = useSearchParams();
  const jobParam = searchParams.get('job');

  const [selectedSlug, setSelectedSlug] = useState(jobParam || VACANCIES[0].slug);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    if (jobParam) {
      setSelectedSlug(jobParam);
    }
  }, [jobParam]);

  const activeJob = VACANCIES.find(v => v.slug === selectedSlug) || null;

  const validateField = (name, val) => {
    const v = (val || '').trim();
    if (name === 'fullName') return v ? '' : 'Please enter your full legal name.';
    if (name === 'email') {
      if (!v) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please provide a valid email format.';
      return '';
    }
    if (name === 'phone') return v ? '' : 'Please enter your mobile phone number.';
    if (name === 'experienceYears') return v ? '' : 'Please select your experience level.';
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const f = formRef.current.elements;

    const newErrors = {
      fullName: validateField('fullName', f.fullName.value),
      email: validateField('email', f.email.value),
      phone: validateField('phone', f.phone.value),
      experienceYears: validateField('experienceYears', f.experienceYears.value)
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setIsSubmitting(false);
      setStatus({ ok: false, msg: 'Please review and fill in the required fields marked in red.' });
      const firstBad = Object.keys(newErrors).find(k => newErrors[k]);
      if (firstBad && f[firstBad]) f[firstBad].focus();
      return;
    }

    const jobTitle = activeJob ? activeJob.title : 'General Open Talent Application';
    const trackingId = 'BPEL-HR-' + Math.floor(100000 + Math.random() * 900000);

    const emailBody = [
      `--- BPEL FORMAL JOB APPLICATION ---`,
      `Application Ref: ${trackingId}`,
      `Position Applied: ${jobTitle}`,
      `Full Name: ${f.fullName.value}`,
      `Email: ${f.email.value}`,
      `Mobile Phone: ${f.phone.value}`,
      `Current City: ${f.city?.value || 'N/A'}`,
      `Highest Education: ${f.education?.value || 'N/A'}`,
      `Institute / University: ${f.university?.value || 'N/A'}`,
      `Years of Experience: ${f.experienceYears.value}`,
      `Current Employer / Designation: ${f.currentRole?.value || 'N/A'}`,
      `Preferred Location: ${f.preferredLocation?.value || 'Any'}`,
      `Notice Period: ${f.noticePeriod?.value || 'Standard'}`,
      `Expected Gross Salary: ${f.expectedSalary?.value || 'Negotiable'}`,
      `LinkedIn / Portfolio: ${f.portfolioUrl?.value || 'N/A'}`,
      `Attached Resume: ${selectedFileName || 'To be attached in email'}`,
      ``,
      `Candidate Statement / Pitch:`,
      `${f.coverLetter?.value || 'See attached CV'}`
    ].join('\n');

    setStatus({
      ok: true,
      refId: trackingId,
      jobTitle: jobTitle,
      candidateName: f.fullName.value,
      href: mailLink(emailBody, `Application: ${jobTitle} - ${f.fullName.value} (${trackingId})`),
      msg: 'Your application dossier is prepared! Click the button below to submit directly to the BPEL HR Recruitment Board via your email client, or review your application reference.'
    });

    setIsSubmitting(false);

    if (statusRef.current) {
      setTimeout(() => {
        statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        statusRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="job-app-container">
      {/* Target Job Quick Summary Card */}
      <div className="job-target-card fade-in-up">
        <div className="job-target-header">
          <span className="job-target-tag">APPLYING FOR</span>
          <h2 className="job-target-title">
            {activeJob ? activeJob.title : 'General Open Talent Pool'}
          </h2>
          {activeJob ? (
            <div className="job-target-meta">
              <span className="target-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                {activeJob.dept}
              </span>
              <span className="target-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                {activeJob.location}
              </span>
              <span className="target-pill">⏱️ {activeJob.experience} Exp</span>
              <span className="target-pill">💰 {activeJob.salary.split('(')[0].trim()}</span>
            </div>
          ) : (
            <p className="job-target-desc">
              Submit your CV for upcoming engineering, testing, and production roles across all facilities.
            </p>
          )}
        </div>

        <div className="job-target-switch">
          <label htmlFor="positionSwitch" className="job-switch-label">Switch Position:</label>
          <div className="vacancy-select-wrap">
            <select
              id="positionSwitch"
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="job-switch-select"
            >
              {VACANCIES.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.title} — {v.location}
                </option>
              ))}
              <option value="open-application">General Open Application (All Divisions)</option>
            </select>
            <span className="vacancy-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Main Application Form Card */}
      <div className="job-form-wrapper fade-in-up">
        <form
          id="job-application-form"
          className="job-form"
          noValidate
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {/* Section 1: Candidate Contact Info */}
          <div className="job-form-section">
            <div className="form-section-title">
              <span className="section-num">1</span>
              <div>
                <h3>Personal &amp; Contact Details</h3>
                <p className="section-subtitle">How our engineering talent acquisition board can contact you</p>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="fullName" className="field-label">
                  Full Name <span className="req-star">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Engr. Kazi Mahfuzur Rahman"
                  className={`app-input ${errors.fullName ? 'has-error' : ''}`}
                  onBlur={handleBlur}
                />
                {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
              </div>

              <div className="form-field">
                <label htmlFor="email" className="field-label">
                  Email Address <span className="req-star">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="e.g. mahfuz.eee@gmail.com"
                  className={`app-input ${errors.email ? 'has-error' : ''}`}
                  onBlur={handleBlur}
                />
                {errors.email ? <span className="field-error">{errors.email}</span> : null}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="phone" className="field-label">
                  Mobile Phone Number <span className="req-star">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+880 1700 000000"
                  className={`app-input ${errors.phone ? 'has-error' : ''}`}
                  onBlur={handleBlur}
                />
                {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
              </div>

              <div className="form-field">
                <label htmlFor="city" className="field-label">
                  Current City / Address
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="e.g. Uttara, Dhaka or Gazipur"
                  className="app-input"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Education & Experience */}
          <div className="job-form-section">
            <div className="form-section-title">
              <span className="section-num">2</span>
              <div>
                <h3>Academic &amp; Professional Background</h3>
                <p className="section-subtitle">Your credentials, qualifications, and engineering track record</p>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="education" className="field-label">
                  Highest Degree
                </label>
                <input
                  id="education"
                  name="education"
                  type="text"
                  placeholder="e.g. B.Sc. in Electrical &amp; Electronic Engineering"
                  className="app-input"
                />
              </div>

              <div className="form-field">
                <label htmlFor="university" className="field-label">
                  University / Institute
                </label>
                <input
                  id="university"
                  name="university"
                  type="text"
                  placeholder="e.g. BUET, CUET, RUET, DUET, AUST"
                  className="app-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="experienceYears" className="field-label">
                  Total Relevant Experience <span className="req-star">*</span>
                </label>
                <div className="vacancy-select-wrap">
                  <select
                    id="experienceYears"
                    name="experienceYears"
                    required
                    className={`app-input app-select ${errors.experienceYears ? 'has-error' : ''}`}
                    onBlur={handleBlur}
                  >
                    <option value="">Select experience level</option>
                    <option value="Fresh Graduate / Entry Level (0–1 Year)">Fresh Graduate (0–1 Year)</option>
                    <option value="1–3 Years">1–3 Years</option>
                    <option value="3–5 Years">3–5 Years</option>
                    <option value="5–8 Years">5–8 Years (Senior)</option>
                    <option value="8–12 Years">8–12 Years (Lead / Managerial)</option>
                    <option value="12+ Years">12+ Years (Executive / Expert)</option>
                  </select>
                  <span className="vacancy-select-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </div>
                {errors.experienceYears ? <span className="field-error">{errors.experienceYears}</span> : null}
              </div>

              <div className="form-field">
                <label htmlFor="currentRole" className="field-label">
                  Current / Most Recent Employer &amp; Role
                </label>
                <input
                  id="currentRole"
                  name="currentRole"
                  type="text"
                  placeholder="e.g. Assistant Engineer at Energypac / Siemens"
                  className="app-input"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Target Role Preferences */}
          <div className="job-form-section">
            <div className="form-section-title">
              <span className="section-num">3</span>
              <div>
                <h3>Role Preferences &amp; Availability</h3>
                <p className="section-subtitle">Locations, notice period, and expectations</p>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="preferredLocation" className="field-label">
                  Preferred Facility Location
                </label>
                <div className="vacancy-select-wrap">
                  <select id="preferredLocation" name="preferredLocation" className="app-input app-select">
                    <option value="Dhaka Headquarters">Dhaka Headquarters</option>
                    <option value="Gazipur Manufacturing Campus">Gazipur Manufacturing Campus</option>
                    <option value="Chittagong Hub / Regional Sites">Chittagong Hub / Regional Sites</option>
                    <option value="Any Facility (Flexible)">Any Facility (Flexible)</option>
                  </select>
                  <span className="vacancy-select-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="noticePeriod" className="field-label">
                  Notice Period / Earliest Joining
                </label>
                <div className="vacancy-select-wrap">
                  <select id="noticePeriod" name="noticePeriod" className="app-input app-select">
                    <option value="Immediate (Within 7 Days)">Immediate (Within 7 Days)</option>
                    <option value="15 Days">15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                  </select>
                  <span className="vacancy-select-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="expectedSalary" className="field-label">
                  Expected Gross Salary (BDT / Mo)
                </label>
                <input
                  id="expectedSalary"
                  name="expectedSalary"
                  type="text"
                  placeholder="e.g. BDT 85,000 / month"
                  className="app-input"
                />
              </div>

              <div className="form-field">
                <label htmlFor="portfolioUrl" className="field-label">
                  LinkedIn Profile / Online Portfolio URL
                </label>
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="app-input"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Resume Attachment & Statement */}
          <div className="job-form-section">
            <div className="form-section-title">
              <span className="section-num">4</span>
              <div>
                <h3>Resume / CV &amp; Candidate Statement</h3>
                <p className="section-subtitle">Attach your detailed resume and highlight your technical strengths</p>
              </div>
            </div>

            {/* Drag & Drop Styled File Upload */}
            <div className="form-field">
              <label htmlFor="resumeFile" className="field-label">Upload CV / Resume (PDF or DOCX)</label>
              <div className={`file-upload-zone ${selectedFileName ? 'has-file' : ''}`}>
                <input
                  type="file"
                  id="resumeFile"
                  name="resumeFile"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="file-upload-input"
                />
                <div className="file-upload-content">
                  <div className="upload-icon-circle">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0B5CAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="upload-prompt">
                    <strong>Click to browse</strong> or drag &amp; drop your resume here
                  </p>
                  <span className="upload-limit">PDF, DOC, or DOCX formats accepted (Max 10MB)</span>
                  {selectedFileName ? (
                    <div className="file-selected-badge">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>Selected file: <strong>{selectedFileName}</strong></span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="coverLetter" className="field-label">
                Candidate Note / Technical Strengths (Cover Message)
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows="4"
                placeholder="Briefly describe your experience with high-voltage transformers, testing procedures, or engineering design software, and why you are excited to build your career with BPEL."
                className="app-input app-textarea"
              />
            </div>
          </div>

          {/* Form Submit Bar */}
          <div className="form-submit-footer">
            <button
              type="submit"
              className="btn btn--primary app-submit-btn"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Processing Application...' : 'Submit Formal Application'}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div className="app-privacy-note">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>BPEL is an equal-opportunity employer. Your credentials are handled with strict technical confidentiality.</span>
            </div>
          </div>

          {/* Submission Status Alert */}
          {status ? (
            <div
              ref={statusRef}
              tabIndex="-1"
              role="status"
              className={`app-status-box ${status.ok ? 'is-success' : 'is-error'}`}
            >
              {status.ok ? (
                <div className="app-status-content">
                  <div className="app-status-badge">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <strong>Application Registered Successfully</strong>
                  </div>
                  <p className="app-status-ref">
                    Application Tracking Reference: <code>{status.refId}</code>
                  </p>
                  <p className="app-status-desc">{status.msg}</p>
                  <div className="app-status-action">
                    <a href={status.href} className="btn btn--primary">
                      <span>Transmit via Email Client to HR Board →</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="app-status-content">
                  <div className="app-status-badge">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <strong>Please Review Required Fields</strong>
                  </div>
                  <p className="app-status-desc">{status.msg}</p>
                </div>
              )}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
