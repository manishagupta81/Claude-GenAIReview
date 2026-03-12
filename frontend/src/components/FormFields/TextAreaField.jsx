import React from 'react';

export default function TextAreaField({ label, name, value, onChange, required, readOnly, placeholder, rows = 2 }) {
  return (
    <div className="field-group">
      <label>
        {label}
        {required && <span className="req"> *</span>}
      </label>
      <textarea
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
