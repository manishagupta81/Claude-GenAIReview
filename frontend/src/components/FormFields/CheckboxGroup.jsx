import React from 'react';

export default function CheckboxGroup({ label, name, value = [], onChange, options, required, readOnly }) {
  const selected = Array.isArray(value) ? value : [];

  const handleChange = (optValue) => {
    if (readOnly) return;
    const newVal = selected.includes(optValue)
      ? selected.filter((v) => v !== optValue)
      : [...selected, optValue];
    onChange(name, newVal);
  };

  return (
    <div className="field-group">
      {label && (
        <label>
          {label}
          {required && <span className="req"> *</span>}
        </label>
      )}
      <div className="checkbox-grid">
        {options.map((opt) => (
          <label key={opt.value} className="checkbox-item">
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => handleChange(opt.value)}
              disabled={readOnly}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
