import React from 'react';

export default function TextField({ label, name, value, onChange, required, readOnly, placeholder, type = 'text' }) {
  return (
    <div className="field-group">
      <label>
        {label}
        {required && <span className="req"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
  );
}
