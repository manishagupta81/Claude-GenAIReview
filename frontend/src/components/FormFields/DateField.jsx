import React from 'react';

export default function DateField({ label, name, value, onChange, required, readOnly }) {
  return (
    <div className="field-group">
      <label>
        {label}
        {required && <span className="req"> *</span>}
      </label>
      <input
        type="date"
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        readOnly={readOnly}
      />
    </div>
  );
}
