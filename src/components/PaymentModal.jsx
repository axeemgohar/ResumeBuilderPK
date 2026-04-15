import React, { useState, useRef } from 'react';
import { TEMPLATES } from '../templates';
import { generateResumeHTML } from '../utils/generateResumeHTML';
import './PaymentModal.css';

// ─────────────────────────────────────────────────────────────
//  CONFIGURATION — fill these in before going live
// ─────────────────────────────────────────────────────────────
const CONFIG = {
  // 1. Sign up free at https://usebasin.com
  //    Create a new endpoint → copy the URL it gives you
  //    It looks like: https://usebasin.com/f/xxxxxxxxxxxxxxxx
  //    Paste the full URL below
  BASIN_ENDPOINT: 'https://usebasin.com/f/0e002b1edc96',

  // 2. Your JazzCash / Easypaisa number
  PAYMENT_NUMBER: '03099870810',

  // 3. Account name exactly as it appears in the app
  ACCOUNT_NAME: 'Muhammad Azeem Gohar',

  // 4. Price displayed to the user
  PRICE: 'Rs. 100',

  // 5. Your WhatsApp number (format: 92XXXXXXXXXX — no + or dashes)
  WHATSAPP_NUMBER: '923099870810',
};
// ─────────────────────────────────────────────────────────────

export default function PaymentModal({
  resumeData,
  templateId,
  onClose,
  onDone,
}) {
  const [step, setStep] = useState('payment'); // 'payment' | 'form' | 'confirm'

  // Form state
  const [name, setName] = useState(resumeData?.personal?.name || '');
  const [contact, setContact] = useState(resumeData?.personal?.phone || '');
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef();
  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  // ── File picker handler ───────────────────────────────────
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Screenshot must be under 10MB');
      return;
    }
    setError('');
    setScreenshot(file);
    const reader = new FileReader();
    reader.onload = (ev) => setScreenshotPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── Submit to Basin ───────────────────────────────────────
  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!contact.trim()) {
      setError('Please enter your WhatsApp number or email');
      return;
    }
    if (!screenshot) {
      setError('Please upload your payment screenshot');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      // Generate the resume as a standalone HTML file and attach it
      const resumeHTML = generateResumeHTML(resumeData, templateId);
      const htmlBlob = new Blob([resumeHTML], { type: 'text/html' });
      const safeNamePart = (resumeData?.personal?.name || 'resume').replace(
        /[^a-z0-9]/gi,
        '_',
      );
      const htmlFile = new File([htmlBlob], `${safeNamePart}_resume.html`, {
        type: 'text/html',
      });

      const form = new FormData();
      form.append('name', name.trim());
      form.append('contact', contact.trim());
      form.append('template', template.name);
      form.append('customer_email', resumeData?.personal?.email || '');
      form.append('screenshot', screenshot);
      form.append('resume_file', htmlFile);
      form.append(
        '_subject',
        `New Resume Order — ${name.trim()} — ${template.name}`,
      );

      const res = await fetch(CONFIG.BASIN_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: form,
      });

      if (res.ok) {
        setStep('confirm');
      } else {
        const json = await res.json().catch(() => ({}));
        setError(
          json?.error ||
            `Submission failed (status ${res.status}). Please try again.`,
        );
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── STEP 1: Payment instructions ─────────────────────────
  if (step === 'payment') {
    return (
      <div className="pm-overlay" onClick={onClose}>
        <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
          <div className="pm-header">
            <div>
              <h2 className="pm-title">Complete Payment</h2>
              <p className="pm-subtitle">
                Send {CONFIG.PRICE} to download your professional resume
              </p>
            </div>
            <button className="pm-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="pm-body">
            {/* Price hero */}
            <div className="pm-price-hero">
              <span className="pm-price-amount">{CONFIG.PRICE}</span>
              <span className="pm-price-label">
                one-time · delivered to WhatsApp or Email
              </span>
            </div>

            {/* Account details */}
            <div className="pm-payment-card">
              <div className="pm-payment-methods">
                <img
                  src="/JazzCash.png"
                  alt="JazzCash Logo"
                  style={{ height: '30px' }}
                />
              </div>
              <div className="pm-payment-detail">
                <span className="pm-detail-label">Mobile Number</span>
                <span className="pm-detail-value pm-detail-number">
                  {CONFIG.PAYMENT_NUMBER}
                </span>
              </div>
              <div className="pm-payment-detail">
                <span className="pm-detail-label">Account Name</span>
                <span className="pm-detail-value">{CONFIG.ACCOUNT_NAME}</span>
              </div>
              <div className="pm-payment-detail">
                <span className="pm-detail-label">Amount</span>
                <span className="pm-detail-value pm-detail-amount">
                  {CONFIG.PRICE}
                </span>
              </div>
            </div>

            {/* Step guide */}
            <div className="pm-steps-list">
              {[
                'Open JazzCash or Easypaisa on your phone',
                `Send <strong>${CONFIG.PRICE}</strong> to <strong>${CONFIG.PAYMENT_NUMBER}</strong>`,
                'Take a screenshot of the payment confirmation screen',
                "Click the button below and upload it — we'll verify and send your resume",
              ].map((text, i) => (
                <div className="pm-step-row" key={i}>
                  <span className="pm-step-num">{i + 1}</span>
                  <p dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              ))}
            </div>

            {/* Includes */}
            <div className="pm-includes">
              <p className="pm-includes-title">What you get</p>
              <div className="pm-includes-grid">
                <span className="pm-include-item">
                  ✓ Professional PDF resume
                </span>
                <span className="pm-include-item">
                  ✓ Template: {template.name}
                </span>
                <span className="pm-include-item">
                  ✓ Sent to WhatsApp or Email
                </span>
                <span className="pm-include-item">✓ Ready within 24 hours</span>
              </div>
            </div>
          </div>

          <div className="pm-footer">
            <button className="pm-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="pm-btn-primary" onClick={() => setStep('form')}>
              I have paid — Upload screenshot →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 2: Our own custom form → submits to Basin ────────
  if (step === 'form') {
    return (
      <div className="pm-overlay" onClick={onClose}>
        <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
          <div className="pm-header">
            <div>
              <h2 className="pm-title">Upload Screenshot</h2>
              <p className="pm-subtitle">
                Fill in your details so we can send your resume
              </p>
            </div>
            <button className="pm-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="pm-body">
            {/* Name */}
            <div className="pm-field">
              <label className="pm-label">Full Name</label>
              <input
                className="pm-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Aisha Rahman"
                autoComplete="name"
              />
            </div>

            {/* WhatsApp / Email */}
            <div className="pm-field">
              <label className="pm-label">
                WhatsApp Number or Email
                <span className="pm-label-hint">
                  we'll send your resume here
                </span>
              </label>
              <input
                className="pm-input"
                type="text"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setError('');
                }}
                placeholder="03XX-XXXXXXX  or  you@email.com"
              />
            </div>

            {/* Screenshot upload */}
            <div className="pm-field">
              <label className="pm-label">
                Payment Screenshot
                <span className="pm-label-hint">required for verification</span>
              </label>
              <div
                className={`pm-upload-zone ${screenshotPreview ? 'pm-upload-filled' : ''}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {screenshotPreview ? (
                  <>
                    <img
                      className="pm-screenshot-img"
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                    />
                    <div className="pm-upload-change-label">
                      Click to change
                    </div>
                  </>
                ) : (
                  <div className="pm-upload-placeholder">
                    <span className="pm-upload-icon">📎</span>
                    <span className="pm-upload-text">
                      Click to upload screenshot
                    </span>
                    <span className="pm-upload-hint">
                      JPG or PNG · max 10MB
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: 'none' }}
              />
            </div>

            {/* Template reminder chip */}
            <div className="pm-template-chip">
              <span
                className="pm-template-dot"
                style={{ background: template.palette?.[0] || '#111' }}
              />
              Template: <strong>{template.name}</strong>
            </div>

            {/* Error */}
            {error && <div className="pm-error">⚠ {error}</div>}
          </div>

          <div className="pm-footer">
            <button
              className="pm-btn-secondary"
              onClick={() => setStep('payment')}
            >
              ← Back
            </button>
            <button
              className="pm-btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="pm-spinner" /> Submitting...
                </>
              ) : (
                'Submit Order →'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 3: Confirmation ──────────────────────────────────
  if (step === 'confirm') {
    const waMsg = encodeURIComponent(
      `Hi ${name || 'there'}! 👏\n\nYour resume order has been received and will be processed shortly.\n\n📄 Template: ${template.name}\n📱 Deliver to: ${contact}\n\nWe will send your resume within 24 hours after verifying your payment.\n\n✏️ Need edits within 30 days? Just reply to this message and we will update it for free. After 30 days, a new order is required.\n\nThank you for using ResumeBuilder! 🎯`,
    );
    const waLink = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waMsg}`;

    return (
      <div className="pm-overlay">
        <div className="pm-modal pm-modal-confirm">
          <div className="pm-confirm-icon">✓</div>
          <h2 className="pm-confirm-title">Order Received!</h2>
          <p className="pm-confirm-sub">
            {name ? (
              <>
                <strong>{name}</strong>, your
              </>
            ) : (
              'Your'
            )}{' '}
            screenshot has been submitted successfully.
          </p>

          <div className="pm-confirm-details">
            <div className="pm-confirm-row">
              <span>Template</span>
              <strong>{template.name}</strong>
            </div>
            <div className="pm-confirm-row">
              <span>Deliver to</span>
              <strong>{contact}</strong>
            </div>
            <div className="pm-confirm-row">
              <span>Status</span>
              <strong className="pm-status-pending">
                ⏳ Pending verification
              </strong>
            </div>
          </div>

          <div className="pm-confirm-timeline">
            <div className="pm-timeline-item pm-timeline-done">
              <span className="pm-tl-dot" />
              <span>Screenshot submitted</span>
            </div>
            <div className="pm-timeline-item">
              <span className="pm-tl-dot pm-tl-dot-pending" />
              <span>
                Admin verifies payment <em>(within a few hours)</em>
              </span>
            </div>
            <div className="pm-timeline-item">
              <span className="pm-tl-dot pm-tl-dot-pending" />
              <span>Resume sent to your WhatsApp or email</span>
            </div>
          </div>

          <p className="pm-confirm-note">
            You'll receive your resume within <strong>1 hour</strong>. Message
            us on WhatsApp if you don't hear back.
          </p>

          <div className="pm-confirm-actions">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pm-btn-whatsapp"
            >
              <span className="pm-wa-icon">💬</span>
              Follow up on WhatsApp
            </a>
            <button className="pm-btn-secondary" onClick={onDone}>
              Back to builder
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
