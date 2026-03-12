import React from 'react';
import { useForm } from '../../hooks/useForm';

// Count filled fields as a rough percentage
function calculateProgress(formData) {
  if (!formData || typeof formData !== 'object') return 0;
  const values = Object.values(formData);
  if (values.length === 0) return 0;

  let filled = 0;
  values.forEach((v) => {
    if (v === null || v === undefined || v === '') return;
    if (Array.isArray(v) && v.length === 0) return;
    filled++;
  });

  return Math.round((filled / Math.max(values.length, 1)) * 100);
}

export default function ProgressBar() {
  const { formData, saving, lastSaved } = useForm();
  const pct = calculateProgress(formData);

  return (
    <div className="progress-bar">
      <div className="track">
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="pct">{pct}%</span>
      {saving && (
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Saving...</span>
      )}
      {!saving && lastSaved && (
        <span style={{ fontSize: '0.72rem', color: '#059669' }}>Saved</span>
      )}
    </div>
  );
}
