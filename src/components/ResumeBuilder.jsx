import React, { useState, useEffect, useRef } from 'react';
import { TEMPLATES } from '../templates';
import { emptyData } from '../data/emptyData';
import { sampleData } from '../data/sampleData';
import { useResumeStorage } from '../hooks/useResumeStorage';
import ScaledResume from './ScaledResume';
import StepPersonal from './StepPersonal';
import StepEducation from './StepEducation';
import StepExperience from './StepExperience';
import StepProjects from './StepProjects';
import StepSkills from './StepSkills';
import './ResumeBuilder.css';

const STEPS = [
  { id: 'personal', label: 'Personal', icon: '①' },
  { id: 'education', label: 'Education', icon: '②' },
  { id: 'experience', label: 'Experience', icon: '③' },
  { id: 'projects', label: 'Projects', icon: '④' },
  { id: 'skills', label: 'Skills', icon: '⑤' },
];

export default function ResumeBuilder({ templateId, onBack, onPay }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [showRestoredBanner, setShowRestoredBanner] = useState(false);

  // ── localStorage auto-save ──
  const { data, setData, hasSavedData, savedTemplate, saveTemplate } =
    useResumeStorage(sampleData);

  // Use saved template if available, otherwise use the one from gallery
  const [activeTemplateId, setActiveTemplateId] = useState(
    savedTemplate || templateId,
  );

  // Show "data restored" banner once on mount if saved data was found
  const shownBanner = useRef(false);
  useEffect(() => {
    if (hasSavedData && !shownBanner.current) {
      shownBanner.current = true;
      setShowRestoredBanner(true);
      const t = setTimeout(() => setShowRestoredBanner(false), 4000);
      return () => clearTimeout(t);
    }
  }, [hasSavedData]);

  const handleTemplateChange = (id) => {
    setActiveTemplateId(id);
    saveTemplate(id);
  };

  const activeTemplate =
    TEMPLATES.find((t) => t.id === activeTemplateId) || TEMPLATES[0];
  const ResumeComp = activeTemplate.component;

  // ── Data updaters ──
  const updPersonal = (personalOrNull, summary) => {
    if (personalOrNull === null) {
      setData((d) => ({ ...d, summary }));
    } else {
      setData((d) => ({ ...d, personal: personalOrNull }));
    }
  };

  const updEducation = (education) => setData((d) => ({ ...d, education }));
  const updExperience = (experience) => setData((d) => ({ ...d, experience }));
  const updProjects = (projects) => setData((d) => ({ ...d, projects }));
  const updCerts = (certifications) =>
    setData((d) => ({ ...d, certifications }));
  const updSkills = (skills) => setData((d) => ({ ...d, skills }));

  const stepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'personal':
        return <StepPersonal data={data} onChange={updPersonal} />;
      case 'education':
        return <StepEducation data={data} onChange={updEducation} />;
      case 'experience':
        return <StepExperience data={data} onChange={updExperience} />;
      case 'projects':
        return (
          <StepProjects
            data={data}
            onProjectsChange={updProjects}
            onCertsChange={updCerts}
          />
        );
      case 'skills':
        return <StepSkills data={data} onChange={updSkills} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="rb-root">
      {/* ── Restored data banner ── */}
      {showRestoredBanner && (
        <div className="rb-restored-banner">
          ✓ Your previous resume data has been restored automatically
        </div>
      )}
      {/* ── TOP NAVBAR ── */}
      <nav className="rb-nav">
        <div className="rb-nav-left">
          <button className="rb-back-btn" onClick={onBack}>
            ← Templates
          </button>
          <span className="rb-nav-divider" />
          <span className="rb-nav-logo">
            Resume<span className="rb-logo-dot">Builder</span>
          </span>
        </div>

        {/* Template switcher */}
        <div className="rb-template-switcher">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={`rb-tpl-btn ${activeTemplateId === t.id ? 'rb-tpl-btn-active' : ''}`}
              onClick={() => handleTemplateChange(t.id)}
              title={t.tagline}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="rb-nav-right">
          <button
            className="rb-preview-toggle"
            onClick={() => setPreviewMode((v) => !v)}
          >
            {previewMode ? '← Edit' : 'Preview →'}
          </button>
          <button
            className="rb-pay-btn"
            onClick={() => onPay(data, activeTemplateId)}
          >
            Download • Rs. 150
          </button>
        </div>
      </nav>

      {/* ── MAIN LAYOUT ── */}
      <div className="rb-body">
        {/* Left: Form panel */}
        <aside
          className={`rb-form-panel ${previewMode ? 'rb-form-panel-hidden' : ''}`}
        >
          {/* Step tabs */}
          <div className="rb-steps">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                className={`rb-step-btn ${currentStep === i ? 'rb-step-active' : ''} ${i < currentStep ? 'rb-step-done' : ''}`}
                onClick={() => setCurrentStep(i)}
              >
                <span className="rb-step-icon">
                  {i < currentStep ? '✓' : s.icon}
                </span>
                <span className="rb-step-label">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Form content */}
          <div className="rb-form-scroll">
            <div className="rb-form-content">
              <h2 className="rb-step-title">{STEPS[currentStep].label}</h2>
              {stepContent()}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="rb-form-footer">
            <button
              className="rb-nav-btn rb-nav-btn-secondary"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
            >
              ← Back
            </button>
            <div className="rb-step-progress">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`rb-progress-dot ${i === currentStep ? 'rb-progress-dot-active' : ''} ${i < currentStep ? 'rb-progress-dot-done' : ''}`}
                />
              ))}
            </div>
            {isLastStep ? (
              <button
                className="rb-nav-btn rb-nav-btn-pay"
                onClick={() => onPay(data, activeTemplateId)}
              >
                Download →
              </button>
            ) : (
              <button
                className="rb-nav-btn rb-nav-btn-primary"
                onClick={() =>
                  setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
                }
              >
                Next →
              </button>
            )}
          </div>
        </aside>

        {/* Right: Live preview */}
        <main
          className={`rb-preview-panel ${previewMode ? 'rb-preview-panel-full' : ''}`}
        >
          <div className="rb-preview-scroll">
            <div className="rb-preview-label">
              <span>{activeTemplate.name}</span>
              <span className="rb-preview-label-tag">live preview</span>
            </div>
            <div className="rb-paper-wrap">
              <ScaledResume>
                <ResumeComp data={data} />
              </ScaledResume>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
