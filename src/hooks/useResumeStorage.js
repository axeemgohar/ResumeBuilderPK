import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'rb_resume_data';
const TEMPLATE_KEY = 'rb_template_id';

// Debounce helper — only writes to localStorage 800ms after last change
function useDebouncedEffect(fn, deps, delay = 800) {
  useEffect(() => {
    const timer = setTimeout(fn, delay);
    return () => clearTimeout(timer);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Main hook ─────────────────────────────────────────────
export function useResumeStorage(emptyData) {
  // Load saved data once on mount
  const loadSaved = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  };

  const loadSavedTemplate = () => {
    try {
      return localStorage.getItem(TEMPLATE_KEY) || null;
    } catch (_) {
      return null;
    }
  };

  const saved = loadSaved();
  const savedTemplate = loadSavedTemplate();

  const [data, setData] = useState(saved || emptyData);
  const [templateId, setTemplateId] = useState(null); // resolved in component
  const hasSavedData = !!saved;

  // Auto-save data to localStorage (debounced)
  useDebouncedEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (_) {}
  }, [data]);

  // Save template immediately on change
  const saveTemplate = useCallback((id) => {
    try {
      localStorage.setItem(TEMPLATE_KEY, id);
    } catch (_) {}
  }, []);

  const clearSaved = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TEMPLATE_KEY);
    } catch (_) {}
  }, []);

  return {
    data,
    setData,
    hasSavedData,
    savedTemplate,
    saveTemplate,
    clearSaved,
  };
}
