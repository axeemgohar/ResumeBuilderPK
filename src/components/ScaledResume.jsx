import React, { useRef, useState, useEffect } from 'react';

const PAPER_WIDTH = 794; // px — 210mm at 96dpi

/**
 * Wraps a resume component and scales it to fit the available
 * container width. The outer div grows to the scaled height so
 * the page layout stays correct without extra margin hacks.
 */
export default function ScaledResume({ children, className = '' }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calc = () => {
      const available = el.parentElement?.clientWidth || el.clientWidth;
      // Leave 32px breathing room (16px each side)
      const fit = Math.min(1, (available - 32) / PAPER_WIDTH);
      setScale(fit);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el.parentElement || el);
    return () => ro.disconnect();
  }, []);

  const scaledHeight = 1123 * scale; // PAPER_HEIGHT * scale

  return (
    // Outer div collapses to the scaled height so it doesn't
    // leave a huge gap below the transformed paper
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: scaledHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        className={`resume-paper ${className}`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {children}
      </div>
    </div>
  );
}
