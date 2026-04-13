import React, { useState } from 'react';
import { TEMPLATES } from '../templates';
import { sampleData } from '../data/sampleData';
import ScaledResume from './ScaledResume';
import './TemplateGallery.css';

export default function TemplateGallery({ onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  const previewTemplate = TEMPLATES.find((t) => t.id === previewId);

  return (
    <div className="gallery-root">
      {/* Full-screen preview overlay */}
      {previewId && previewTemplate && (
        <div className="gallery-overlay" onClick={() => setPreviewId(null)}>
          <div
            className="gallery-overlay-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-overlay-toolbar">
              <div className="gallery-overlay-title-wrap">
                <span className="gallery-overlay-name">
                  {previewTemplate.name}
                </span>
                <span className="gallery-overlay-tag">
                  {previewTemplate.tagline}
                </span>
              </div>
              <div className="gallery-overlay-actions">
                <button
                  className="gallery-btn-select"
                  onClick={() => {
                    onSelect(previewId);
                    setPreviewId(null);
                  }}
                >
                  Use this template →
                </button>
                <button
                  className="gallery-btn-close"
                  onClick={() => setPreviewId(null)}
                >
                  ✕
                </button>
              </div>
            </div>
            {/* Overlay preview — ScaledResume fits to window width */}
            <div className="gallery-overlay-paper-wrap">
              <ScaledResume>
                <previewTemplate.component data={sampleData} />
              </ScaledResume>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <header className="gallery-header">
        <div className="gallery-header-inner">
          <div className="gallery-header-top">
            <div className="gallery-logo">
              ResumeBuilder<span className="gallery-logo-dot"></span>PK
            </div>
            <div className="gallery-price-badge">
              <span className="gallery-price-amount">Rs. 150</span>
              <span className="gallery-price-label">one-time</span>
            </div>
          </div>
          <div className="gallery-header-text">
            <h1 className="gallery-headline">Choose Your Template</h1>
            <p className="gallery-subline">
              Professional resume designs crafted to impress Pakistani
              recruiters &amp; international employers. Select a template, fill
              in your details, and download your perfect CV.
            </p>
          </div>
        </div>
      </header>

      {/* Template grid */}
      <main className="gallery-grid-wrap">
        <div className="gallery-grid">
          {TEMPLATES.map((tpl) => {
            const ResumeComp = tpl.component;
            const isHovered = hoveredId === tpl.id;
            return (
              <div
                className={`gallery-card ${isHovered ? 'gallery-card-hovered' : ''}`}
                key={tpl.id}
                onMouseEnter={() => setHoveredId(tpl.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Thumbnail — clipped to card height, ScaledResume handles width */}
                <div
                  className="gallery-card-preview"
                  onClick={() => setPreviewId(tpl.id)}
                >
                  <div className="gallery-thumb-clip">
                    <ScaledResume className="gallery-thumb-paper">
                      <ResumeComp data={sampleData} />
                    </ScaledResume>
                  </div>
                  <div className="gallery-preview-hover-label">
                    <span>Preview full size</span>
                  </div>
                </div>

                {/* Card info */}
                <div className="gallery-card-info">
                  <div className="gallery-card-top">
                    <div>
                      <h2 className="gallery-card-name">{tpl.name}</h2>
                      <p className="gallery-card-tagline">{tpl.tagline}</p>
                    </div>
                    <div className="gallery-palette">
                      {tpl.palette.map((color, i) => (
                        <span
                          key={i}
                          className="gallery-palette-swatch"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="gallery-card-desc">{tpl.description}</p>
                  <div className="gallery-card-footer">
                    <span className="gallery-best-for">
                      Best for: <strong>{tpl.bestFor}</strong>
                    </span>
                    <button
                      className="gallery-card-cta"
                      onClick={() => onSelect(tpl.id)}
                    >
                      Use template →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom strip */}
      <footer className="gallery-footer">
        <div className="gallery-footer-features">
          <span className="gallery-feature">✓ Live preview while you type</span>
          <span className="gallery-feature">✓ Professional PDF output</span>
          <span className="gallery-feature">
            ✓ Delivered to WhatsApp or Email
          </span>
          <span className="gallery-feature">✓ Pay only Rs. 150 — once</span>
        </div>
      </footer>
    </div>
  );
}
